import logging
from flask import Blueprint

from burgeon.api.tracks.create_track_api import CreateTrackAPI
from burgeon.api.tracks.update_track_api import UpdateTrackAPI
from burgeon.api.tracks.delete_track_api import DeleteTrackAPI
from burgeon.api.tracks.get_track_api import GetTrackAPI
from burgeon.api.tracks.get_tracks_api import GetTracksAPI

log = logging.getLogger('burgeon.tracks')

tracks_blueprint = Blueprint('tracks', __name__)

# API resources
get_tracks_api_view =   GetTracksAPI.as_view('get_tracks_api')
get_track_api_view =    GetTrackAPI.as_view('get_track_api')
create_track_api_view = CreateTrackAPI.as_view('create_tracks_api')
update_track_api_view = UpdateTrackAPI.as_view('update_tracks_api')
delete_track_api_view = DeleteTrackAPI.as_view('delete_tracks_api')

### API Endpoints

## GET
tracks_blueprint.add_url_rule(
    '/tracks',
    view_func=get_tracks_api_view,
    methods=['GET']
)

tracks_blueprint.add_url_rule(
    '/tracks/<int:track_id>',
    view_func=get_track_api_view,
    methods=['GET']
)

## POST
tracks_blueprint.add_url_rule(
    '/tracks',
    view_func=create_track_api_view,
    methods=['POST']
)

tracks_blueprint.add_url_rule(
    '/tracks/<int:track_id>',
    view_func=update_track_api_view,
    methods=['PUT']
)

tracks_blueprint.add_url_rule(
    '/tracks/<int:track_id>',
    view_func=delete_track_api_view,
    methods=['DELETE']
)
