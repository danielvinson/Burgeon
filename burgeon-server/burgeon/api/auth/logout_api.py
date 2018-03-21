import logging
import json

from flask import make_response, jsonify
from flask.views import MethodView
from flask_login import logout_user

log = logging.getLogger('burgeon.auth.logout')

class LogoutAPI(MethodView):
    """
    Logout Resource
    """
    def post(self):
        try:
            logout_user()
            responseObject = {
                'status': 'success',
                'message': 'Successfully logged out.'
            }
            return make_response(jsonify(responseObject), 200)
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': e
            }
            return make_response(jsonify(responseObject)), 200