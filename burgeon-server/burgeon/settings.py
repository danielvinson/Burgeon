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
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class DevelopmentConfig(BaseConfig):
    # Development Configuration
    DEBUG = True
    SERVER_NAME = '0.0.0.0:8080'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///burgeon-dev.db'


class TestingConfig(BaseConfig):
    # Testing Configuration
    DEBUG = True
    TESTING = True
    SERVER_NAME = '0.0.0.0:8080'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'


class ProductionConfig(BaseConfig):
    # Production Configuration
    SERVER_NAME = '0.0.0.0:8080'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///burgeon.db'
