import logging
import json

from flask import make_response, jsonify
from flask.views import MethodView

log = logging.getLogger('burgeon.api.social.get_profile')

from burgeon.models import User

class GetProfileAPI(MethodView):
    """
    User Resource
    """
    def get(self, user_id):
        user = User.query.get(user_id)
        if user:
            responseObject = {
                'status': 'success',
                'data': {
                    'user_id': user.id,
                    'username': user.username,
                    'profile_picture': user.profile_picture,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'points': user.points,
                    'registered_on': user.registered_on
                }
            }
            return make_response(jsonify(responseObject), 200)
        else:
            responseObject = {
                'status': 'fail',
                'message': 'User not found.'
            }
            return make_response(jsonify(responseObject), 404)