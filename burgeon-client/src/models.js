import shortid from 'shortid';

import burgeonAPI from './api.js';

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

export const user = {
  // The currently logged in user.
  state: {
    'loggedIn': false,
    'user_id': null,
    'email': '',
    'username': '',
    'first_name': '',
    'last_name': '',
    'profile_picture': '',
    'points': 0,
    'staff': false,
    'registered_on': null,
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
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_picture: user.profile_picture,
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
    async refresh(payload, rootState) {
      // refresh() should be called with no arguments to
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
          this.refresh();
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
          this.refresh();
          return true;
      } else {
        return false;
      }
    },
    async updateUserSettings(data, rootState) {
      const response = await burgeonAPI.updateUserSettings(data);
      if (response.status == 'success'){
          this.refresh();
      }
    },
    async addPoints(points, rootState) {
      const response = await burgeonAPI.addPoints(points);
      if (response.status == 'success'){
          this.refresh();
      }
    }
  }
}

export const tracks = {
  state: {},
  reducers: {
    _update(state, track_data) {
      console.log(track_data);
      return {
        ...state,
        [track_data.id]: track_data
      }
    }
  },
  effects: {
    async reloadTrack(payload, rootState) {
      const response = await burgeonAPI.getTrack(payload.track_id);
      if (response.status == 'success'){
        this._update(response.data);
      }
    },
    async reloadTracks(payload, rootState) {
      const response = await burgeonAPI.getTracks();
      if (response.status == 'success'){
        for (let track in response.data){
          this._update(response.data[track]);
        }
      }
    },
    async createTrack(payload, rootState) {
      const response = await burgeonAPI.createTrack(payload);
      if (response.status == 'success'){
        this.reloadTracks();
      }
    },
    async deleteTrack(payload, rootState) {
      const response = await burgeonAPI.deleteTrack(payload.track_id);
      if (response.status == 'success'){
        this.reloadTracks();
      }
    },
    async updateTrack(payload, rootState) {
      const response = await burgeonAPI.updateTrack(payload.track_id, payload);
      if (response.status == 'success'){
        this.reloadTrack(payload.track_id);
      }
    },
  },
}

export const goals = {
  state: {},
  reducers: {
    _update(state, goal_data) {
      return {
        ...state,
        [goal_data.id]: goal_data
      }
    }
  },
  effects: {
    async reloadGoal(payload, rootState) {
      const response = await burgeonAPI.getGoal(payload.goal_id);
      if (response.status == 'success'){
        this._update(response.data);
      }
    },
    async reloadGoals(payload, rootState) {
      const response = await burgeonAPI.getGoals();
      if (response.status == 'success'){
        for (let goal in response.data){
          this._update(response.data[goal]);
        }
      }
    },
    async createGoal(payload, rootState) {
      const response = await burgeonAPI.createGoal(payload);
      if (response.status == 'success'){
        this.reloadGoals();
      }
    },
    async deleteGoal(payload, rootState) {
      const response = await burgeonAPI.deleteGoal(payload.goal_id);
      if (response.status == 'success'){
        this.reloadGoals();
      }
    },
    async updateGoal(payload, rootState) {
      const response = await burgeonAPI.updateGoal(payload.goal_id, payload);
      if (response.status == 'success'){
        this.reloadGoal(payload.goal_id);
      }
    },
  },
}

export const tasks = {
  state: {},
  reducers: {
    _update(state, task_data) {
      return {
        ...state,
        [task_data.id]: task_data
      }
    }
  },
  effects: {
    async reloadTask(payload, rootState) {
      const response = await burgeonAPI.getTask(payload.task_id);
      if (response.status == 'success'){
        this._update(response.data);
      }
    },
    async reloadTasks(payload, rootState) {
      const response = await burgeonAPI.getTasks();
      if (response.status == 'success'){
        for (let task in response.data){
          this._update(response.data[task]);
        }
      }
    },
    async createTask(payload, rootState) {
      const response = await burgeonAPI.createTask(payload);
      if (response.status == 'success'){
        this.reloadTasks();
      }
    },
    async deleteTask(payload, rootState) {
      const response = await burgeonAPI.deleteTask(payload.task_id);
      if (response.status == 'success'){
        this.reloadTasks();
      }
    },
    async updateTask(payload, rootState) {
      const response = await burgeonAPI.updateTask(payload.task_id, payload);
      if (response.status == 'success'){
        this.reloadTask({'task_id': payload.task_id});
      }
    },
  },
}