import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth-slice";
import theme from "./theme-slice";

export const store = configureStore({
  reducer: {
    auth,
    theme
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

function applyTheme() {
  const { mode } = store.getState().theme;
  document.documentElement.classList.toggle("dark", mode === "dark");
  localStorage.setItem("theme", mode);
}

applyTheme();
store.subscribe(applyTheme);
