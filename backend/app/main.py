from fastapi import FastAPI, Depends, HTTPException, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr , ConfigDict
from pydantic_settings import BaseSettings, SettingsConfigDict

from .database import Base, engine, get_db
from .models import Ping, User
from .security import hash_password, verify_password, create_access_token, decode_token

class Settings(BaseSettings):
    ENV: str = "dev"
    CORS_ORIGINS: str = "http://localhost:3000"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()

app = FastAPI(title="Concorde API", version="0.0.2")

ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",   # certains Next lancent sur 127.0.0.1
]
# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # ton app Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DEV: crée tables
Base.metadata.create_all(bind=engine)

# -------- Schemas --------
class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    model_config = ConfigDict(from_attributes=True)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# -------- Health --------
@app.get("/healthz")
def healthz():
    return {"status": "ok", "env": settings.ENV}

# -------- Auth --------
COOKIE_NAME = "access_token"

@app.post("/auth/register", response_model=UserOut)
def register(data: UserCreate, db: Session = Depends(get_db)):
    # email unique
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email déjà utilisé.")
    u = User(
        first_name=data.first_name.strip(),
        last_name=data.last_name.strip(),
        email=data.email.lower(),
        hashed_password=hash_password(data.password),
    )
    db.add(u); db.commit(); db.refresh(u)
    return u

@app.post("/auth/login", response_model=UserOut)
def login(data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    u = db.query(User).filter(User.email == data.email.lower()).first()
    if not u or not verify_password(data.password, u.hashed_password):
        raise HTTPException(status_code=401, detail="Identifiants invalides.")
    token = create_access_token(str(u.id))
    # cookie httpOnly
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        secure=False,  # True en prod derrière HTTPS
        samesite="lax",
        max_age=60*60,
        path="/",
    )
    return u

@app.post("/auth/logout")
def logout(response: Response):
    response.delete_cookie(COOKIE_NAME, path="/")
    return {"ok": True}

@app.get("/auth/me", response_model=UserOut)
def me(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get(COOKIE_NAME)
    if not token:
        raise HTTPException(status_code=401, detail="Non authentifié.")
    try:
        payload = decode_token(token)
        uid = int(payload["sub"])
    except Exception:
        raise HTTPException(status_code=401, detail="Jeton invalide.")
    u = db.query(User).get(uid)
    if not u:
        raise HTTPException(status_code=401, detail="Utilisateur introuvable.")
    return u
