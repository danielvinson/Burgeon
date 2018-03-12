import sys
import os
import unittest
from flask import current_app

from base import BurgeonTestCase

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from burgeon import app

class TestDevelopmentConfig(BurgeonTestCase):
    
    def create_app(self):
        app.config.from_object('burgeon.settings.DevelopmentConfig')
        return app
    
    def test_development_config(self):
        self.assertTrue(self.app.config['DEBUG'] is True)
        self.assertFalse(current_app is None)
        self.assertTrue(self.app.config['SQLALCHEMY_DATABASE_URI'] == 'sqlite:///burgeon-dev.db')


class TestTestingConfig(BurgeonTestCase):
    
    def create_app(self):
        app.config.from_object('burgeon.settings.TestingConfig')
        return app
    
    def test_development_config(self):
        self.assertTrue(self.app.config['DEBUG'] is True)
        self.assertTrue(self.app.config['TESTING'] is True)
        self.assertFalse(current_app is None)
        self.assertTrue(self.app.config['SQLALCHEMY_DATABASE_URI'] == 'sqlite:///:memory:')


class TestProductionConfig(BurgeonTestCase):
    
    def create_app(self):
        app.config.from_object('burgeon.settings.ProductionConfig')
        return app
    
    def test_development_config(self):
        self.assertTrue(self.app.config['DEBUG'] is False)
        self.assertFalse(current_app is None)
        self.assertTrue(self.app.config['SQLALCHEMY_DATABASE_URI'] == 'sqlite:///burgeon.db')


if __name__ == '__main__':
    unittest.main()
