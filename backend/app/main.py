from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic_settings import BaseSettings , SettingsConfigDict

from .database import Base, engine, get_db
from .models import Ping

class Settings(BaseSettings):
    ENV: str = "dev"
    CORS_ORIGINS: str = "http://localhost:3000"

model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()

app = FastAPI(title="Concorde API - Début", version="0.0.1")

# CORS pour le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.CORS_ORIGINS.split(",")],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

# DEV UNIQUEMENT : crée les tables si absentes
Base.metadata.create_all(bind=engine)

@app.get("/healthz")
def healthz():
    return {"status": "ok", "env": settings.ENV}

@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    # crée une ligne si vide, puis lit
    if not db.query(Ping).first():
        db.add(Ping(note="pong")); db.commit()
    row = db.query(Ping).first()
    return {"db": "ok", "ping": row.note}
