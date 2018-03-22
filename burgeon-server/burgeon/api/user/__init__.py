import logging
from flask import Blueprint

from burgeon.api.user.get_user_settings_api import GetUserSettingsAPI
from burgeon.api.user.get_user_profile_api import GetUserProfileAPI
from burgeon.api.user.update_user_settings_api import UpdateUserSettingsAPI

log = logging.getLogger('burgeon.api.user')

user_bluepint = Blueprint('user', __name__)

# API resources
get_user_settings_api_view = GetUserSettingsAPI.as_view('get_user_settings_api')
get_user_profile_api_view = GetUserProfileAPI.as_view('get_user_profile_api')
update_user_settings_api_view = UpdateUserSettingsAPI.as_view('update_goal_api_view')

### API Endpoints

## GET
user_bluepint.add_url_rule(
    '/user',
    view_func=get_user_settings_api_view,
    methods=['GET']
)

user_bluepint.add_url_rule(
    '/user/<int:user_id>',
    view_func=get_user_profile_api_view,
    methods=['GET']
)

## POST

user_bluepint.add_url_rule(
    '/user/<int:user_id>',
    view_func=update_user_settings_api_view,
    methods=['PUT']
)
