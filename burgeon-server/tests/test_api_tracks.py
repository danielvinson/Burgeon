import sys
import os
import unittest
import json
from flask import current_app

from base import BurgeonTestCase

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from burgeon import db
from burgeon.models import User, Track

class TestTracksAPI(BurgeonTestCase):
    
    def test_get_track(self):
        # Create data...
        user = User(email="testy@thetesttest.com", password="topsecret")
        self.db.session.add(user)
        self.db.session.commit()
        track = Track(name="Test Track", user_id=user.id)
        self.db.session.add(track)
        self.db.session.commit()
        track_id = track.id
        
        # Test
        res = self.app.get('/tracks/' + str(track_id))
        self.assertTrue(res.status_code == 200)
        res_json = json.loads(res.data.decode('utf-8').replace("'", "\""))
        self.assertTrue(res_json['data']['name'] == 'Test Track')
        
    def test_get_tracks(self):
        # Create data...
        user = User(email="testy@thetesttest.com", password="topsecret")
        self.db.session.add(user)
        self.db.session.commit()
        track1 = Track(name="Test Track 1", user_id=user.id)
        self.db.session.add(track1)
        track2 = Track(name="Test Track 2", user_id=user.id)
        self.db.session.add(track2)
        self.db.session.commit()

        # Test
        res = self.app.get('/tracks')
        self.assertTrue(res.status_code == 200)
        res_json = json.loads(res.data.decode('utf-8').replace("'", "\""))
        self.assertTrue(len(res_json['data']) == 2)
        self.assertTrue([track['name'] for track in res_json['data']] == ['Test Track 1', 'Test Track 2'])
    
    def test_create_track(self):
        # Create data...
        user = User(email="testy@thetesttest.com", password="topsecret")
        self.db.session.add(user)
        self.db.session.commit()
        
        # Test
        res = self.app.post(
            '/tracks', 
            data=json.dumps({'name': 'Test Track', 'user_id': user.id}),
            content_type='application/json'
        )

        self.assertTrue(res.status_code == 201)
        
        track = Track.query.get(1)
        self.assertTrue(track.name == 'Test Track')
    
    def test_update_track(self):
        # Create data...
        user = User(email="testy@thetesttest.com", password="topsecret")
        self.db.session.add(user)
        self.db.session.commit()
        track = Track(name="Test Track", user_id=user.id)
        self.db.session.add(track)
        self.db.session.commit()
        track_id = track.id
        
        # Test
        res = self.app.put(
            '/tracks/' + str(track_id), 
            data=json.dumps({'name': 'Changed', 'archived': 'true'}), 
            content_type='application/json'
        )
        self.assertTrue(res.status_code == 200)

        changed_track = Track.query.get(track_id)
        self.assertTrue(changed_track.name == 'Changed')
        self.assertTrue(changed_track.archived == True)
        
    def test_delete_track(self):
        # Create data...
        user = User(email="testy@thetesttest.com", password="topsecret")
        self.db.session.add(user)
        self.db.session.commit()
        track = Track(name="Test Track", user_id=user.id)
        self.db.session.add(track)
        self.db.session.commit()
        track_id = track.id
        
        # Test
        res = self.app.delete('/tracks/' + str(track_id))
        self.assertTrue(res.status_code == 202)
        
        deleted_track = Track.query.get(track_id)
        self.assertTrue(deleted_track == None)
    
if __name__ == '__main__':
    unittest.main()