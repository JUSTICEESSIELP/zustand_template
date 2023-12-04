import { useTaskStore } from "../store/store";
import "./Column.css";

import { useMemo, useState, useRef, useEffect } from "react";

import Task from "./Task";
import { shallow } from "zustand/shallow";
import Modal from "./Modal";
import classNames from "classnames";

// eslint-disable-next-line react/prop-types
const Column = ({ states }) => {
  const [isModalOpened, setModalOpen] = useState(false);
  const [isDragOver, setDragOver] = useState(false);

  const [titleText, setTitleText] = useState("");
  const taskStateRef = useRef();

  //   now there is sth to note about subscribing to the state ..... so normally we would have
  // like zustand making the component subscribe to the exact thing it wants to and not the whole object
  // but then when we use things like filter or map or other High level functions they cause return a new instance of an array and would cause re render since the Virtual Dom thinks there is a change in the state
  //to solve this we need to useMemo the array     2- we can use the shallow from zustand to make a shallow copy

  // we can also create our custom function to check if there is a change in the state of the array but with if we dont write an optimized function what is going to happen is that we are going to have performance issues

  //1. using the shallow from zustand to get a shallow copy
  const filteredTask = useTaskStore(
    (state) => state.tasks.filter((x) => x.state == states),
    shallow
  );

  //2. using the useMemo
  // const task = useTaskStore((state) => state.tasks);
  // const filteredTask = useMemo(
  //   () => task.filter((x) => x.state == states),
  //   [task, states]
  // );
  //   //3. custom function to check the change in the array
  //   const task = useTaskStore(
  //     (state) => state.tasks.filter((x) => x.state == states),
  //     // (prev, next) => {
  //     //   const longest = prev.length > next.length ? prev.length : next.length;
  //     //   for (let i = 0; i < longest; i++) {
  //     //     if (!prev[i] || !next[i]) return false;
  //     //     if (prev[i] !== next[i]) return false;
  //     //   }
  //     //   return true;
  //     // }
  //     shallow
  //   );
  const addTaskFunction = useTaskStore((state) => state.addtask);
  const setMovedTask = useTaskStore((store) => store.setMovedTask);
  const moveTaskAction = useTaskStore((store) => store.moveTaskAction);
  const movedTask = useTaskStore((store) => store.movedTask);

  const handleOpenModal = () => {
    setModalOpen(!isModalOpened);
    taskStateRef.current = states;
    console.log(taskStateRef.current);
  };

  const handleAddTask = (title, state) => {
    console.log(title, "BEFORE ADDING", taskStateRef.current);
    setModalOpen(!isModalOpened);

    addTaskFunction(title, state);
    // console.log(filteredTask, "AFTER ADDING", states);
  };
  return (
    <div
      className={classNames("column", { "is-drag-over": isDragOver })}
      onDrop={() => {
        moveTaskAction(movedTask, states);
        setMovedTask(null);
        setDragOver(false);
      }}
      onDragLeave={() => setDragOver(false)}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
    >
      <div className="column_state_button_wrapper">
        {states}
        <button onClick={() => handleOpenModal()}>Add</button>
      </div>

      {filteredTask &&
        filteredTask.map((x, key) => {
          return <Task key={key.title} title={x.title} taskState={x.state} />;
        })}

      {isModalOpened && (
        <div className="modal_container">
          <div className="modal_card_container">
            <input
              type="text"
              placeholder="enter task"
              name="task_title"
              id="task_title"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
            />

            <button onClick={() => handleAddTask(titleText, states)}>
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;
