import React from "react";
import { Navigate } from "react-router-dom";
const Protected = (porps) => {
  const { Component } = porps;

  // console.log("in protexted", localStorage.getItem("token"));
  const Token = localStorage.getItem("token");
  // console.log("local storage", Token);
  return <>{Token !== null ? <Component /> : <Navigate to="/login" />}</>;
};

export default Protected;
