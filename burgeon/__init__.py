import os
import sys
import logging
import urlparse
import urllib

from flask import Flask

from burgeon import settings

def setup_logging():
    handler = logging.StreamHandler(sys.stdout if settings.LOG_STDOUT else sys.stderr)
    formatter = logging.Formatter(settings.LOG_FORMAT)
    handler.setFormatter(formatter)
    logging.getLogger().addHandler(handler)
    logging.getLogger().setLevel(settings.LOG_LEVEL)
    if LOG_TOFILE:
        fileHandler = logging.FileHandler(settings.LOG_FILENAME)
        fileHandler.setLevel(logging.DEBUG)
        logging.getLogger().addHandler(fileHandler)

def create_app():
    app = Flask(__name__)
    if settings.TEST:
        app.config['DATABASE'] = settings.TEST_DATABASE
    else:
        app.config['DATABASE'] = settings.DATABASE

    init_db(app)
    return app

setup_logging()
