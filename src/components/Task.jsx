import "./Task.css";
import classNames from "classnames";

// eslint-disable-next-line react/prop-types
const Task = ({ taskState, title }) => {
  return (
    <div className="task_container">
      {title}
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
