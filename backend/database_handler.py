from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_settings import PostgresConfiguration
from models import LocationTable, CommentTable
from sqlalchemy.exc import InvalidRequestError


class PosgresHandler:
    def __init__(self, db_string):
        self.engine = create_engine(db_string)
        self.session = sessionmaker(bind=self.engine)
        self.session = self.session()

    # -------------------------------------------------- Locations ----------------------------------------------------
    def add_location(self, name, latitude, longitude):
        loc = self.get_location_by_coordinates(latitude, longitude)
        if loc:
            return loc

        loc = LocationTable(
            name=name,
            latitude=latitude,
            longitude=longitude,
            cases=1,
            check_in=1
        )
        self.session.add(loc)
        try:
            self.session.commit()
        except InvalidRequestError:
            self.session.rollback()
            raise InvalidRequestError
        return loc

    def get_location_by_id(self, loc_id: int):
        locations = self.session.query(LocationTable).filter(LocationTable.location_id == loc_id).first()
        return locations

    def get_location_by_coordinates(self, lati, longi):
        locations = self.session.query(LocationTable).filter(LocationTable.latitude == lati and LocationTable.longitude == longi).first()
        return locations

    def delete_location_by_id(self, loc_id: int):
        location_to_delete = self.get_location_by_id(loc_id)
        if location_to_delete:
            location_to_delete.delete()
            return True

        return False

    # -------------------------------------------------- Comments ----------------------------------------------------

    def add_comment(self, location_id, comment):

        comment_table = CommentTable(location_id=location_id, comment=comment)
        self.session.add(comment_table)
        try:
            self.session.commit()
        except InvalidRequestError:
            self.session.rollback()
            raise InvalidRequestError
        return comment_table

    def get_comments_by_location(self, location_id: int):
        comments = self.session.query(CommentTable).filter_by(location_id=location_id).all()
        if comments:
            return comments
        else:
            return []


pg_handler = PosgresHandler(PostgresConfiguration().postgres_db_path)
