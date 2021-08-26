import React, { useState } from "react";
import Modal from "../UI/Modal";
import AddFile from "./AddFile";
import Header from "./Header";
import MyFile from "./MyFile";

const Home = () => {
  const [show, setShow] = useState(false);
  const showHandler = () => {
    setShow(true);
  };
  const hideHandler = () => {
    setShow(false);
  };
  return (
    <>
      {show && <Modal onClose={hideHandler} />}
      <Header />

      <AddFile onShow={showHandler} />
      <MyFile />
    </>
  );
};

export default Home;
