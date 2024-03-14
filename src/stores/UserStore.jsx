import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// define the store
export const userStore = create(
    persist(
        (set) => ({
        username: "",
        token: "",
        photoURL: "",
        typeOfUser: "",
        updateUsername: (username) => set({ username }),
        updateToken: (token) => set({ token }),
        updatePhotoURL: (photoURL) => set({ photoURL }),
        updateTypeOfUser: (typeOfUser) => set({ typeOfUser }),
        }),
        {
            name: "mystore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);