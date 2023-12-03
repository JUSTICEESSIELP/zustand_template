import useTaskStore from "../store/store";
import "./Column.css";

import { useMemo } from "react";

import Task from "./Task";
import { shallow } from "zustand/shallow";
// eslint-disable-next-line react/prop-types
const Column = ({ states }) => {
  console.log(states);

  //   now there is sth to note about subscribing to the state ..... so normally we would have
  // like zustand making the component subscribe to the exact thing it wants to and not the whole object
  // but then when we use things like filter or map or other High level functions they cause return a new instance of an array and would cause re render since the Virtual Dom thinks there is a change in the state
  //to solve this we need to useMemo the array     2- we can use the shallow from zustand to make a shallow copy

  // we can also create our custom function to check if there is a change in the state of the array but with if we dont write an optimized function what is going to happen is that we are going to have performance issues

  //1. using the shallow from zustand to get a shallow copy
  //   const task = useTaskStore(
  //     (state) => state.tasks.filter((x) => x.state == states),
  //     shallow
  //   );

  //2. using the useMemo
  const task = useTaskStore((state) => state.tasks);
  const filteredTask = useMemo(
    () => task.filter((x) => x.state == states),
    [task, states]
  );

  console.log(task);
  return (
    <div className="column">
      {states}

      {filteredTask &&
        filteredTask.map((x) => {
          return <Task title={x.title} taskState={x.state} />;
        })}
    </div>
  );
};

export default Column;
