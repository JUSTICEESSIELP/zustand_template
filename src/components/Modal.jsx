import { useState } from "react";
import { useTaskStore } from "../store/store";
import "./Modal.css";
import { shallow } from "zustand/shallow";

const Modal = ({ modalAddFunc, titleText, setTitleText }) => {
  return (
    <div className="modal_card_container">
      <input
        type="text"
        placeholder="enter task"
        name="task_title"
        id="task_title"
        value={titleText}
        onChange={(e) => setTitleText(e.target.value)}
      />

      <button onClick={() => modalAddFunc()}>Add Task</button>
    </div>
  );
};

export default Modal;
