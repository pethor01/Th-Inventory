import React from "react";
import { render } from "react-dom";
// to be delete bootstrap only
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "../components/App";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.getElementById('root')
  );
});
