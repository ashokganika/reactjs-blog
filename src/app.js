import React from "react";
import Routing from "./routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export class Apps extends React.Component {
  render() {
    return (
      <>
        <Routing />
        <ToastContainer />
      </>
    );
  }
}
