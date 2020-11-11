from sqlalchemy import Column, Integer, MetaData, String, ForeignKey, Boolean, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import relationship

from database_settings import PostgresConfiguration
from sqlalchemy.dialects.postgresql import UUID

pg = PostgresConfiguration()
engine = create_engine(pg.postgres_db_path)
meta = MetaData(engine)
Base = declarative_base()


class LocationTable(Base):
    __tablename__ = 'locations'
    location_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    cases = Column(Integer)
    check_in = Column(Integer)


class CommentTable(Base):
    __tablename__ = 'comments'
    comment_id = Column(Integer, primary_key=True, autoincrement=True)
    location_id = Column(Integer, ForeignKey('locations.location_id'))
    title = Column(String)
    comment = Column(String)
    timestamp = Column(String)


def create_tables():
    Base.metadata.create_all(engine, checkfirst=True)


if __name__ == '__main__':
    # create_tables()
    Base.metadata.drop_all(engine)
