import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db
from burgeon.models import Goal

log = logging.getLogger('burgeon.goals.get_goal_api')

class GetTaskAPI(MethodView):
    """
    Get Goal
    """
    def get(self, goal_id):
        try:
            goal = Goal.query(id=goal_id)
            if goal:
                responseObject = {
                    'status': 'success',
                    'data': goal
                }
                return make_response(jsonify(responseObject), 200)
            else:
                responseObject = {
                    'status': 'fail',
                    'message': 'Goal Not Found.'
                }
                return make_response(jsonify(responseObject), 404)
        except Exception as e:
            log.error('Error Retreiving Goal. Error: {}.'.format(e))
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject), 401)