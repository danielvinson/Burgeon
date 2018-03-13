import sys
import os
import unittest
from flask import current_app

from base import BurgeonTestCase

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from burgeon import bcrypt
from burgeon.models import User

class TestUserModel(BurgeonTestCase):
    
    def test_create(self):
        test_user = User(email="test@testing.com", password="insecure")
        self.db.session.add(test_user)
        self.db.session.commit()
        self.assertTrue(True)

    def test_password_hashing(self):
        test_user = User(email="test@testing.com", password="insecure")
        self.db.session.add(test_user)
        self.db.session.commit()
        
        self.assertTrue(bcrypt.check_password_hash(test_user.password, 'insecure'))

    def test_query(self):
        test_user = User(email="test@testing.com", password="insecure")
        self.db.session.add(test_user)
        self.db.session.commit()
        
        users = User.query.all()
        self.assertTrue(users)

    def test_repr(self):
        test_user = User(email="test@testing.com", password="insecure")
        self.db.session.add(test_user)
        self.db.session.commit()
        
        self.assertEqual(repr(test_user), '<User test@testing.com>')
    
    def test_add_points(self):
        test_user = User(email="test@testing.com", password="insecure")
        self.db.session.add(test_user)
        self.db.session.commit()
        
        test_user.add_points(5)
        self.assertEqual(test_user.points, 5)

if __name__ == '__main__':
    unittest.main()
