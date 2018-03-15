import shortid from 'shortid';

import burgeonAPI from './api.js';

export const user = {
  state: {
    'loggedIn': false,
    'email': '',
    'points': 0,
  },
  reducers: {
    // handle state changes with pure functions
    update(state, data) {
      return data
    }
  },
  effects: {
    async updateUser(payload, rootState) {
      const user = await burgeonAPI.getUser();
      this.update(user);
    }
  }
}

export const alerts = {
  state: {
    'alerts': [
        {'id': 'test1', 'type': 'error', 'message': 'Sample Error Message'},
        {'id': 'test2', 'type': 'warning', 'message': 'Sample Warning Message'},
        {'id': 'test3', 'type': 'info', 'message': 'Sample Info Message'},
    ]
  },
  reducers: {
    create(state, params) {
        
      if (!('id' in params)){
          params.id = shortid.generate();
      }

      state.alerts.unshift({
          id: params.id,
          type: params.type,
          message: params.message,
      });
      
      return {
        ...state
      }
    },
    destroy(state, id) {
      state.alerts = state.alerts.filter(alert => alert.id != id);
      return {
        ...state
      }
    }
  }
}