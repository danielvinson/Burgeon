import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon.models import Goal

log = logging.getLogger('burgeon.goals.get_goals_api')

class GetTasksAPI(MethodView):
    """
    Get Goals
    """
    def get(self):
        try:
            goals = Goal.query.all()
            responseObject = {
                'status': 'success',
                'data': goals
            }
            return make_response(jsonify(responseObject), 200)
        except Exception as e:
            log.error('Error Retreiving Goals. Error: {}.'.format(e))
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject), 401)