import create from "zustand";

type LogState = {
  logged: boolean;
  setLogged: (value: boolean) => void;
};

export const logStore = create<LogState>((set) => ({
  logged: false,
  setLogged: (value) => set({ logged: value }),
}));
