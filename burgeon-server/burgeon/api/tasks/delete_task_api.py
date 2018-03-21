import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db
from burgeon.models import Track, Goal

log = logging.getLogger('burgeon.track.delete_goal_api')

class DeleteTaskAPI(MethodView):
    """
    Delete Goal
    """
    def post(self):
        post_data = request.get_json()
        goal = Goal.query.get(id=post_data.get('id'))
        if goal:
            try:
                db.session.delete(goal)
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Goal successfully deleted.'
                }
                return make_response(jsonify(responseObject), 200)
            except Exception as e:
                log.error('Delete Goal failed. Error: {}.  Params: {}'.format(e, post_data))
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

