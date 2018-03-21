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
      return {
        ...state,
        loggedIn: true,
        email: user.email,
        points: user.points,
        staff: user.staff,
        registered_on: user.registered_on
      }
    },
    _logout(state) {
      return {
        ...state, 
        loggedIn: false
      }
    },
  },
  effects: {
    async update(payload, rootState) {
      // update() should be called with no arguments to
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
          return true;
      } else {
        return false;
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
          return true;
      } else {
        return false;
      }
    },
    async addPoints(points, rootState) {
        const response = await burgeonAPI.addPoints(points);
        if (response.status == 'success'){
            this.update();
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

      // unshift to add to the top of page
      const newAlert = {
        id: params.id,
        type: params.type,
        message: params.message
      };
      
      return {
        ...state,
        alerts: [].concat([newAlert], state.alerts)
      }
    },
    destroy(state, id) {
      return { 
        ...state, 
        alerts: state.alerts.filter(alert => alert.id != id)
      }
    }
  }
}