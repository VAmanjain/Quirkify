'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirectToPage } from "@utils/pageProtect";

const UserProfile = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 300000);
  }, []);
  
  useEffect(() => {
    redirectToPage(status, session, router);
    const fetchData = async () => {
      setLoading(false); // Set loading to false after data is fetched
    };
    fetchData();
  }, [status, session, router]);

  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState({
    quirkId: "",
    bio: "",
    image: "",
  });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("api/user-profile", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          quirkId: profile.quirkId,
          image: profile.image,
          bio: profile.bio,
        }),
      });

      if (response.ok) {
        router.push("/create-post");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setProfile({ ...profile, image: avatar });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <>
      <form onSubmit={createPost}>
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
                        <div></div>
                        <div>
                          <img
                            src={selectedAvatar}
                            alt="Selected Avatar"
                            className="avatar"
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    // <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" alt="Selected Avatar" className='avatar' />
                    <UserCircleIcon className="avatar " aria-hidden="true" />
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
                      placeholder="Quirkester"
                      onChange={(e) =>
                        setProfile({ ...profile, quirkId: e.target.value })
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
                    defaultValue={""}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
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
          <button type="submit" className="black_btn">
            {submitting ? "Countinue..." : "Countinue"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UserProfile;