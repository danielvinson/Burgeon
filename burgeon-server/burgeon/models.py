import datetime

from flask_login import UserMixin

from burgeon import app, db, bcrypt

###############################
### Users and Organizations ###
###############################

# Relation table for users to organizations (many to many)
user_org_relations = db.Table('user_org_relations',
    db.Column('organization_id', db.Integer, db.ForeignKey('organizations.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False) # should be always 60 bytes, but I'm playing it safe
    registered_on = db.Column(db.DateTime, nullable=False)
    
    tracks = db.relationship('Track', backref='users', lazy=True)

    # Point system might need to be more complicated in the future
    points = db.Column(db.Integer, nullable=False)
    
    # Determine if the User is a Burgeon staff member to access Admin site
    staff = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, **kwargs):
        if not 'password' in kwargs:
            raise ValueError('Password must be provided')
        self.email = kwargs.get('email', None)
        self.password = bcrypt.generate_password_hash(kwargs.get('password')).decode('utf-8')
        self.registered_on = datetime.datetime.now()
        self.points = 0
        self.staff = kwargs.get('staff', None)

    def __repr__(self):
        return '<User {self.username}>'.format(self=self)


class Organization(db.Model):
    __tablename__ = 'organizations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    
    users = db.relationship('User',
        secondary='user_org_relations',
        lazy='subquery',
        backref=db.backref('users', lazy=True)
    )
    
    def __repr__(self):
        return '<Organization {self.name}>'.format(self=self)
    
    def add_user(self, user):
        self.users.append(user)

################################
### Tracks, Goals, and Tasks ###
################################

class Track(db.Model):
    __tablename__ = 'tracks'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    
    # User is the only one who can edit this track
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    goals = db.relationship('Goal', backref='track', lazy=True)

    def __repr__(self):
        return '<Track {self.name}>'.format(self=self)


class Goal(db.Model):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'), nullable=False)
    tasks = db.relationship('Task', backref='goal', lazy=True)

    def __repr__(self):
        return '<Goal {self.name}>'.format(self=self)


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    goal_id = db.Column(db.Integer, db.ForeignKey('goals.id'), nullable=False)
    
    # We probably don't want to store notepad in text - this is a bit of a placeholder
    notepad = db.Column(db.String(1024 * 100)) # Max in postgres is 1GB, Max in sqlite is 2,147,483,647

    def __repr__(self):
        return '<Task {self.name}>'.format(self=self)