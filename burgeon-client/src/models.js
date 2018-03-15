import shortid from 'shortid';

import burgeonAPI from './api.js';

export const user = {
  state: {
    'loggedIn': false
  },
  reducers: {
    _update(state, user) {
      // should not be called directly
      // this should be looping through keys, but I'm
      // changing this very regularily and don't want 
      // to break the UI with API changes.
      state.loggedIn = true;
      state.email = user.email;
      state.points = user.points;
      state.staff = user.staff;
      state.user_id = user.user_id;
      state.registered_on = user.registered_on;
      return { ...state }
    },
    _logout(state) {
      return { loggedIn: false }
    },
    _addPoints(state, points){
      state.points += points;
      return { ...state }
    }
  },
  effects: {
    async update(payload, rootState) {
      // updateUser() should be called with no arguments to
      // refresh the current user and update the global state
      const response = await burgeonAPI.getUser();
      if (response.status == 'success'){
        this._update(response.data);
      }
    },
    async logout(payload, rootState) {
      const response = await burgeonAPI.logout();
      if (response.status == 'success'){
          this._logout();
          this.update();
      }
    },
    async login(payload, rootState) {
      const response = await burgeonAPI.login(
        payload.email, 
        payload.password, 
        payload.rememberMe
      );
      if (response.status == 'success'){
          this.update();
      }
    },
    async addPoints(points, rootState) {
        const response = await burgeonAPI.addPoints(points);
        if (response.status == 'success'){
            this._addPoints(points);
        }
    }
  }
}

export const alerts = {
  state: {
    'alerts': []
  },
  reducers: {
    create(state, params) {
      /*
        params:
            <id>(optional)
            <type>(required) error, warning, info
            <message>(required)
      */
      // if id is not specified, generate one
      if (!('id' in params)){
          params.id = shortid.generate();
      }
      console.log(params);
      // unshift to add to the top of page
      state.alerts.unshift({
          id: params.id,
          type: params.type,
          message: params.message,
      });
      
      return { ...state }
    },
    destroy(state, id) {
      state.alerts = state.alerts.filter(alert => alert.id != id);
      return { ...state }
    }
  }
}