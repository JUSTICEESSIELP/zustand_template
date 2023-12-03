import "./Task.css";
import classNames from "classnames";
import { useTaskStore } from "../store/store";
import { shallow } from "zustand/shallow";

// eslint-disable-next-line react/prop-types
const Task = ({ taskState, title }) => {
  const titles = useTaskStore(
    (state) => state.tasks.find((x) => x.title == title),
    shallow
  );
  console.log(titles);

  return (
    <div className="task_container">
      {titles.title}
      <div className="task_state_wrapper">
        <div
          className={classNames("task_text_component", `${taskState}_names`)}
        >
          {taskState}
        </div>
      </div>
    </div>
  );
};

export default Task;
