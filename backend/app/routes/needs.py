from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from uuid import uuid4
from pathlib import Path
from ..database import get_db
from pypdf import PdfReader
from docx import Document

router = APIRouter(prefix="/needs", tags=["needs"])

ALLOWED_EXT = {".pdf", ".docx"}
MAX_BYTES = 10 * 1024 * 1024  # 10 Mo
STORAGE = Path("storage/needs")

def _extract_text_pdf(path: Path) -> str:
    reader = PdfReader(str(path))
    return "\n".join(page.extract_text() or "" for page in reader.pages)

def _extract_text_docx(path: Path) -> str:
    doc = Document(str(path))
    return "\n".join(p.text for p in doc.paragraphs)

@router.post("/upload")
async def upload_need_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(415, detail="Formats autorisés: .pdf, .docx")

    # limite taille (si le client n’envoie pas Content-Length on protège quand même)
    raw = await file.read()
    if len(raw) > MAX_BYTES:
        raise HTTPException(413, detail="Fichier trop volumineux (max 10 Mo).")

    # stockage
    uid = uuid4().hex
    target_dir = STORAGE / uid
    target_dir.mkdir(parents=True, exist_ok=True)
    target = target_dir / f"original{ext}"
    target.write_bytes(raw)

    # extraction
    try:
        if ext == ".pdf":
            text = _extract_text_pdf(target)
        else:
            text = _extract_text_docx(target)
    except Exception as e:
        raise HTTPException(400, detail=f"Echec d’extraction: {e}")

    # TODO: insérer en DB (Need + chemin + texte brut)
    # need = Need(method="FILE", raw_text=text, file_path=str(target))
    # db.add(need); db.commit(); db.refresh(need)

    return {
        "ok": True,
        "need_id": uid,    # remplacer par need.id quand la table est prête
        "chars": len(text),
    }
