import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db
from burgeon.models import Goal, Task

log = logging.getLogger('burgeon.api.task.create_task_api')

class CreateTaskAPI(MethodView):
    """
    Create Goal
    """
    def post(self):
        post_data = request.get_json()
        goal = Goal.query.get(post_data.get('goal_id'))
        if goal:
            try:
                task = Task(name=post_data.get('name'), goal_id=goal.id)
                db.session.add(task)
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Task successfully added'
                }
                return make_response(jsonify(responseObject), 201)
            except Exception as e:
                log.error('Add Task failed. Error: {}.  Params: {}'.format(e, post_data))
                responseObject = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
                return make_response(jsonify(responseObject), 401)
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Goal not found.',
            }
            return make_response(jsonify(responseObject), 404)