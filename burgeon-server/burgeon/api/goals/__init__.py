import logging
from flask import Blueprint

from burgeon.api.goals.create_goal_api import CreateGoalAPI
from burgeon.api.goals.update_goal_api import UpdateGoalAPI
from burgeon.api.goals.delete_goal_api import DeleteGoalAPI
from burgeon.api.goals.get_goal_api import GetGoalAPI
from burgeon.api.goals.get_goals_api import GetGoalsAPI

log = logging.getLogger('burgeon.goals')

goals_blueprint = Blueprint('goals', __name__)

# API resources
get_goals_api_view =    GetGoalsAPI.as_view('get_goals_api')
get_goal_api_view =     GetGoalAPI.as_view('get_goal_api')
create_goal_api_view = CreateGoalAPI.as_view('create_goals_api')
update_goal_api_view = UpdateGoalAPI.as_view('update_goals_api')
delete_goal_api_view = DeleteGoalAPI.as_view('delete_goals_api')

### API Endpoints

## GET
goals_blueprint.add_url_rule(
    '/goals',
    view_func=get_goals_api_view,
    methods=['GET']
)

goals_blueprint.add_url_rule(
    '/goals/<int:goal_id>',
    view_func=get_goal_api_view,
    methods=['GET']
)

## POST
goals_blueprint.add_url_rule(
    '/goals',
    view_func=create_goal_api_view,
    methods=['POST']
)

goals_blueprint.add_url_rule(
    '/goals/<int:goal_id>',
    view_func=update_goal_api_view,
    methods=['PUT']
)

goals_blueprint.add_url_rule(
    '/goals/<int:goal_id>',
    view_func=delete_goal_api_view,
    methods=['POST']
)
