from unittest import TestCase

from burgeon import app, db

class BaseTestCase(TestCase):

    def setUp(self):
        db.create_all()
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

if __name__ == '__main__':
    unittest.main()
