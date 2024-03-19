import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define a store
export const categoryStore = create(
    persist(
        (set) => ({
            categories: [],
            // Função para adicionar uma nova categoria
            addCategory: (category) =>
                set((state) => ({
                    categories: [...state.categories, category],
                })),
            // Função para editar uma categoria existente
            editCategory: (oldCategory, updatedCategory) =>
                set((state) => ({
                    categories: state.categories.map((category) =>
                        category.name === oldCategory ? { ...category, ...updatedCategory } : category
                    ),
                })),
            // Função para excluir uma categoria
            deleteCategory: (deleteCategory) =>
                set((state) => ({
                    categories: state.categories.filter((category) => category.name !== deleteCategory),
                })),
        }),
        {
            name: "categoryStore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
