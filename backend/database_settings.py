class PostgresConfiguration:
    POSTGRES_DB_PORT = 5432
    POSTGRES_DB_NAME = 'covidmap'
    POSTGRES_DB_LOGIN = 'test_user'
    POSTGRES_DB_PASSWORD = 'example_pass'
    POSTGRES_DB_ADDRESS = 'covidmap-database'

    @property
    def postgres_db_path(self):
        return f'postgres://{self.POSTGRES_DB_LOGIN}:{self.POSTGRES_DB_PASSWORD}@' \
               f'{self.POSTGRES_DB_ADDRESS}:' \
               f'{self.POSTGRES_DB_PORT}/{self.POSTGRES_DB_NAME}'
