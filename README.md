# Burgeon

Burgeoning.me

Web App to track career growth, skills development, and learning over long time periods, initially focused on Software Developers.

## Overview

The inspiration of this project so far is that I've been wanting to use something more powerful than a simple to-do list for tracking professional development.  This applies to far more than just learning skills - I want to be able to set up a group of things to do for promotion to Senior Engineer, like "Lead 3 Projects" or "Design a New Microservice Architecture".  There are tons of really detailed resources out there which provide a great set of learning resources for a specific skill, but it is often very hard to both use these (often forking a GitHub repo to keep track) and hard to find them, especially when they are all in different places.

## Design

A *Track* is a set of goals.  Each *Track* will have an expected completion time (adjustable, maybe slow-med-fast-custom).  Each track will have an associated reward, which initially will be points, but can turn into something we verify and provide real, physical rewards for.

Each *Goal* can be anything that is achievable.  For example, in a "Learn Python" *Track*, you might have a *Goal* of "Learn Built-In Data Structures" and in a "Get Promoted" track, you might have a goal of *Learn Project Management Skills*.  Each goal will be related to any number of *Task*s.

Each *Task* is a single, time-trackable action which is part of a larger goal.  This might have a time estimate, but it shouldn't be required.  Each task has a *Notepad* which is basically a text document which you can use to take notes.  This can be a simple text editor, with the only really important features being lists with checkboxes, embedding links, and maybe being able to do block quotes.  I don't necesarily want this to just be a simple Markdown editor since we want this to be super-accessible to non-developers.

## MVP features

* [ ] *User* registration, login/logout, Profile page.
* [ ] *Track*s.  Create/Archive/Delete.
* [ ] *Goal*s.  Create/Delete.
* [ ] *Task*s.  Create/Complete/Edit/Update Notes/Delete.
* [ ] *Notepad*s.  Edit.
* [ ] Some amount of curated goal tracks for different specialties, with tips for each step (similar to the many "Learn Machine Learning" or "Google Interview Prep" repos).
* [ ] Home view - charts with progress (points or tasks) over time, list of current *Track*s, create/find new *Track*.  Suggested tracks.

## Release features

* Share tracks with other users.
* Gamification of goals with social charts/interaction
  * Points for basic stuff - fill out your profile, follow tutorial.
  * Points for daily login and checking in on your progress.
  * Points for completing (curated) goals.
  * Supportive messages for gaining points, super-extra-mega supportive messages for people struggling or aren't making progress.
* Real rewards for achieving (curated) goals - something cheap but substantial.  Maybe swag.


## Monetization features

* HR Integration for employers (Private *Track*s)
  * Employee account will get access to the private *Track*s the employer's admin account gives them access to.
  * Employer portal to create development tracks, add employees (either as new users or add access to existing user), and additional admin users.  Additional page to manage rewards for track completion.
* Sponsored public *Track*s
  * Set of goals with a sponsor-provided reward or point system.
  * Sponsor will have their logo on every page.


# Development

## Instalation/Deployment

On EC2:

Install base dependencies
```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y build-essential
sudo apt-get install -y python3 python3-pip
sudo apt-get install -y nginx
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Set environment variables (should be done from deploy script)
```
export FLASK_APP=burgeon
export FLASK_DEBUG=1
```


Clone project
```
sudo mkdir /burgeon
sudo chown ubuntu /burgeon
cd /burgeon
git clone https://github.com/danielvinson/Burgeon.git
(Enter GitHub credentials)
sudo chown ubuntu -R Burgeon/
cd Burgeon
```

Install backend dependencies
```
sudo pip3 install --upgrade pip
sudo pip3 install /burgeon-server/requirements.txt
```

Install frontend dependencies and build the frontend
```
cd burgeon-client/
sudo npm install
sudo npm install --global webpack
sudo node_modules/.bin/webpack
```

Start the development server with:  (change port to whatever you want it serving on)
```
cd /burgeon/Burgeon/burgeon-server
sudo -E python3 -m flask run --host=0.0.0.0 --port=8080
```

You can start a production server by first updating the nginx configuration
with a proxy_pass to the port you are running your flask server on.
I will include instructions for this later.


## Running the tests

### Server

Run:

```
cd /burgeon/Burgeon/burgeon-server/
pytest
```

### Client

## Built With

__Backend__
* [Flask]() - Python Web Framework
* [SQLAlchemy]() - Python ORM
* [Flask-SQLAlchemy]() - Flask+SQLAlchemy integration
* [Bcrypt]() - Password hashing library
* [Flask-Bcrypt]() - Flask Bcrypt integration
* [SQLite]() Database (will be updated to Postgres for production)


__Frontend__
* [React]() - Frontend Framework
* [Redux]() - State manager
* [Rematch]() - Redux wrapper for better syntax/defaults
* [Webpack]() - Build Tool

## Author

* **Daniel Vinson** - [GitHub Profile](https://github.com/danielvinson)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.
