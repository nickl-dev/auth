import "./App.css";
import { api, type User } from "./lib/api";
import { Authenticated } from "./components/authenticated";
import { AuthForm } from "./components/auth-form";
import { Navbar } from "./components/navbar";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api
      .me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  async function logout() {
    await api.logout().catch(() => {});
    setUser(null);
  }

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-50 via-background to-indigo-50">
      <Navbar user={user} onLogout={logout} />
      <main className="flex flex-1 items-center justify-center p-4">
        {ready &&
          (user ? (
            <Authenticated />
          ) : (
            <AuthForm onSuccess={(user) => setUser(user)} />
          ))}
      </main>
    </div>
  );
}

export default App;
