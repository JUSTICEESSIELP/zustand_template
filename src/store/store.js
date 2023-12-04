import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [],
  addtask: (title, state) =>
    set((store) => {
      const updatedTask = { tasks: [...store.tasks, { title, state }] };

      return updatedTask;
    }, false),


}));
