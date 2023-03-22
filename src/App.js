import "./App.css";
import Todolist from "./stateless";
import Todo from "./statefull";
import React, { useState, useEffect, useRef } from "react";

function App() {
  return (
    <div className="App">
      {/* StateLess : */}
      {/* <Todolist /> */}
      {/*  */}

      {/* StateFull */}
      <Todo />
      {/*  */}
    </div>
  );
}

export default App;
