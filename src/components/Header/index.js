import React, { Component } from "react";
import Popover from "material-ui/Popover";
import * as styles from "./css";

class Header extends Component {
  state = {
    open: false,
    anchorOriginVertical: "bottom",
    anchorOriginHorizontal: "left",
    transformOriginVertical: "top",
    transformOriginHorizontal: "left",
    anchorReference: "anchorEl"
  };

  handleClick = () =>
    this.setState({
      open: true
    });

  handleClose = () =>
    this.setState({
      open: false
    });

  setRef = node => {
    this.anchorEl = node;
  };

  handleLogout = () => console.log("logout");

  render() {
    const { container, avatar, menuItem, leftSide, rightSide } = styles;
    const {
      open,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
      positionTop,
      positionLeft,
      anchorReference
    } = this.state;

    const { role = "Admin", name = "Admin" } = this.props;
    return (
      <div className={container}>
        <div ref={this.setRef} onClick={this.handleClick} className={avatar}>
          {name[0].toUpperCase()}
        </div>
        <Popover
          open={open}
          anchorEl={this.anchorEl}
          anchorReference={anchorReference}
          anchorPosition={{ top: positionTop, left: positionLeft }}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal
          }}
        >
          <div className={menuItem}>
            <div className={leftSide}>
              <img
                alt=":)"
                className={`${avatar} small`}
                src={"/images/account.png"}
              />
            </div>
            <div className={rightSide}>
              <b>{role}</b>
              <div>{name}</div>
            </div>
          </div>
          <div className={menuItem} onClick={this.handleLogout}>
            <div className={leftSide}>
              <img
                alt=":)"
                className={`${avatar} small`}
                src={"/images/logout.png"}
              />
            </div>
            <div className={rightSide}>Logout</div>
          </div>
        </Popover>
      </div>
    );
  }
}

export default Header;
