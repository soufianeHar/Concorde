from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    # Pydantic v2 : dire d'où lire et d'IGNORER les clés en plus (ENV, CO,RS_ORIGINS, etc.)
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()

# Connexion Postgres
engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

# Fabrique de sessions
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

# Base ORM
class Base(DeclarativeBase):
    pass

# Dépendance FastAPI : ouvre/ferme une session par requête
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()