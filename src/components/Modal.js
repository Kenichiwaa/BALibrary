import React from "react";
import ReactModal from "react-modal";

const Modal = ({ modalIsOpen, modalInfo, handleCloseModal }) => {
  console.log("modalIsOpen", modalIsOpen)
  return (
    <ReactModal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      contentLabel="Minimal Modal Example"
    >
      {console.log("modalinfxxx", modalInfo)}
      {modalInfo.id.attributes["im:id"]}
      <img src={modalInfo["im:image"][0].label} />
      <p>aerist name</p> {modalInfo["im:artist"].label}
      <button onClick={handleCloseModal}>Close Modal</button>
    </ReactModal>
  );
};

export default Modal;
