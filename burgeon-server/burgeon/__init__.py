import os
import sys
import logging

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

'''
    ENV Variables

    FLASK_APP: burgeon
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
app.config.from_object(app_settings)
setup_logging()
bcrypt = Bcrypt(app)
login = LoginManager(app)
db = SQLAlchemy(app)

# Load frontend views
from burgeon import views

# Initialize the app blueprints for the API
from burgeon.auth import auth_blueprint
app.register_blueprint(auth_blueprint)