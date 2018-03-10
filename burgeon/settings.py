import os

class BaseConfig():
    # Base Configuration
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.getenv('BURGEON_SECRET_KEY', 'secret')

    # Logging
    LOG_FILENAME = 'burgeon-server.log'
    LOG_FORMAT = '%(asctime)s:%(name)s:%(levelname)s - %(message)s'
    LOG_TOFILE = True
    LOG_STDOUT = True

    # Database
    DATABASE_NAME = 'burgeon'


class DevelopmentConfig(BaseConfig):
    # Development Configuration
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///burgeon-dev.db'


class TestingConfig(BaseConfig):
    # Testing Configuration
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'


class ProductionConfig(BaseConfig):
    # Production Configuration
    SQLALCHEMY_DATABASE_URI = 'sqlite:///burgeon.db'
