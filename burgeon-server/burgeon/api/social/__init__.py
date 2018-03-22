import logging
from flask import Blueprint

from burgeon.api.social.points_api import AddPointsAPI
from burgeon.api.social.get_profile_api import GetProfileAPI

log = logging.getLogger('burgeon.social')

social_blueprint = Blueprint('social', __name__)

# API resources
add_points_api_view = AddPointsAPI.as_view('add_points_api')
get_profile_api_view = GetProfileAPI.as_view('get_profile_api')

# API Endpoints
social_blueprint.add_url_rule(
    '/social/add_points',
    view_func=add_points_api_view,
    methods=['POST']
)

social_blueprint.add_url_rule(
    '/profile/<int:user_id>',
    view_func=get_profile_api_view,
    methods=['GET']
)