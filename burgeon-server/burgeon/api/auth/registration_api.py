import logging
import json

from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from burgeon import bcrypt, db
from burgeon.models import User

log = logging.getLogger('burgeon.auth.registration')

class RegistrationAPI(MethodView):
    """
    User Registration
    """
    def post(self):
        post_data = request.get_json()
        log.debug('Registration Request: {}'.format(json.dumps(post_data)))
        # check if user already exists
        user = User.query.filter_by(email=post_data.get('email')).first()
        if not user:
            try:
                # Attempt to create user
                user = User(
                    email=post_data.get('email'),
                    password=post_data.get('password')
                )
                db.session.add(user)
                db.session.commit()
                
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully registered.'
                }
                log.debug('User Created: {}-{}'.format(user.id, user.email))
                return make_response(jsonify(responseObject), 201)
            except Exception as e:
                # User creation failed
                log.error('User creation failed. Error: {}.  Params: {}'.format(e, json.dumps(post_data)))
                responseObject = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
                return make_response(jsonify(responseObject), 401)
        else:
            responseObject = {
                'status': 'fail',
                'message': 'User already exists. Please Log in.',
            }
            return make_response(jsonify(responseObject), 202)