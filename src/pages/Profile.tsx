import { useEffect, useState } from "react";
import axios from "axios";
import {
  Camera,
  Mail,
  Calendar,
  Shield,
  User as UserIcon,
  Sparkles,
  UploadCloud,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  approved: boolean;
  profileImage?: string;
  createdAt: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("ACCESS_TOKEN");

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "https://study-planner-app-be-i6jl.vercel.app/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.data);
    } catch (error: any) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const uploadImage = async () => {
    if (!image) {
      return alert("Please select image");
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setUploading(true);

      await axios.put(
        "https://study-planner-app-be-i6jl.vercel.app/api/v1/auth/profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile image updated");
      fetchProfile();
      setImage(null);
    } catch (error: any) {
      console.log(error.response?.data);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-3">
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <UserIcon className="w-4 h-4 text-indigo-600 absolute animate-pulse" />
        </div>
        <p className="text-slate-500 font-medium text-xs tracking-wide animate-pulse">
          Loading Profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-2">
          <div className="w-10 h-10 mx-auto rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <UserIcon size={20} />
          </div>
          <p className="text-slate-600 font-semibold text-xs">
            User not found or session expired
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 sm:px-6 py-4">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2.5 tracking-tight">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <UserIcon size={20} />
            </div>
            My Profile
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Manage your personal information and account settings
          </p>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Cover Banner */}
        <div className="relative h-24 sm:h-28 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/20 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Profile Content Details */}
        <div className="px-4 sm:px-6 pb-6">
          {/* Avatar & Photo Upload Row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-12 sm:-mt-14 gap-4">
            <div className="relative group">
              <img
                src={user.profileImage || "https://i.pravatar.cc/150"}
                alt="profile"
                className="
                  w-20
                  h-20
                  sm:w-24
                  sm:h-24
                  rounded-2xl
                  border-4
                  border-white
                  shadow-md
                  object-cover
                  bg-slate-100
                "
              />
            </div>

            <div className="flex items-center gap-2">
              <label
                className="
                cursor-pointer
                flex
                items-center
                gap-1.5
                px-3
                py-2
                bg-slate-100
                hover:bg-slate-200
                text-slate-700
                font-medium
                text-xs
                rounded-xl
                transition-all
              "
              >
                <Camera size={14} />
                Change Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </label>

              {image && (
                <button
                  onClick={uploadImage}
                  disabled={uploading}
                  className="
                  flex
                  items-center
                  gap-1.5
                  px-3.5
                  py-2
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  font-semibold
                  text-xs
                  rounded-xl
                  shadow-sm
                  transition-all
                  disabled:opacity-50
                "
                >
                  <UploadCloud size={14} />
                  {uploading ? "Uploading..." : "Save"}
                </button>
              )}
            </div>
          </div>

          {/* User Name & Role */}
          <div className="mt-4 text-center sm:text-left">
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight break-words">
              {user.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-[11px] font-semibold capitalize">
                <Sparkles size={10} className="text-amber-500" />
                {user.roles.join(", ")}
              </span>
            </div>
          </div>

          {/* User Info Details Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Email Card */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0">
                <Mail size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Email Address
                </p>
                <p className="text-xs font-semibold text-slate-800 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Joined Date Card */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 border border-purple-100 shrink-0">
                <Calendar size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Joined Date
                </p>
                <p className="text-xs font-semibold text-slate-800 truncate">
                  {new Date(user.createdAt).toDateString()}
                </p>
              </div>
            </div>

            {/* Account Status Card */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                <Shield size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Account Status
                </p>
                <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Account
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;