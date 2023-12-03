import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [{ title: "Read Manging the mind", state: "DONE" }],
  bear: 0,
}));
