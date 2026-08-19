import { useEffect, useState } from "react";
import api from "../service/api";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  KeyRound,
  Upload,
  Check,
  Camera,
  Loader2,
  BadgeCheck,
  ShieldAlert,
  Sliders,
} from "lucide-react";

type Profile = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  profileImage?: string;
  createdAt: string;
};

const AdminProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setProfile(res.data.data);

      if (res.data.data.profileImage) {
        setPreview(res.data.data.profileImage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const updateProfileImage = async () => {
    if (!selectedImage) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", selectedImage);

      const res = await api.put("/auth/profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(res.data.data);
      setSelectedImage(null);
      alert("Profile image updated successfully");
    } catch (error) {
      console.log(error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-3">
        <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />
        <p className="text-xs font-medium text-slate-500">
          Loading Administrator Profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-5 text-slate-700 antialiased font-sans">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5">
        
        {/* Header Banner */}
        <div className="relative overflow-hidden bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 rounded-full bg-gradient-to-br from-teal-50/50 via-indigo-50/30 to-transparent blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block px-2.5 py-0.5 mb-2 text-[11px] font-medium text-teal-800 bg-teal-50 border border-teal-100 rounded-full">
              Account Management
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
              Admin Profile
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5 max-w-xl">
              Manage administrator account details, credentials, and profile settings.
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Avatar & Core Info */}
            <div className="flex items-center gap-4">
              
              {/* Profile Image with Camera Overlay */}
              <div className="relative group shrink-0">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-200 shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-teal-700 text-white flex items-center justify-center text-2xl font-bold shadow-sm">
                    {profile?.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                {/* File Upload Trigger Overlay */}
                <label className="absolute inset-0 bg-slate-900/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* Profile Details */}
              <div className="space-y-1">
                <div className="flex items-center space-x-1.5">
                  <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                    {profile?.name}
                  </h2>
                  <BadgeCheck className="w-4 h-4 text-teal-600" />
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  System Administrator
                </p>

                {/* Role Badges */}
                <div className="flex gap-1.5 flex-wrap pt-0.5">
                  {profile?.roles?.map((role, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded-md bg-teal-50 border border-teal-100 text-teal-800 text-[10px] font-semibold capitalize tracking-wide"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Upload Action Buttons */}
            <div className="flex items-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <label className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium rounded-lg cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Change Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {selectedImage && (
                <button
                  onClick={updateProfileImage}
                  disabled={uploading}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium rounded-lg shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
                >
                  {uploading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>{uploading ? "Saving..." : "Save Image"}</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Information Grid */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <InfoCard
            icon={User}
            title="Full Name"
            value={profile?.name}
          />
          <InfoCard
            icon={Mail}
            title="Email Address"
            value={profile?.email}
          />
          <InfoCard
            icon={KeyRound}
            title="User ID"
            value={profile?.id}
          />
          <InfoCard
            icon={Calendar}
            title="Joined Date"
            value={
              profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "-"
            }
          />
        </div>

        {/* Key Account Metrics / System Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <StatCard
            icon={ShieldAlert}
            title="Account Status"
            value="Active"
            color="text-emerald-700"
            bgColor="bg-emerald-50"
            borderColor="border-emerald-100"
          />
          <StatCard
            icon={ShieldCheck}
            title="Role"
            value="Admin"
            color="text-indigo-700"
            bgColor="bg-indigo-50"
            borderColor="border-indigo-100"
          />
          <StatCard
            icon={Sliders}
            title="Access Level"
            value="Full Access"
            color="text-teal-700"
            bgColor="bg-teal-50"
            borderColor="border-teal-100"
          />
        </div>

      </div>
    </div>
  );
};

/* InfoCard Sub-component */
const InfoCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value?: string;
  icon: React.ElementType;
}) => {
  return (
    <div className="bg-white border border-slate-200/60 rounded-xl p-3.5 shadow-sm flex items-start space-x-3">
      <div className="p-2 bg-slate-100 text-slate-500 rounded-lg shrink-0 mt-0.5">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
          {title}
        </p>
        <p className="font-semibold text-slate-800 text-sm break-all">
          {value || "-"}
        </p>
      </div>
    </div>
  );
};

/* StatCard Sub-component */
const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  borderColor,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
}) => {
  return (
    <div
      className={`bg-white border ${borderColor} rounded-xl p-3.5 shadow-sm flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-1.5 rounded-lg ${bgColor} ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-2">
        <p className={`text-lg font-bold ${color} tracking-tight`}>{value}</p>
      </div>
    </div>
  );
};

export default AdminProfile;