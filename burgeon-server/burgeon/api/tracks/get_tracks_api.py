import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon.models import Track

log = logging.getLogger('burgeon.tracks.get_tracks_api')

class GetTracksAPI(MethodView):
    """
    Get Tracks
    """
    def get(self):
        try:
            tracks = Track.query.all()
            responseObject = {
                'status': 'success',
                'data': [track.to_json() for track in tracks]
            }
            return make_response(jsonify(responseObject), 200)
        except Exception as e:
            log.error('Error Retreiving Tracks. Error: {}.'.format(e))
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject), 401)