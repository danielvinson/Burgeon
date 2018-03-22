import sys
import os
import unittest
from flask import current_app

try:
    from .base import BurgeonTestCase
except:
    from base import BurgeonTestCase

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from burgeon import bcrypt
from burgeon.models import User, Track

class TestTrackModel(BurgeonTestCase):
    
    def test_create(self):
        user_id = self.create_test_user(email="test@testing.com", password="insecure")
        
        track = Track(name="test track", user_id=user_id)
        self.db.session.add(track)
        self.db.session.commit()
        self.assertTrue(True)

    def test_query(self):
        user_id = self.create_test_user(email="test@testing.com", password="insecure")
        track_id = self.create_test_track(name="test track", user_id=user_id)
        
        track = Track.query.get(track_id)
        self.assertTrue(track.name == "test track")

    def test_repr(self):
        user_id = self.create_test_user(email="test@testing.com", password="insecure")
        track_id = self.create_test_track(name="test track", user_id=user_id)
        
        track = Track.query.get(track_id)
        self.assertEqual(repr(track), '<Track test track>')
    
    def test_add_goal(self):
        pass


if __name__ == '__main__':
    unittest.main()
