import React,{useContext} from "react";
import {CanvasContext} from "../../context/CanvasContext";

export default function CanvasTest() {
  const {data}  = useContext(CanvasContext);
  return (
    <div>
      <h1>Canvas</h1>
      <pre>{data}</pre>
    </div>
  );
}
