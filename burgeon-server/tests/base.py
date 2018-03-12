import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from unittest import TestCase
from burgeon import app, db

class BurgeonTestCase(TestCase):
    
    def create_app(self):
        app.config.from_object('burgeon.settings.TestingConfig')
        return app

    def setUp(self):
        self.app = self.create_app()
        db.create_all()
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()