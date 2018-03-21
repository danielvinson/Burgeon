import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db
from burgeon.models import Track, Goal, Task

log = logging.getLogger('burgeon.track.create_goal_api')

class CreateTaskAPI(MethodView):
    """
    Create Goal
    """
    def post(self):
        post_data = request.get_json()
        track = Track.query.get(id=post_data.get('track_id'))
        if track:
            try:
                goal = Goal(name=post_data.get('name'), track_id=track.id)
                db.session.add(goal)
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Goal successfully added'
                }
                return make_response(jsonify(responseObject), 200)
            except Exception as e:
                log.error('Add Goal failed. Error: {}.  Params: {}'.format(e, post_data))
                responseObject = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
                return make_response(jsonify(responseObject), 401)
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Track not found.',
            }
            return make_response(jsonify(responseObject), 404)