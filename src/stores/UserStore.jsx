import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// define the store
export const userStore = create(
    persist(
        (set) => ({
        username: "",
        updateName: (username) => set({ username }),
        }),
        {
            name: "mystore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);