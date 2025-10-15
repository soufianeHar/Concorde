from sqlalchemy import Column, Integer, String
from .database import Base

# Petite table de test
class Ping(Base):
    __tablename__ = "ping"
    id = Column(Integer, primary_key=True, index=True)
    note = Column(String(50), nullable=False, default="pong")
