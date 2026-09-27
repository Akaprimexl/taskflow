import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBoardStore = create(
  persist(
    (set) => ({
      boards: [],

      addBoard: (ad) => {
        const newBoard = {
          id: Date.now().toString(),
          ad: ad.trim(),
          tarix: new Date().toISOString(),
        };

        set((state) => ({
          boards: [...state.boards, newBoard],
        }));
      },

      removeBoard: (id) => {
        set((state) => ({
          boards: state.boards.filter(
            (board) => board.id !== id
          ),
        }));
      },
    }),
    {
      name: "taskflow-boards",
    }
  )
);

export default useBoardStore;
