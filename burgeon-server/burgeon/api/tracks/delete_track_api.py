import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db
from burgeon.models import Track

log = logging.getLogger('burgeon.track.delete_track_api')

class DeleteTrackAPI(MethodView):
    """
    Delete Track
    """
    def delete(self, track_id):
        post_data = request.get_json()
        track = Track.query.get(track_id)
        if track:
            try:
                db.session.delete(track)
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Track successfully deleted.'
                }
                return make_response(jsonify(responseObject), 202)
            except Exception as e:
                log.error('Delete Track failed. Error: {}.  Params: {}'.format(e, post_data))
                responseObject = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
                return make_response(jsonify(responseObject), 401)
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Track not found.',
            }
            return make_response(jsonify(responseObject), 404)

