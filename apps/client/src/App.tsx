import "./App.css";
import { Authenticated } from "./components/authenticated";
import { AuthForm } from "./components/auth-form";
import { AuthSkeleton } from "./components/auth-skeleton";
import { fetchMe } from "./store/auth-slice";
import { Navbar } from "./components/navbar";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  const { user, ready } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-50 via-background to-indigo-50">
      <Navbar />
      <main className="flex flex-1 items-center justify-center p-4">
        {!ready ? <AuthSkeleton /> : user ? <Authenticated /> : <AuthForm />}
      </main>
    </div>
  );
}

export default App;
