import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db
from burgeon.models import User

log = logging.getLogger('burgeon.social.points')

class AddPointsAPI(MethodView):
    """
    Add Points Resource
    """
    def post(self):
        try:
            post_data = request.get_json()
            if post_data['count']:
                user = current_user
                user.add_points(int(post_data['count']))
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'data': {
                        'user_id': user.id,
                        'points': user.points
                    }
                }
                return make_response(jsonify(responseObject), 200)
        except Exception as e:
            log.error('Add Points failed. Error: {}.  Params: {}'.format(e, post_data))
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject), 401)