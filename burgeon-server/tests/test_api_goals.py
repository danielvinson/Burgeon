import sys
import os
import unittest
import json
from flask import current_app

from .base import BurgeonTestCase

class TestGoalsAPI(BurgeonTestCase):
    
    def test_get_goal(self):
        res = self.app.get('/goal/1')
        self.assertTrue(res.status_code == 200)
        res_json = json.loads(res.data.decode('utf-8').replace("'", "\""))
        
    def test_get_goals(self):
        res = self.app.get('/goals')
        self.assertTrue(res.status_code == 200)
    
    def test_create_goal(self):
        # Goal must be associated with a Track, so we must make a Track first
        
        res = self.app.post('/goal', {})
        self.assertTrue(res.status_code == 201)
    
    def test_update_goal(self):
        res = self.app.put('/goal/1')
        self.assertTrue(res.status_code == 200)
        
    def test_delete_goal(self):
        res = self.app.delete('/goal/1')
        self.assertTrue(res.status_code == 200)
        
        res = self.app.get('/goal/1')
        self.assertTrue(res.status_code == 404)
    
if __name__ == '__main__':
    unittest.main()