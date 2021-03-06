import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db
from burgeon.models import Track, Goal

log = logging.getLogger('burgeon.track.update_goal_api')

class UpdateGoalAPI(MethodView):
    """
    Update Goal
    """
    def put(self, goal_id):
        put_data = request.get_json()
        goal = Goal.query.get(goal_id)
        if goal:
            try:
                if 'name' in put_data.keys():
                    goal.name = put_data['name']
                    db.session.add(goal)
                    db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Goal successfully updated.'
                }
                return make_response(jsonify(responseObject), 200)
            except Exception as e:
                log.error('Update Goal failed. Error: {}.  Params: {}'.format(e, put_data))
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