import logging
from flask import Blueprint

from burgeon.api.tasks.create_task_api import CreateTaskAPI
from burgeon.api.tasks.update_task_api import UpdateTaskAPI
from burgeon.api.tasks.delete_task_api import DeleteTaskAPI
from burgeon.api.tasks.get_task_api import GetTaskAPI
from burgeon.api.tasks.get_tasks_api import GetTasksAPI

log = logging.getLogger('burgeon.tasks')

tasks_blueprint = Blueprint('tasks', __name__)

# API resources
get_tasks_api_view =    GetTasksAPI.as_view('get_tasks_api')
get_task_api_view =     GetTaskAPI.as_view('get_task_api')
create_tasks_api_view = CreateTaskAPI.as_view('create_tasks_api')
update_tasks_api_view = UpdateTaskAPI.as_view('update_tasks_api')
delete_tasks_api_view = DeleteTaskAPI.as_view('delete_tasks_api')

### API Endpoints

## GET
tasks_blueprint.add_url_rule(
    '/tasks',
    view_func=get_tasks_api_view,
    methods=['GET']
)

tasks_blueprint.add_url_rule(
    '/tasks/<int:task_id>',
    view_func=get_task_api_view,
    methods=['GET']
)

## POST
tasks_blueprint.add_url_rule(
    '/tasks',
    view_func=create_tasks_api_view,
    methods=['POST']
)

tasks_blueprint.add_url_rule(
    '/tasks/<int:task_id>',
    view_func=update_tasks_api_view,
    methods=['PUT']
)

tasks_blueprint.add_url_rule(
    '/tasks/<int:task_id>',
    view_func=delete_tasks_api_view,
    methods=['DELETE']
)
