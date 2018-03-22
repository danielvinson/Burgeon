import sys
import os
import unittest
import json
from flask import current_app

from .base import BurgeonTestCase

class TestAuthAPI(BurgeonTestCase):
    
    def test_log_in(self):
        email="testy@zestytesty.com"
        password="secure"
        user_id = self.create_test_user(email=email, password=password)
        
        res = self.app.post(
            '/auth/login',
            data=json.dumps({ 'email': email, 'password': password }),
            content_type='application/json'
        )
        self.assertTrue(res.status_code == 200)
        res_json = json.loads(res.data.decode('utf-8').replace("'", "\""))
        self.assertTrue(res_json['status'] == 'success')
        
    def test_log_out(self):
        pass
    
    def test_register(self):
        pass

    
if __name__ == '__main__':
    unittest.main()