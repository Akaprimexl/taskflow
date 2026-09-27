import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],

      addTask: (task) => {
        const newTask = {
          ...task,
          id: Date.now().toString(),
          tarix: new Date().toISOString(),
        };

        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },

      removeTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter(
            (task) => task.id !== id
          ),
        }));
      },

      updateTaskStatus: (id, status) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, status }
              : task
          ),
        }));
      },
    }),
    {
      name: "taskflow-tasks",
    }
  )
);

export default useTaskStore;
