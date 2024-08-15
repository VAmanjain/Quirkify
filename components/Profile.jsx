"use client";

import ThoughtCard from "./Card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { EditProfile } from "./EditProfile";
import ShareUrl from "./share";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

const Profile = ({ userProfile, data, handleDelete, fetchPosts }) => {
  const { data: session } = useSession();

  return (
    <section className="max-w-[768px] w-full mx-auto">
      <h1 className="w-full flex justify-center mb-3  ">
        {userProfile ? (
          <span className="text-3xl font-semibold  ">
            {userProfile?.quirkId}'s Profile
          </span>
        ) : (
          <Skeleton className="text-3xl font-semibold h-8 w-[200px] sm:w-[250px] " />
        )}
      </h1>
      <div className=" w-full flex justify-center my-2 ">
        {userProfile ? (
          <Image
            src={
              userProfile?.image
                ? userProfile?.image.startsWith("/")
                  ? userProfile?.image
                  : `/${userProfile?.image}`
                : ""
            }
            alt="user_image"
            width={100}
            height={100}
            className="rounded-full object-contain w-[10rem] "
            priority={true}
          />
        ) : (
          <Skeleton className="h-[10rem] w-[10rem] rounded-full" />
        )}
      </div>

      <div className="mt-5 text-[1.2rem] text-center   ">
        {userProfile ? (
          <p> {userProfile?.bio}</p>
        ) : (
          <Skeleton className=" mt-5 text-[1.2rem] mx-auto text-center h-7 w-[250px] sm:w-[350px]" />
        )}
      </div>
      <div className="grid grid-flow-col mt-2 gap-4 p-2 ">
        {session?.user?.id &&
          session?.user?.id === userProfile?.creator?._id && <EditProfile />}
        <ShareUrl link={`${process.env.NEXT_PUBLIC_BASE_URI}/profile/${userProfile?.creator?._id}`} />
      </div>
      <Separator className="my-4" />
      <div className="mt-16 feed_layout">
        
        {data.map((post) => (
          <ThoughtCard
            key={post._id}
            post={post}
            handleDelete={() => handleDelete && handleDelete(post)}
            fetchPosts={fetchPosts}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
