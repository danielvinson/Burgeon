import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db, bcrypt
from burgeon.models import User

log = logging.getLogger('burgeon.track.update_user_settings_api')

class UpdateUserAPI(MethodView):
    """
    Update User
    """
    def put(self, user_id):
        put_data = request.get_json()
        user = current_user
        if user and not user.is_anonymous:
            try:
                if 'email' in put_data.keys():
                    user.email = put_data.get('email')
                if 'password' in put_data.keys():
                    user.password = bcrypt.generate_password_hash(put_data.get('password')).decode('utf-8')
                if 'staff' in put_data.keys():
                    user.staff = True if put_data.get('staff') in ['True', 'true'] else False
                if 'points' in put_data.keys():
                    user.points = put_data.get('points')
                if 'first_name' in put_data.keys();
                    user.first_name = put_data.get('first_name')
                if 'last_name' in put_data.keys();
                    user.last_name = put_data.get('last_name')
                if 'username' in put_data.keys();
                    user.username = put_data.get('username')
                db.session.add(user)
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'User successfully updated.'
                }
                return make_response(jsonify(responseObject), 200)
            except Exception as e:
                log.error('Update User failed. Error: {}.  Params: {}'.format(e, put_data))
                responseObject = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
                return make_response(jsonify(responseObject), 401)
        else:
            responseObject = {
                'status': 'fail',
                'message': 'You are not logged in.',
            }
            return make_response(jsonify(responseObject), 404)