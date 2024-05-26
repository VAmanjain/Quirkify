"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import AvatarPicker from "@./components/AvatarPicker";
import { useEffect, useState } from "react";
import { redirectToPage } from "@utils/pageProtect";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";
import { IoReload } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DialogClose } from "@radix-ui/react-dialog";

export function EditProfile() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
}

function ProfileForm({ className }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState({
    quirkId: "",
    bio: "",
    image: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    } else if (status === "authenticated" && session?.user) {
      fetchUser(session.user.id);
    }
  }, [status, session, router]);

  const fetchUser = async (sessionId) => {
    try {
      const response = await fetch(`/api/user-profile/${sessionId}/user`);
      const { UserProfiles } = await response.json();

      if (Array.isArray(UserProfiles) && UserProfiles.length > 0) {
        const userProfile = UserProfiles[0];
        setUserId(userProfile._id);
        setUserProfile({
          quirkId: userProfile.quirkId,
          bio: userProfile.bio,
          image: userProfile.image,
        });
        console.log(userProfile);
      } else {
        console.error("No user profile data found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!userId) {
      alert("Missing userId!");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/user-profile/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      });

      if (response.ok) {
        router.push("/profile");
      } else {
        console.error("Error updating profile:", await response.json());
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setUserProfile((prevProfile) => ({ ...prevProfile, image: avatar }));
  };
  return (
    <form onSubmit={updateProfile} className=" w-full mx-auto h-auto">
      <div className=" ">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-white"
              >
                Your Avatar
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {userProfile?.image ? (
                  <div>
                    <img
                      src={selectedAvatar || userProfile?.image}
                      alt="Selected Avatar"
                      className="avatar "
                    />
                  </div>
                ) : (
                  <UserCircleIcon
                    className="avatar rounded-full "
                    aria-hidden="true"
                  />
                )}
                <AvatarPicker onSelect={handleSelect} className="avatar" />
              </div>
            </div>
            <div className="sm:col-span-full">
              <div className="grid w-full items-center col-span-full gap-1.5">
                <Label htmlFor="text">QuirkId</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  placeholder={userProfile?.quirkId || " Quirkister"}
                  onChange={(e) =>
                    setUserProfile((prevProfile) => ({
                      ...prevProfile,
                      quirkId: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="col-span-full">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">Your Bio</Label>
                <Textarea
                  placeholder={userProfile?.bio || "Type your message here"}
                  id="message-2"
                  onChange={(e) =>
                    setUserProfile((prevProfile) => ({
                      ...prevProfile,
                      bio: e.target.value,
                    }))
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
      <DialogClose asChild>
            <Button type="button" variant="destructive" className="rounded-full">
              Close
            </Button>
          </DialogClose>
        {submitting ? (
          <Button disabled className="rounded-full ">
            <IoReload className="mr-2 h-4 w-4 animate-spin " />
            Saving...
          </Button>
        ) : (
          <Button variant="outline" type="submit" className="rounded-full ">
            Save
          </Button>
        )}

      </div>
    </form>
  );
}
