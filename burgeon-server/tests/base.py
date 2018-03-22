import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from unittest import TestCase
from burgeon import app, db
from burgeon.models import User, Organization, Track, Goal, Task

class BurgeonTestCase(TestCase):

    def create_app(self):
        app.config.from_object('burgeon.settings.TestingConfig')
        return app.test_client()
        
    def create_test_user(self, email, password):
        user = User(email=email, password=password)
        self.db.session.add(user)
        self.db.session.commit()
        return user.id
        
    def create_test_track(self, name, user_id):
        track = Track(name=name, user_id=user_id)
        self.db.session.add(track)
        self.db.session.commit()
        return track.id

    def create_test_goal(self, name, track_id):
        goal = Goal(name=name, track_id=track_id)
        self.db.session.add(goal)
        self.db.session.commit()
        return goal.id

    def create_test_task(self, name, goal_id):
        task = Task(name=name, goal_id=goal_id)
        self.db.session.add(task)
        self.db.session.commit()
        return task.id

    def setUp(self):
        self.app = self.create_app()
        self.db = db
        self.db.create_all()
        self.db.session.commit()

    def tearDown(self):
        self.db.session.remove()
        self.db.drop_all()