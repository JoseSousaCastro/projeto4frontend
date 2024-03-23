import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { userStore } from "./UserStore";

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
            setTasks: (tasks) => {
                console.log("Tarefas armazenadas:", tasks);
                set({ tasks });
            },
            fetchTasks: async () => {
                try {
                    const response = await fetch("http://localhost:8080/project_backend/rest/users/tasks", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            token: userStore.getState().token,
                        },
                    });
                    if (response.ok) {
                        const tasks = await response.json();
                        console.log("Tarefas recebidas:", tasks);
                        set({ tasks });
                    } else {
                        console.error("Failed to fetch tasks:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                }
            }
        }),
        {
            name: "taskStore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);