import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db
from burgeon.models import Track, Goal

log = logging.getLogger('burgeon.track.update_goal_api')

class UpdateTaskAPI(MethodView):
    """
    Update Goal
    """
    def post(self):
        post_data = request.get_json()
        goal = Goal.query.get(id=post_data.get('id'))
        if goal:
            try:
                for key, value in post_data.items():
                    if key in goal and key is not 'id':
                        goal[key] = value
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Goal successfully updated.'
                }
                return make_response(jsonify(responseObject), 200)
            except Exception as e:
                log.error('Update Goal failed. Error: {}.  Params: {}'.format(e, post_data))
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