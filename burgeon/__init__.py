import os
import sys
import logging
import urlparse
import urllib

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

'''
    ENV Variables

    FLASK_APP: 
    BURGEON_SETTINGS: python path for the configuration.
    BURGEON_SECRET_KEY: the secret key for the app.
'''


def setup_logging():
    formatter = logging.Formatter(app.config.LOG_FORMAT)

    stdoutHandler = logging.StreamHandler(sys.stdout)
    stdoutHandler.setLevel(logging.DEBUG)
    stdoutHandler.setFormatter(formatter)

    fileHandler = logging.FileHandler(app.config.LOG_FILENAME)
    fileHandler.setLevel(logging.DEBUG)
    fileHandler.setFormatter(formatter)

    if app.config.LOG_TOFILE:
        logging.getLogger().addHandler(fileHandler)
    if app.config.LOG_STDOUT:
        logging.getLogger().addHandler(stdoutHandler)


app = Flask(__name__)

app_settings = os.getenv(
    'BURGEON_SETTINGS',
    'burgeon.settings.DevelopmentConfig'
)
app.config.from_object(app_settings)
setup_logging()
db = SQLAlchemy(app)
