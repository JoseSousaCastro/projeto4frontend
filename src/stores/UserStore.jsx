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

        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        userTasks: [],
        visible: true,
        updateUsername: (username) => set({ username }),
        updateToken: (token) => set({ token }),
        updatePhotoURL: (photoURL) => set({ photoURL }),
        updateTypeOfUser: (typeOfUser) => set({ typeOfUser }),

        updateEmail: (email) => set({ email }),
        updateFirstName: (firstName) => set({ firstName }),
        updateLastName: (lastName) => set({ lastName }),
        updatePhone: (phone) => set({ phone }),
        updatePassword: (password) => set({ password }),
        updateUserTasks: (userTasks) => set({ userTasks }),
        updateVisible: (visible) => set({ visible }),
        }),
        {
            name: "mystore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);