import sys
import os
import unittest
from flask import current_app

from .base import BurgeonTestCase

class TestTasksAPI(BurgeonTestCase):
    
    def test_get_task(self):
        self.app.get('/task/1')
        
    def test_get_tasks(self):
        self.app.get('/tasks')
    
    def test_create_task(self):
        self.app.post('/task')
    
    def test_update_task(self):
        self.app.put('/task/1')
        
    def test_delete_task(self):
        self.app.delete('/task/1')

if __name__ == '__main__':
    unittest.main()