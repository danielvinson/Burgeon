import logging
import json

from flask import make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

log = logging.getLogger('burgeon.api.user.get_user')

class GetUserAPI(MethodView):
    """
    User Resource
    """
    def get(self):
        user = current_user
        if user and not user.is_anonymous:
            responseObject = {
                'status': 'success',
                'data': {
                    'user_id': user.id,
                    'email': user.email,
                    'staff': user.staff,
                    'username': user.username,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'profile_picture': user.profile_picture,
                    'points': user.points,
                    'registered_on': user.registered_on
                }
            }
            return make_response(jsonify(responseObject), 200)
        else:
            responseObject = {
                'status': 'fail',
                'message': 'You are not logged in.'
            }
            return make_response(jsonify(responseObject), 401)