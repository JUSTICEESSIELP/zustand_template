import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [],
  movedTask: null,
  setMovedTask: (title) => set((store) => ({ movedTask: title })),
  moveTaskAction: (title, state) =>
    set((store) => {
      const result = store.tasks.map((storeX, index) =>
        storeX.title == title ? { title, state } : storeX
      );
      return {
        tasks: [...result],
      };
    }),

  addtask: (title, state) =>
    set((store) => {
      const updatedTask = { tasks: [...store.tasks, { title, state }] };

      return updatedTask;
    }, false),

  deleteTask: (title) =>
    set((store) => {
      console.log(store.tasks, "BEFORE DELETE");
      console.log(title);
      const filteredTask = store.tasks.filter(
        (storeX) => storeX.title != title
      );

      console.log(filteredTask, "AFTER DELETEING");
      return { tasks: [...filteredTask] };
    }),
}));
