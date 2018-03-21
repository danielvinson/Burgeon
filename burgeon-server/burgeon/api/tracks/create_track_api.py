import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db
from burgeon.models import Track

log = logging.getLogger('burgeon.track.create_track_api')

class CreateTrackAPI(MethodView):
    """
    Create Track
    """
    def post(self):
        post_data = request.get_json()
        try:
            track = Track(name=post_data['name'], user_id=post_data['user_id'])
            db.session.add(track)
            db.session.commit()
            responseObject = {
                'status': 'success',
                'message': 'Track successfully added'
            }
            return make_response(jsonify(responseObject), 201)
        except Exception as e:
            log.error('Add Track failed. Error: {}.  Params: {}'.format(e, post_data))
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject), 401)