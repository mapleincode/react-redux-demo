import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    themeColor: state.themeColor
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    },
    onResetColor: () => {
      dispatch({ type: 'RESET_COLOR' })
    }
  }
}

class ThemeSwitch extends Component {
  static propTypes = {
    themeColor: PropTypes.string,
    onSwitchColor: PropTypes.func,
    onResetColor: PropTypes.func
  }

  constructor() {
    super();
  }


  handleSwitchColor(color) {
    if(this.props.onSwitchColor) {
      this.props.onSwitchColor(color)
    }
  }

  handleResetColor() {
    if(this.props.onResetColor) {
      this.props.onResetColor();
    }
  }

  render () {
    return (
      <div>
        <button style={{ color: this.props.themeColor }} onClick={this.handleSwitchColor.bind(this, 'red')}>Red</button>
        <button style={{ color: this.props.themeColor }} onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
        <button style={{ color: this.props.themeColor }} onClick={this.handleResetColor.bind(this, 'reset')}>Reset</button>
      </div>
    )
  }
}

ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);

export default ThemeSwitch