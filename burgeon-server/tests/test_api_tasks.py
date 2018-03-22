import sys
import os
import unittest
import json
from flask import current_app

try:
    from .base import BurgeonTestCase
except:
    from base import BurgeonTestCase

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from burgeon import db
from burgeon.models import User, Track, Goal, Task

class TestTasksAPI(BurgeonTestCase):

    def test_get_task(self):
        user_id = self.create_test_user('testy@zestytesty.com', 'topsecret')
        track_id = self.create_test_track('Test Track', user_id)
        goal_id = self.create_test_goal('Test Goal', track_id)
        task_id = self.create_test_task('Test Task', goal_id)
        
        res = self.app.get('/tasks/' + str(task_id))
        self.assertTrue(res.status_code == 200)
        
    def test_get_tasks(self):
        user_id = self.create_test_user('testy@zestytesty.com', 'topsecret')
        track_id = self.create_test_track('Test Track', user_id)
        goal_id = self.create_test_goal('Test Goal', track_id)
        task1_id = self.create_test_task('Test Task 1', goal_id)
        task2_id = self.create_test_task('Test Task 2', goal_id)
        
        res = self.app.get('/tasks')
        self.assertTrue(res.status_code == 200)
        
    def test_create_task(self):
        user_id = self.create_test_user('testy@zestytesty.com', 'topsecret')
        track_id = self.create_test_track('Test Track', user_id)
        goal_id = self.create_test_goal('Test Goal', track_id)
        
        res = self.app.post(
            '/tasks', 
            data=json.dumps({'name': 'Test Task', 'goal_id': goal_id}),
            content_type='application/json'
        )
        self.assertTrue(res.status_code == 201)
        
        created_task = Task.query.get(1)
        self.assertTrue(created_task.name == 'Test Task')
    
    def test_update_task(self):
        user_id = self.create_test_user('testy@zestytesty.com', 'topsecret')
        track_id = self.create_test_track('Test Track', user_id)
        goal_id = self.create_test_goal('Test Goal', track_id)
        task_id = self.create_test_task('Test Task', goal_id)

        res = self.app.put(
            '/tasks/' + str(task_id), 
            data=json.dumps({'name': 'Changed Task'}), 
            content_type='application/json'
        )
        self.assertTrue(res.status_code == 200)
        changed_task = Task.query.get(task_id)
        self.assertTrue(changed_task.name == 'Changed Task')

    def test_delete_task(self):
        user_id = self.create_test_user('testy@zestytesty.com', 'topsecret')
        track_id = self.create_test_track('Test Track', user_id)
        goal_id = self.create_test_goal('Test Goal', track_id)
        task_id = self.create_test_task('Test Task', goal_id)
        
        res = self.app.delete('/tasks/' + str(task_id))
        self.assertTrue(res.status_code == 200)
        
        deleted_task = Task.query.get(task_id)
        self.assertTrue(deleted_task == None)

if __name__ == '__main__':
    unittest.main()