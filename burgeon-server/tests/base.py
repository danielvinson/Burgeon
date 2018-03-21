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
        
    def create_test_data(self):
        pass

    def setUp(self):
        self.app = self.create_app()
        self.db = db
        self.db.create_all()
        self.db.session.commit()

    def tearDown(self):
        self.db.session.remove()
        self.db.drop_all()