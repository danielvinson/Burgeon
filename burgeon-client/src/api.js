// API Interaction abstraction

let burgeonAPI = {
    
    postData(url, data) {
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

    getData(url, data) {
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
    
    login(email, password, rememberMe) {
        // Log a user in
        return new Promise((resolve, reject) => {
            this.postData('/auth/login', {email, password, rememberMe}).then((response) => { resolve(response) });
        });
    },
    
    logout() {
        // Log the currently logged in user out
        return new Promise((resolve, reject) => {
            this.postData('/auth/logout', {}).then((response) => { resolve(response) });
        });
    },
    
    getUser() {
        // Returns information on the currently logged in user
        return new Promise((resolve, reject) => {
            this.getData('/auth/user').then((response) => { resolve(response) });
        });
    },
    
    register(email, password) {
        // Registers a new user
        return new Promise((resolve, reject) => {
            this.postData('/auth/register', {email, password}).then((response) => { resolve(response) });
        });
    },
    
    addPoints(count) {
        return new Promise((resolve, reject) => {
            this.postData('/social/add_points', {count}).then((response) => { resolve(response) });
        });
    },
}

export default burgeonAPI;
