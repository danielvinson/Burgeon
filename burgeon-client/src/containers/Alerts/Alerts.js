import React, { Component } from 'react';
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'

import Icon from '../../components/Icons.js';

import './Alerts.css';

export const Alerts = props => (
  <div className="Alerts">
    <CSSTransitionGroup
        transitionName="alertTransitions"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
    >
        {props.alerts.alerts.map((alert) => {
    
            // Figure out correct icon...
            let iconName = 'question';
            if (alert.type == 'error'){
                iconName = 'alert';
            } else if (alert.type == 'warning'){
                iconName = 'stop';
            } else if (alert.type == 'info'){
                iconName = 'question';
            }
            
            return (
              <div className={`Alert ${alert.type}`} key={alert.id}>
                <Icon icon={iconName} width={24} />
                <div className="alertMessage">{alert.message}</div>
                <div onClick={() => props.destroy(alert.id)}>
                    <Icon icon={'x'} width={24} />
                </div>
              </div>
            )
        })}
    </CSSTransitionGroup>
  </div>
)

const mapState = state => ({
  alerts: state.alerts
});

const mapDispatch = dispatch => ({
  destroy: id => dispatch.alerts.destroy(id),
});

export default connect(mapState, mapDispatch)(Alerts)