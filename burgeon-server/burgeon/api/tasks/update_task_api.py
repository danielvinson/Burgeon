import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db
from burgeon.models import Task

log = logging.getLogger('burgeon.api.task.update_task_api')

class UpdateTaskAPI(MethodView):
    """
    Update Task
    """
    def put(self, task_id):
        put_data = request.get_json()
        task = Task.query.get(task_id)
        if task:
            try:
                if 'name' in put_data.keys():
                    task.name = put_data['name']
                if 'complete' in put_data.keys():
                    if put_data['complete'] in ['True', 'true', '1']:
                        track.complete = True
                    else:
                        track.complete = False
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Task successfully updated.'
                }
                return make_response(jsonify(responseObject), 200)
            except Exception as e:
                log.error('Update Task failed. Error: {}.  Params: {}'.format(e, put_data))
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