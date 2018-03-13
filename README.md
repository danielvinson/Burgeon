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

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds


## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.
