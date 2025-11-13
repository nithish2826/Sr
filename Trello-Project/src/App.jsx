import React from "react";
import Scrap from "./components/Scrap";
import { Analytics } from "@vercel/analytics/next"

const App = () => {
  return (
    <>
    <Analytics />
    <Scrap></Scrap>
    </>
  );
};
export default App;
