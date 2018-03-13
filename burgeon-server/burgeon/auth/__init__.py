import logging
from flask import Blueprint

from burgeon.auth.registration_api import RegistrationAPI
from burgeon.auth.login_api import LoginAPI
from burgeon.auth.logout_api import LogoutAPI
from burgeon.auth.user_api import UserAPI

log = logging.getLogger('burgeon.auth')

# Loader for flask-login
from burgeon import login
from burgeon.models import User

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

auth_blueprint = Blueprint('auth', __name__)

# API resources
registration_view = RegistrationAPI.as_view('register_api')
login_view = LoginAPI.as_view('login_api')
user_view = UserAPI.as_view('user_api')
logout_view = LogoutAPI.as_view('logout_api')

# API Endpoints
auth_blueprint.add_url_rule(
    '/auth/register',
    view_func=registration_view,
    methods=['POST']
)
auth_blueprint.add_url_rule(
    '/auth/login',
    view_func=login_view,
    methods=['POST']
)
auth_blueprint.add_url_rule(
    '/auth/user',
    view_func=user_view,
    methods=['GET']
)
auth_blueprint.add_url_rule(
    '/auth/logout',
    view_func=logout_view,
    methods=['POST']
)