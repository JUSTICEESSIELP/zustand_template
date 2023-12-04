import "./App.css";
import Column from "./components/Column";

function App() {
  const taskState = ["PLANNING", "ONGOING", "DONE"];

  return (
    <>
      <div className="App">
        {taskState.map((taskEnum, key) => {
          return <Column key={key} states={taskEnum} />;
        })}
      </div>
    </>
  );
}

export default App;
