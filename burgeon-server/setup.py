from setuptools import setup

setup(
    name='burgeon',
    packages=['burgeon'],
    include_package_data=True,
    install_requires=[
        'flask',
        'sqlalchemy',
        'flask-sqlalchemy'
    ],
)