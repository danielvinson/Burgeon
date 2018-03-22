import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon.models import Task

log = logging.getLogger('burgeon.api.tasks.get_tasks_api')

class GetTasksAPI(MethodView):
    """
    Get Tasks
    """
    def get(self):
        try:
            tasks = Task.query.all()
            responseObject = {
                'status': 'success',
                'data': [task.to_json() for task in tasks]
            }
            return make_response(jsonify(responseObject), 200)
        except Exception as e:
            log.error('Error Retreiving Tasks. Error: {}.'.format(e))
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject), 401)