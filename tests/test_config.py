from unittest import TestCase

from burgeon import app, db

class TestBaseAppConfig(TestCase):
    pass

class TestDevelopmentConfig(TestCase):
    pass

class TestTestingConfig(TestCase):
    pass

class TestProductionConfig(TestCase):
    pass


if __name__ == '__main__':
    unittest.main()
