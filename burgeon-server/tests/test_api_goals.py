import sys
import os
import unittest
import json
from flask import current_app

try:
    from .base import BurgeonTestCase
except:
    from base import BurgeonTestCase

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from burgeon import db
from burgeon.models import User, Track, Goal

class TestGoalsAPI(BurgeonTestCase):
    
    def test_get_goal(self):
        user = User(email="testy@thetesttest.com", password="topsecret")
        self.db.session.add(user)
        self.db.session.commit()
        track = Track(name="Test Track", user_id=user.id)
        self.db.session.add(track)
        self.db.session.commit()
        goal = Goal(name="Test Goal", track_id=track.id)
        self.db.session.add(goal)
        self.db.session.commit()

        res = self.app.get('/goals/' + str(goal.id))
        self.assertTrue(res.status_code == 200)
        res_json = json.loads(res.data.decode('utf-8').replace("'", "\""))
        self.assertTrue(res_json['data']['name'] == 'Test Goal')
        
    def test_get_goals(self):
        # Create data...
        user = User(email="testy@thetesttest.com", password="topsecret")
        self.db.session.add(user)
        self.db.session.commit()
        track = Track(name="Test Track", user_id=user.id)
        self.db.session.add(track)
        self.db.session.commit()
        goal1 = Goal(name="Test Goal 1", track_id=track.id)
        self.db.session.add(goal1)
        goal2 = Goal(name="Test Goal 2", track_id=track.id)
        self.db.session.add(goal2)
        self.db.session.commit()
        
        res = self.app.get('/goals')
        self.assertTrue(res.status_code == 200)
        res_json = json.loads(res.data.decode('utf-8').replace("'", "\""))
        self.assertTrue(len(res_json['data']) == 2)
    
    def test_create_goal(self):
        user = User(email="testy@thetesttest.com", password="topsecret")
        self.db.session.add(user)
        self.db.session.commit()
        track = Track(name="Test Track", user_id=user.id)
        self.db.session.add(track)
        self.db.session.commit()

        res = self.app.post(
            '/goals', 
            data=json.dumps({'name': 'Test Goal', 'track_id': track.id}),
            content_type='application/json'
        )
        self.assertTrue(res.status_code == 201)
        
        goal = Goal.query.get(1)
        self.assertTrue(goal.name == 'Test Goal')
    
    def test_update_goal(self):
        user = User(email="testy@thetesttest.com", password="topsecret")
        self.db.session.add(user)
        self.db.session.commit()
        track = Track(name="Test Track", user_id=user.id)
        self.db.session.add(track)
        self.db.session.commit()
        goal = Goal(name="Test Goal", track_id=track.id)
        self.db.session.add(goal)
        self.db.session.commit()
        goal_id = goal.id
        
        res = self.app.put(
            '/goals/' + str(goal.id), 
            data=json.dumps({'name': 'Changed Goal'}), 
            content_type='application/json'
        )
        self.assertTrue(res.status_code == 200)
        changed_goal = Goal.query.get(goal_id)
        self.assertTrue(changed_goal.name == 'Changed Goal')

    def test_delete_goal(self):
        user = User(email="testy@thetesttest.com", password="topsecret")
        self.db.session.add(user)
        self.db.session.commit()
        track = Track(name="Test Track", user_id=user.id)
        self.db.session.add(track)
        self.db.session.commit()
        goal = Goal(name="Test Goal", track_id=track.id)
        self.db.session.add(goal)
        self.db.session.commit()
        
        res = self.app.delete('/goals/' + str(goal.id))
        self.assertTrue(res.status_code == 200)
        
        deleted_goal = Goal.query.get(goal.id)
        self.assertTrue(deleted_goal == None)

    
if __name__ == '__main__':
    unittest.main()