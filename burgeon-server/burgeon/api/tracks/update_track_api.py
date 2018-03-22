import logging
import json

from flask import request, make_response, jsonify
from flask.views import MethodView
from flask_login import current_user

from burgeon import db
from burgeon.models import Track

log = logging.getLogger('burgeon.track.update_track_api')

class UpdateTrackAPI(MethodView):
    """
    Update Track
    """
    def put(self, track_id):
        put_data = request.get_json()
        track = Track.query.get(track_id)
        if track:
            try:
                if 'name' in put_data.keys():
                    track.name = put_data['name']
                if 'archived' in put_data.keys():
                    if put_data['archived'] in ['True', 'true', '1']:
                        track.archived = True
                    else:
                        track.archived = False
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Track successfully updated.'
                }
                return make_response(jsonify(responseObject), 200)
            except Exception as e:
                log.error('Update Track failed. Error: {}.  Params: {}'.format(e, put_data))
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