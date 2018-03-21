import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon.models import Track

log = logging.getLogger('burgeon.tracks.get_track_api')

class GetTrackAPI(MethodView):
    """
    Get Track
    """
    def get(self, track_id):
        try:
            track = Track.query.get(track_id)
            if track:
                responseObject = {
                    'status': 'success',
                    'data': track.to_json()
                }
                return make_response(jsonify(responseObject), 200)
            else:
                responseObject = {
                    'status': 'fail',
                    'message': 'Track Not Found.'
                }
                return make_response(jsonify(responseObject), 404)
        except Exception as e:
            log.error('Error Retreiving Track. Error: {}.'.format(e))
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject), 401)