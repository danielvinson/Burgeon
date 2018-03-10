import os
import click
from flask import Flask
from flask.cli import FlaskGroup

from burgeon import app, db

@app.cli.command()
def create_db():
    '''Initialize the database'''
    from burgeon.models import db
    click.echo('Initializing the database...')
    db.create_all()

@app.cli.command()
def drop_db():
    '''Drop the database'''
    from burgeon.models import db
    click.echo('Dropping the database...')
    db.drop_all()