import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [{ title: "Read Manging the mind", state: "DONE" }],
  addtask: (title, state) =>
    set((store) => {
      console.log(store.tasks, "STORE task ");
      const updatedTask = { tasks: [...store.tasks, { title, state }] };
      console.log(updatedTask, "UPDAATED STORE");
      return updatedTask;
    }),
}));
