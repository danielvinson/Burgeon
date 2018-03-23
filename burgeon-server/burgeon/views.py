from flask import Blueprint, request, make_response, jsonify, render_template
from flask.views import MethodView

from burgeon import app, db

### Serve the app frontend routes
# I'm writing out all of the possible routes here as
# both functional code and documentation so that this
# project is a big easier to grasp once it gets larger
@app.route('/')
@app.route('/login')
@app.route('/register')
@app.route('/settings')
@app.route('/profile')
@app.route('/test')
def route_to_react():
    return render_template('index.html')

@app.route('/track/<int:id>')
@app.route('/goal/<int:id>')
def route_to_react_with_id(id):
    return render_template('index.html')