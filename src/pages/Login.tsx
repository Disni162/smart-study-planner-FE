import { useState } from "react";
import { getMyDetails, login } from "../service/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      const loginData = await login(email, password);

      const accessToken = loginData?.data?.accessToken;
      const refreshToken = loginData?.data?.refreshToken;

      if (!accessToken || !refreshToken) {
        alert("Login fail..!");
        return;
      }

      localStorage.setItem("ACCESS_TOKEN", accessToken);
      localStorage.setItem("REFRESH_TOKEN", refreshToken);

      const myRes = await getMyDetails();
      const userData = myRes?.data;

      setUser(userData);

      if (userData?.roles?.includes("ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (err) {
      console.error(err);
      alert("Login fail..!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.magnific.com/free-photo/ethnicity-woman-poses-worktable-looks-away-being-distracted-from-work-ponders-about-something-while-works-modern-laptop_273609-34560.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Soft Glow Effects */}
      <div className="absolute w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white">
          Welcome Back
        </h2>

        <p className="text-center text-white/60 text-sm mt-2 mb-6">
          Sign in to continue your Smart Study Planner
        </p>

        {/* Email */}
        <input
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
            loading
              ? "bg-white/20 text-white cursor-not-allowed"
              : "bg-cyan-400 text-black hover:bg-cyan-300 hover:scale-[1.02] shadow-cyan-400/30"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-cyan-300 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;