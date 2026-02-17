import React, { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const loginNow = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass,
      });

      if (error) throw error;
      nav("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
      setErr("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <form onSubmit={loginNow} className="w-full max-w-md">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 sm:p-6">

          <legend className="fieldset-legend text-lg sm:text-xl">Login</legend>

          {err && <p className="text-red-500 text-sm mb-2">{err}</p>}

          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full pl-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label mt-2">Password</label>
          <input
            type="password"
            className="input input-bordered w-full pl-3"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-neutral mt-4 w-full hover:bg-primary hover:text-white">
            Login
          </button>
        </fieldset>
      </form>

    </div>
  );
}
