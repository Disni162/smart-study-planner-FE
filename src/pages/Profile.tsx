import { useEffect, useState } from "react";
import axios from "axios";
import {
  Camera,
  Mail,
  Calendar,
  Shield,
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
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [image, setImage] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const token =
    localStorage.getItem("ACCESS_TOKEN");

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.data);
    } catch (error: any) {
      console.log(
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const uploadImage = async () => {
    if (!image) {
      return alert(
        "Please select image"
      );
    }

    const formData = new FormData();

    formData.append(
      "image",
      image
    );

    try {
      setUploading(true);

      await axios.put(
        "http://localhost:5000/api/v1/auth/profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Profile image updated"
      );

      fetchProfile();
    } catch (error: any) {
      console.log(
        error.response?.data
      );

      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="
          animate-spin
          w-12
          h-12
          border-4
          border-blue-500
          border-t-transparent
          rounded-full
        "
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className="
        text-center
        mt-10
        text-red-500
        text-xl
      "
      >
        User not found
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-blue-50
      to-purple-50
      p-4
      sm:p-6
      lg:p-8
    "
    >
      <div
        className="
        max-w-3xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-xl
        overflow-hidden
      "
      >
        <div
          className="
          h-28
          sm:h-36
          bg-gradient-to-r
          from-blue-500
          to-purple-600
        "
        />

        <div
          className="
          px-4
          sm:px-8
          pb-8
          text-center
        "
        >
          <div
            className="
            -mt-14
            sm:-mt-16
            flex
            justify-center
          "
          >
            <img
              src={
                user.profileImage ||
                "https://i.pravatar.cc/150"
              }
              alt="profile"
              className="
              w-28
              h-28
              sm:w-32
              sm:h-32
              rounded-full
              border-4
              border-white
              shadow-lg
              object-cover
            "
            />
          </div>

          <div
            className="
            mt-4
            flex
            flex-col
            sm:flex-row
            justify-center
            items-center
            gap-3
          "
          >
            <label
              className="
              cursor-pointer
              flex
              items-center
              gap-2
              px-4
              py-2
              bg-gray-100
              rounded-xl
              hover:bg-gray-200
            "
            >
              <Camera size={18} />

              Change Photo

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  setImage(
                    e.target.files?.[0] ||
                      null
                  )
                }
              />
            </label>

            {image && (
              <button
                onClick={uploadImage}
                className="
                px-4
                py-2
                bg-blue-600
                text-white
                rounded-xl
                w-full
                sm:w-auto
              "
              >
                {uploading
                  ? "Uploading..."
                  : "Save"}
              </button>
            )}
          </div>

          <h1
            className="
            text-2xl
            sm:text-3xl
            font-bold
            mt-5
            break-words
          "
          >
            {user.name}
          </h1>

          <span
            className="
            inline-block
            mt-3
            px-4
            py-1
            bg-blue-100
            text-blue-600
            rounded-full
            text-sm
          "
          >
            {user.roles.join(", ")}
          </span>

          <div
            className="
            mt-8
            space-y-4
          "
          >
            <div
              className="
              flex
              items-center
              gap-4
              p-4
              bg-gray-50
              rounded-xl
              text-left
            "
            >
              <Mail className="text-blue-500 shrink-0" />

              <div className="min-w-0">
                <p className="text-sm text-gray-400">
                  Email
                </p>

                <p className="font-semibold break-all">
                  {user.email}
                </p>
              </div>
            </div>

            <div
              className="
              flex
              items-center
              gap-4
              p-4
              bg-gray-50
              rounded-xl
              text-left
            "
            >
              <Calendar className="text-purple-500 shrink-0" />

              <div>
                <p className="text-sm text-gray-400">
                  Joined Date
                </p>

                <p className="font-semibold">
                  {new Date(
                    user.createdAt
                  ).toDateString()}
                </p>
              </div>
            </div>

            <div
              className="
              flex
              items-center
              gap-4
              p-4
              bg-gray-50
              rounded-xl
              text-left
            "
            >
              <Shield className="text-green-500 shrink-0" />

              <div>
                <p className="text-sm text-gray-400">
                  Account Status
                </p>

                <p className="font-semibold text-green-600">
                  Active
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