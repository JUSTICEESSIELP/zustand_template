import { useTaskStore } from "../store/store";
import "./Column.css";

import { useMemo } from "react";

import Task from "./Task";
import { shallow } from "zustand/shallow";
import Modal from "./Modal";
import { filter } from "lodash";

// eslint-disable-next-line react/prop-types
const Column = ({ statement }) => {
console.log(statement, "COLUMNS ");
// now there is sth to note about subscribing to the state ..... so normally we would have
// like zustand making the component subscribe to the exact thing it wants to and not the whole object
// but then when we use things like filter or map or other High level functions they cause return a new instance of an array and would cause re render since the Virtual Dom thinks there is a change in the state
//to solve this we need to useMemo the array 2- we can use the shallow from zustand to make a shallow copy

// we can also create our custom function to check if there is a change in the state of the array but with if we dont write an optimized function what is going to happen is that we are going to have performance issues

//1. using the shallow from zustand to get a shallow copy
// const task = useTaskStore(
// (state) => state.tasks.filter((x) => x.state == statement),
// shallow
// );

//2. using the useMemo
const task = useTaskStore((state) => state.tasks);
const filteredTask = useMemo(
() => task.filter((x) => x.state == statement),
[task, statement]
);

// //3. custom function to check the change in the array
// const task = useTaskStore(
// (state) => state.tasks.filter((x) => x.state == statement),
// // (prev, next) => {
// // const longest = prev.length > next.length ? prev.length : next.length;
// // for (let i = 0; i < longest; i++) {
// // if (!prev[i] || !next[i]) return false;
// // if (prev[i] !== next[i]) return false;
// // }
// // return true;
// // }
// shallow
// );
const addTaskFunction = useTaskStore((store) => store.addtask);

const openModalFunction = useTaskStore((store) => store.openModal, shallow);

const isModalOpen = useTaskStore((store) => store.isOpen);
const handleAddTask = (e) => {
// addTaskFunction("new Task ", statement);
openModalFunction();
};
return (
<div className="column">
<div className="column_state_button_wrapper">
{statement}
<button onClick={() => handleAddTask()}>Add</button>
</div>

      {filteredTask &&
        filteredTask.map((x, key) => {
          return <Task key={key.title} title={x.title} taskState={x.state} />;
        })}

      {isModalOpen && (
        <div className="modal_container ">
          {/* {console.log(
            task.find((x) => x.state == statement),
            "dddddd"
          )} */}
          {console.log("BEFORE MODAL")}
          <Modal statement={statement} />
        </div>
      )}
    </div>

);
};

export default Column;
