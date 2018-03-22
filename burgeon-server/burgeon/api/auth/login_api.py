import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import login_user

from burgeon import bcrypt, db
from burgeon.models import User

log = logging.getLogger('burgeon.auth.login')

class LoginAPI(MethodView):
    """
    User Login Resource
    """
    def post(self):
        # get the post data
        post_data = request.get_json()
        try:
            # fetch the user data
            user = User.query.filter_by(email=post_data.get('email')).first()
            if not user:
                responseObject = {
                    'status': 'fail',
                    'message': 'User does not exist.'
                }
                return make_response(jsonify(responseObject)), 404
            if not bcrypt.check_password_hash(user.password, post_data.get('password')):
                responseObject = {
                    'status': 'fail',
                    'message': 'Incorrect password.'
                }
                return make_response(jsonify(responseObject)), 401
            else:
                remember = True if post_data.get('rememberMe') in ['true', 'True'] else False
                login_user(user, remember=remember)
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged in.'
                }
                return make_response(jsonify(responseObject)), 200
        except Exception as e:
            log.error('Login failed: {}.  Params: {}'.format(e, post_data))
            responseObject = {
                'status': 'fail',
                'message': 'Login failed.'
            }
            return make_response(jsonify(responseObject)), 500