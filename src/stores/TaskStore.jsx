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
            stateId: "",
            category: "",
            erased: false,

            updateTitle: (title) => set({ title }),
            updateDescription: (description) => set({ description }),
            updatePriority: (priority) => set({ priority }),
            updateStartDate: (startDate) => set({ startDate }),
            updateLimitDate: (limitDate) => set({ limitDate }),
            updateStatusId: (stateId) => set({ stateId }),
            updateCategory: (category) => set({ category }),
            updateErased: (erased) => set({ erased }),

            
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