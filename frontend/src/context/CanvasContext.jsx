import React, { useState, useContext, useEffect, createContext } from "react";

export const CanvasContext = createContext();

export function CanvasContextProvider(props) {
  const [data, setData] = useState(0);
  return (
    <CanvasContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  );
}

export function useCanvasContext() {
  const canvasContext = useContext(CanvasContext);
  if (canvasContext === undefined) {
    throw new Error("No AuthProvider available for useCanvasContext");
  }
  return canvasContext;
}
