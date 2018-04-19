import React from "react";
import * as styles from "./css";
import Header from "../Header";

function AuthWrapper(props) {
  const Component = props.component;
  const { history } = props;
  const { container, header, sidebar, main } = styles;
  return (
    <div className={container}>
      <header className={header}>
        <Header {...props} />
      </header>
      <main className={main}>
        <Component {...props} />
      </main>
    </div>
  );
}

export default AuthWrapper;
