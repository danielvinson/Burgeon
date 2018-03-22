import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db
from burgeon.models import Goal, Task

log = logging.getLogger('burgeon.api.task.delete_task_api')

class DeleteTaskAPI(MethodView):
    """
    Delete Goal
    """
    def delete(self, task_id):
        post_data = request.get_json()
        task = Task.query.get(task_id)
        if task:
            try:
                db.session.delete(task)
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Task successfully deleted.'
                }
                return make_response(jsonify(responseObject), 200)
            except Exception as e:
                log.error('Delete Task failed. Error: {}.  Params: {}'.format(e, post_data))
                responseObject = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
                return make_response(jsonify(responseObject), 401)
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Task not found.',
            }
            return make_response(jsonify(responseObject), 404)

