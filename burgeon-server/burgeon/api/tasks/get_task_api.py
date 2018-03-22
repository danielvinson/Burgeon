import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon.models import Task

log = logging.getLogger('burgeon.api.tasks.get_task_api')

class GetTaskAPI(MethodView):
    """
    Get task
    """
    def get(self, task_id):
        try:
            task = Task.query.get(task_id)
            if task:
                responseObject = {
                    'status': 'success',
                    'data': task.to_json()
                }
                return make_response(jsonify(responseObject), 200)
            else:
                responseObject = {
                    'status': 'fail',
                    'message': 'Task Not Found.'
                }
                return make_response(jsonify(responseObject), 404)
        except Exception as e:
            log.error('Error Retreiving Task. Error: {}.'.format(e))
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject), 401)