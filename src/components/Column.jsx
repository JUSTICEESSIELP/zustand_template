import useTaskStore from "../store/store";
import "./Column.css";

import Task from "./Task";

// eslint-disable-next-line react/prop-types
const Column = ({ states }) => {
  console.log(states);
  const task = useTaskStore((state) =>
    state.tasks.filter((x) => x.state == states)
  );

  console.log(task);
  return (
    <div className="column">
      {states}

      {task &&
        task.map((x) => {
          return <Task title={x.title} taskState={x.state} />;
        })}
    </div>
  );
};

export default Column;
