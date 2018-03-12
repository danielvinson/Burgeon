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
    
    login(email, password, rememberMe){
        // Log a user in
        this.postData('/auth/login', {email, password, rememberMe}).then((response) => { return response });
    },
    
    logout(){
        // Log the currently logged in user out
        this.postData('/auth/logout', {}).then((response) => { return response });
    },
    
    getUser(){
        // Returns information on the currently logged in user
        this.getData('/auth/user').then((response) => { return response });
    },
    
    register(email, password){
        // Registers a new user
        this.postData('/auth/register', {email, password}).then((response) => { return response });
    }
}

export default burgeonAPI;


