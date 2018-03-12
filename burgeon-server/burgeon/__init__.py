import os
import sys
import logging

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

'''
    ENV Variables

    FLASK_APP: 
    BURGEON_SETTINGS: python path for the configuration.
    BURGEON_SECRET_KEY: the secret key for the app.
'''

# Default to DevelopmentConfig if ENV variable is not set
app_settings = os.getenv(
    'BURGEON_SETTINGS',
    'burgeon.settings.DevelopmentConfig'
)

def setup_logging():
    formatter = logging.Formatter(app.config['LOG_FORMAT'])

    stdoutHandler = logging.StreamHandler(sys.stdout)
    stdoutHandler.setLevel(logging.DEBUG)
    stdoutHandler.setFormatter(formatter)

    fileHandler = logging.FileHandler(app.config['LOG_FILENAME'])
    fileHandler.setLevel(logging.DEBUG)
    fileHandler.setFormatter(formatter)

    if app.config['LOG_TOFILE']:
        logging.getLogger().addHandler(fileHandler)
    if app.config['LOG_STDOUT']:
        logging.getLogger().addHandler(stdoutHandler)

app = Flask(__name__)
app.config.from_object('burgeon.settings.DevelopmentConfig')
setup_logging()
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

import burgeon.views