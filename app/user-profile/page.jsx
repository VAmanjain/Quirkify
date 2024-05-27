"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import AvatarPicker from "@./components/AvatarPicker";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirectToPage } from "@utils/pageProtect";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";
import { IoReload } from "react-icons/io5";

const UserProfile = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 300000);
  }, []);

  useEffect(() => {
    redirectToPage(status, session, router)
    const fetchData = async () => {
      setLoading(false);
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
console.log(profile, session?.user?.id);
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <form onSubmit={createPost} className="max-w-[500px] mx-auto h-auto">
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-white">
              Create Your Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
         Your Profile show yourself.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Your Avatar
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {selectedAvatar ? (
                    <div>
                      <div></div>
                      <div>
                        <img
                          src={selectedAvatar}
                          alt="Selected Avatar"
                          className="avatar rounded-full outline-2 "
                        />
                      </div>
                    </div>
                  ) : (
                    <UserCircleIcon className="avatar rounded-full " aria-hidden="true" />
                  )}
                  <AvatarPicker onSelect={handleSelect} className="avatar" />
                </div>
              </div>
              <div className="sm:col-span-10">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">QuirkId</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    placeholder="Quirkester"
                    onChange={(e) =>
                      setProfile({ ...profile, quirkId: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="col-span-full">
<div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Bio</Label>
      <Textarea placeholder="Type your message here." id="message-2"
       onChange={(e) =>
        setProfile({ ...profile, bio: e.target.value })
      }
      />
      <p className="text-sm text-muted-foreground">
        Write what you want to tell.
      </p>
    </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
       
            {submitting ? <Button disabled className="rounded-full ">
      <IoReload  className="mr-2 h-4 w-4 animate-spin " />
      Continue...
    </Button>
              :  <Button variant="outline" type="submit" className="rounded-full ">
              Continue
            </Button>}
          
        </div>
      </form>
    </>
  );
};

export default UserProfile;
