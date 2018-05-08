import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import './index.css'
import { Provider } from './react-redux'

function createStore(reducer) {
    let state = null;
    const listeners = [];
    const subscribe = (listener) => {
        listeners.push(listener);
    }
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(action, state);
        listeners.forEach((listener) => listener());
    }

    dispatch({});
    return { getState, dispatch, subscribe };
}

const themeReducer = (action, state) => {
    if(!state) {
        return {
            themeColor: 'red'
        }
    }

    switch(action.type) {
        case 'CHANGE_COLOR': {
            return {
                ...state,
                themeColor: `${action.themeColor}`
            }
        }
        case 'RESET_COLOR': {
            return {
                ...state,
                themeColor: `red`
            }
        }
        default: {
            return state
        }
    }
}

const store = createStore(themeReducer);

class Index extends Component {
    render () {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

ReactDOM.render(
  <Provider store={store}>
      <Index />
  </Provider>,
  document.getElementById('root')
)