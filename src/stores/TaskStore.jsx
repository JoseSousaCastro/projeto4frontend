import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define a store
export const taskStore = create(
    persist(
        (set) => ({
            title: "",
            description: "",
            priority: "",
            startDate: "",
            limitDate: "",

            updateTitle: (title) => set({ title }),
            updateDescription: (description) => set({ description }),
            updatePriority: (priority) => set({ priority }),
            updateStartDate: (startDate) => set({ startDate }),
            updateLimitDate: (limitDate) => set({ limitDate }),

            
            tasks: [],
            
            addTask: (task) =>
                set((state) => ({
                    tasks: [...state.tasks, task],
                })),

            editTask: (oldTask, updatedTask) =>
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === oldTask.id ? { ...task, ...updatedTask } : task
                    ),
                })),

            deleteTask: (deleteTask) =>
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== deleteTask.id),
                })),
        }),
        {
            name: "taskStore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);