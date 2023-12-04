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

  const taskDelete = useTaskStore((store) => store.deleteTask);
  const setMovedTask = useTaskStore((store) => store.setMovedTask);

  const handleDelete = (title) => {
    console.log(title, "DDTTTILLE");
    taskDelete(title);
  };

  

  return (
    <div
      className="task_container"
      draggable={true}
      onDragStart={() => setMovedTask(titles.title)}
    >
      <div className="title_delete_wrapper">
        {titles.title}
        <button onClick={() => handleDelete(titles.title)}>Delete</button>
      </div>

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
