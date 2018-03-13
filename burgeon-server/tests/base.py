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
        self.db = db
        self.db.create_all()
        self.db.session.commit()

    def tearDown(self):
        self.db.session.remove()
        self.db.drop_all()