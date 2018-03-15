import logging
from flask import Blueprint

from burgeon.social.points_api import AddPointsAPI

log = logging.getLogger('burgeon.social')

social_blueprint = Blueprint('social', __name__)

# API resources
add_points_api_view = AddPointsAPI.as_view('add_points_api')

# API Endpoints
social_blueprint.add_url_rule(
    '/social/add_points',
    view_func=add_points_api_view,
    methods=['POST']
)