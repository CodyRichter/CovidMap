from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_settings import PostgresConfiguration
from models import LocationTable, CommentTable
from sqlalchemy.exc import InvalidRequestError
from time import localtime, strftime

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

    def get_locations(self):
        locations = self.session.query(LocationTable).all()
        return locations if locations else []

    def get_locations_by_name(self, search_string):
        # TODO: Filter search correctly
        locations = self.session.query(LocationTable).filter(LocationTable.name == search_string).first()
        return locations if locations else []

    def get_location_by_coordinates(self, lati, longi):
        locations = self.session.query(LocationTable).filter(LocationTable.latitude == lati and LocationTable.longitude == longi).first()
        return locations

    def delete_location_by_id(self, loc_id: int):
        location_to_delete = self.get_location_by_id(loc_id)
        if location_to_delete:
            location_to_delete.delete()
            return True

        return False

    def delete_all_locations(self):
        self.session.query(LocationTable).delete()

    def add_case_to_location(self, location_id):
        if not self.get_location_by_id(location_id):
            return 0
        self.session.query(LocationTable).filter(
            LocationTable.location_id == location_id).update({'cases': LocationTable.cases+1})
        try:
            self.session.commit()
        except InvalidRequestError:
            self.session.rollback()
            return 0
        return 1

    def check_in_to_location(self, location_id):
        if not self.get_location_by_id(location_id):
            return 0
        self.session.query(LocationTable).filter(
            LocationTable.location_id == location_id).update({'check_in': LocationTable.check_in+1})
        try:
            self.session.commit()
        except InvalidRequestError:
            self.session.rollback()
            return 0
        return 1

    # -------------------------------------------------- Comments ----------------------------------------------------

    def add_comment(self, location_id, title, comment):

        com = CommentTable(
            location_id=location_id,
            title=title,
            comment=comment,
            timestamp=strftime("%Y-%m-%d %H:%M:%S", localtime()),
        )
        self.session.add(com)
        try:
            self.session.commit()
        except InvalidRequestError:
            self.session.rollback()
            raise InvalidRequestError
        return com

    def get_comments_by_location(self, location_id: int):
        comments = self.session.query(CommentTable).filter_by(location_id=location_id).all()
        if comments:
            return comments
        else:
            return []


pg_handler = PosgresHandler(PostgresConfiguration().postgres_db_path)
