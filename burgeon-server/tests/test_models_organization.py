import sys
import os
import unittest
from flask import current_app

from base import BurgeonTestCase

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from burgeon.models import User, Organization

class TestOrganizationModel(BurgeonTestCase):
    
    def test_create(self):
        test_org = Organization(name="The Zesty Testy Inc.")
        self.db.session.add(test_org)
        self.db.session.commit()
        self.assertTrue(True)

    def test_query(self):
        test_org = Organization(name="The Zesty Testy Inc.")
        self.db.session.add(test_org)
        self.db.session.commit()
        
        orgs = Organization.query.all()
        self.assertTrue(orgs)

    def test_repr(self):
        test_org = Organization(name="The Zesty Testy Inc.")
        self.db.session.add(test_org)
        self.db.session.commit()

        self.assertEqual(repr(test_org), '<Organization The Zesty Testy Inc.>')
    
    def test_add_user_to_org(self):
        test_org = Organization(name="The Zesty Testy Inc.")
        test_user = User(email="test@testing.com", password="insecure")
        self.db.session.add(test_org)
        self.db.session.add(test_user)
        self.db.session.commit()
        
        test_org.add_user(test_user)
        
        self.assertTrue(test_org.users)

    def test_remove_user_from_org(self):
        test_org = Organization(name="The Zesty Testy Inc.")
        test_user = User(email="test@testing.com", password="insecure")
        self.db.session.add(test_org)
        self.db.session.add(test_user)
        self.db.session.commit()
        test_org.add_user(test_user)
        
        test_org.remove_user(test_org.users[0])
        
        self.assertFalse(test_org.users)


if __name__ == '__main__':
    unittest.main()
