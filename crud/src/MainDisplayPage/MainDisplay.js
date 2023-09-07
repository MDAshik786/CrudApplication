import React from 'react'
import Display from "./Display";
import MainLayout from "../Layout__/MainLayout.js";
import { useState } from "react";

const MainHeader = ({logIdn}) => {
  return (
    <main>
    <MainLayout >
      <Display
      logIdn ={logIdn}
       />
    </MainLayout>
  </main>
  )
}

export default MainHeader