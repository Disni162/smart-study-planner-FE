import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../service/auth";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      await register(name, email, password, role);

      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-6 overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://smartstudycampus.com/cdn/shop/files/startup-desk.jpg?v=1708884838&width=3840')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Glow Effects */}
      <div className="absolute w-40 h-40 sm:w-72 sm:h-72 bg-cyan-400/20 rounded-full blur-3xl top-10 left-0 sm:left-10"></div>

      <div className="absolute w-40 h-40 sm:w-72 sm:h-72 bg-indigo-500/20 rounded-full blur-3xl bottom-10 right-0 sm:right-10"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 mx-4 my-6">

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">
          Create Account ✨
        </h2>

        <p className="text-center text-white/60 text-xs sm:text-sm mt-2 mb-6">
          Join your Smart Study Planner
        </p>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-3 text-sm sm:text-base rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 text-sm sm:text-base rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 text-sm sm:text-base rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        {/* Role Dropdown */}
        <div className="mb-6 relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 text-sm sm:text-base rounded-xl bg-[#2a2d35]/80 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
              backgroundSize: "16px",
            }}
          >
            <option
              value="STUDENT"
              className="bg-[#1f222a] text-white"
            >
              Student
            </option>

            <option
              value="ADMIN"
              className="bg-[#1f222a] text-white"
            >
              Admin
            </option>
          </select>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-3 text-sm sm:text-base rounded-xl font-semibold transition-all duration-300 shadow-lg ${
            loading
              ? "bg-white/20 text-white cursor-not-allowed"
              : "bg-cyan-400 text-black hover:bg-cyan-300 hover:scale-[1.02] shadow-cyan-400/30"
          }`}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {/* Footer */}
        <p className="text-center text-white/60 text-xs sm:text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-cyan-300 font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default Register;