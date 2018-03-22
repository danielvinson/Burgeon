// API Interaction abstraction

let burgeonAPI = {
    
    _post(url, data) {
        // Defaults for POST calls to the server
        // Converts both data and the response to JSON
        return fetch(url, {
                body: JSON.stringify(data),
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                mode: 'same-origin',
                redirect: 'error',
            }).then(response => response.json())
    },

    _get(url, data) {
        // Defaults for GET calls to the server
        // Converts the response to JSON
        return fetch(url, {
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
                mode: 'same-origin',
                redirect: 'error',
            }).then(response => response.json())
    },

    _put(url, data) {
        // Defaults for PUT calls to the server
        // Converts both data and the response to JSON
        return fetch(url, {
                body: JSON.stringify(data),
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT',
                mode: 'same-origin',
                redirect: 'error',
            }).then(response => response.json())
    },

    _delete(url, data) {
        // Defaults for DELETE calls to the server
        // Converts the response to JSON
        return fetch(url, {
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                method: 'DELETE',
                mode: 'same-origin',
                redirect: 'error',
            }).then(response => response.json())
    },
    
    /* Auth 
        API for Authentication
    */
    
    login(email, password, rememberMe) {
        // Log a user in
        return new Promise((resolve, reject) => {
            this._post('/auth/login', {email, password, rememberMe}).then((response) => { resolve(response) });
        });
    },
    
    logout() {
        // Log the currently logged in user out
        return new Promise((resolve, reject) => {
            this._post('/auth/logout', {}).then((response) => { resolve(response) });
        });
    },
    
    register(email, password, rememberMe) {
        // Registers a new user
        return new Promise((resolve, reject) => {
            this._post('/auth/register', {email, password, rememberMe}).then((response) => { resolve(response) });
        });
    },
    
    /* User 
        API for the current user
    */
    
    getUser() {
        // Returns information on the currently logged in user
        return new Promise((resolve, reject) => {
            this._get('/user').then((response) => { resolve(response) });
        });
    },
    
    updateUserSettings(data) {
        return new Promise((resolve, reject) => {
            this._put('/user', data).then((response) => { resolve(response) });
        });
    },
    
    /* Social
        API for interaction with other users
    */
    
    addPoints(count) {
        return new Promise((resolve, reject) => {
            this._post('/social/add_points', {count}).then((response) => { resolve(response) });
        });
    },
    
    getProfile(user_id) {
        return new Promise((resolve, reject) => {
            this._get('/profile/' + user_id).then((response) => { resolve(response) });
        })
    },
    
    /* Tracks
        API for interaction with Tracks
    */
    
    getTracks() {
        return new Promise((resolve, reject) => {
            this._get('/tracks').then((response) => { resolve(response) });
        })
    },
    
    getTrack(track_id) {
        return new Promise((resolve, reject) => {
            this._get('/tracks/' + track_id).then((response) => { resolve(response) });
        })
    },
    
    createTrack(data) {
        return new Promise((resolve, reject) => {
            this._post('/tracks', data).then((response) => { resolve(response) });
        })
    },
    
    updateTrack(track_id, data) {
        return new Promise((resolve, reject) => {
            this._put('/tracks/' + track_id, data).then((response) => { resolve(response) });
        })
    },
    
    deleteTrack(track_id) {
        return new Promise((resolve, reject) => {
            this._delete('/tracks/' + track_id).then((response) => { resolve(response) });
        })
    },
    
    /* Goals
        API for interaction with Goals
    */
    
    getGoals() {
        return new Promise((resolve, reject) => {
            this._get('/goals').then((response) => { resolve(response) });
        })
    },
    
    getGoal(goal_id) {
        return new Promise((resolve, reject) => {
            this._get('/goals/' + goal_id).then((response) => { resolve(response) });
        })
    },
    
    createGoal(data) {
        return new Promise((resolve, reject) => {
            this._post('/goals', data).then((response) => { resolve(response) });
        })
    },
    
    updateGoal(goal_id, data) {
        return new Promise((resolve, reject) => {
            this._put('/goals/' + goal_id, data).then((response) => { resolve(response) });
        })
    },
    
    deleteGoal(goal_id) {
        return new Promise((resolve, reject) => {
            this._delete('/goals/' + goal_id).then((response) => { resolve(response) });
        })
    },

    /* Tasks
        API for interaction with Tasks
    */
    
    getTasks() {
        return new Promise((resolve, reject) => {
            this._get('/tasks').then((response) => { resolve(response) });
        })
    },
    
    getTask(task_id) {
        return new Promise((resolve, reject) => {
            this._get('/tasks/' + task_id).then((response) => { resolve(response) });
        })
    },
    
    createTask(data) {
        return new Promise((resolve, reject) => {
            this._post('/tasks', data).then((response) => { resolve(response) });
        })
    },
    
    updateTask(task_id, data) {
        return new Promise((resolve, reject) => {
            this._put('/tasks/' + task_id, data).then((response) => { resolve(response) });
        })
    },
    
    deleteTask(task_id) {
        return new Promise((resolve, reject) => {
            this._delete('/tasks/' + task_id).then((response) => { resolve(response) });
        })
    },
}

export default burgeonAPI;
