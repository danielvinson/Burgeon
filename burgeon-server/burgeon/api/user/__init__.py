import logging
from flask import Blueprint

from burgeon.api.user.get_user_settings_api import GetUserSettingsAPI
from burgeon.api.user.update_user_settings_api import UpdateUserSettingsAPI

log = logging.getLogger('burgeon.api.user')

user_bluepint = Blueprint('user', __name__)

# API resources
get_user_settings_api_view = GetUserSettingsAPI.as_view('get_user_settings_api')
update_user_settings_api_view = UpdateUserSettingsAPI.as_view('update_goal_api_view')

### API Endpoints

## GET
user_bluepint.add_url_rule(
    '/user',
    view_func=get_user_settings_api_view,
    methods=['GET']
)

## POST

user_bluepint.add_url_rule(
    '/user',
    view_func=update_user_settings_api_view,
    methods=['PUT']
)
