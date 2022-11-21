import React, { useState } from "react";
import Router from "./Router";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
