import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [{ title: "Read Manging the mind", state: "DONE" }],
}));

export default useTaskStore;
