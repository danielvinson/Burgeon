from flask import Blueprint, request, make_response, jsonify, render_template
from flask.views import MethodView

from burgeon import app, db

# Serve the app frontend routes
@app.route('/')
@app.route('/login')
@app.route('/logout')
@app.route('/register')
def route_to_react():
    return render_template('index.html')