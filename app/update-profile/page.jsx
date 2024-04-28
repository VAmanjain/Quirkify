"use client";
import { useEffect, useState } from "react";

import AvatarPicker from "@./components/AvatarPicker";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UpadateProfile = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const router = useRouter();
  const [userId, setUserId] = useState();
  const [userProfile, setUserProfile] = useState({
    quirkId: "",
    bio: "",
    image: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { data: session, status } = useSession();
  
  



  // ----Security---
  useEffect(() => {
      const redirectToPage = async () => {
        if (status === "authenticated" && session?.user) {
          try {
            const response = await fetch(`/api/user-profile/${session.user.id}/user`);
            const { UserProfiles } = await response.json();
            if (Array.isArray(UserProfiles) && UserProfiles.length === 0) {
              router.replace("/user-profile"); 
            } else {
              router.replace("/update-profile");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            router.replace("/profile"); 
            alert("Something wents wrong");
          }
        } else if (status === "unauthenticated") {
          router.replace("/"); 
        }
      };
      redirectToPage();
  }, [status, session, router]);

  const fetchUser = async (sessionId) => {
    try {

      const response = await fetch(`/api/user-profile/${sessionId}/user`);
      const data = await response.json();

      if (data.UserProfiles && data.UserProfiles.length > 0) {
        const userProfile = data.UserProfiles[0]; 
setUserId(userProfile._id)
        setUserProfile({
          quirkId: userProfile.quirkId,
          bio: userProfile.bio,
          image: userProfile.image,
        });
      } else {
        console.error("No user profile data found.");
      }

      console.log(profile);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Call fetchPosts when session ID changes
  useEffect(() => {
    if (session?.user?.id) {
      localStorage.setItem("sessionId", session.user.id); // Store session ID in localStorage
      fetchUser(session.user.id);
    }
  }, [session]);

  const updateProfile = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!userId) return alert("Missing userId!");

    try {
      const response = await fetch(`/api/user-profile/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          quirkId: userProfile.quirkId,
          bio: userProfile.bio,
          image: userProfile.image,
        }),
      });
      

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };


  const handleSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setUserProfile({ ...userProfile, image: avatar });
  };
  return (
    <>
      <form onSubmit={updateProfile}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {selectedAvatar ? (
                    selectedAvatar && (
                      <div>
                        <div>
                          <img
                            src={selectedAvatar}
                            alt="Selected Avatar"
                            className="avatar"
                            value={userProfile.image}
                          />
                        </div>
                      </div>
                    )
                  ) : (
                   
                    <img
                      src={userProfile.image}
                      alt="Selected Avatar"
                      className="avatar"
                    />
                  )}
                  <AvatarPicker onSelect={handleSelect} />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      @
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder={userProfile.quirkId}
                      defaultValue={userProfile.quirkId}
                      onChange={(e) =>
                        setUserProfile({ ...userProfile, quirkId: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Bio
                </label>
                <div className="mt-2">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={userProfile.bio}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, bio: e.target.value })
                    }
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/profile" className="black_btn">
          Cancel
        </Link>
          <button type="submit" className="black_btn">
            {submitting ? "Countinue..." : "Countinue"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UpadateProfile;
