"use client";

import Link from "next/link";
import ThoughtCard from "./Card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { EditProfile } from "./EditProfile";
import ShareUrl from "./share";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

const Profile = ({ userProfile, data, desc, handleDelete }) => {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const spanRef = useRef(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const pathname = usePathname();
  console.log(pathname);

  const shareLink = () => {
    if (pathname !== "/profile") {
      setCurrentUrl(window.location.href);
    } else {
      const originUrl = window.location.href;
      const url = originUrl.concat(`/${userProfile?.creator?._id}`);
      setCurrentUrl(url);
    }
  };

  useEffect(() => {
    shareLink();
  }, [pathname, userProfile]);

  // console.log(originUrl);
  // var url= originUrl.concat(`/profile/${session?.}`)

  const handleCopy = () => {
    if (spanRef.current) {
      const text = spanRef.current.textContent;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };

  return (
    <section className="max-w-[768px] w-full mx-auto">
      <h1 className="w-full flex justify-center mb-3  ">
        {userProfile?
        <span className="text-3xl font-semibold  ">
          {userProfile?.quirkId}'s Profile
        </span>:
        <Skeleton className="text-3xl font-semibold h-10 w-[250px] "/>
        }
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
          />
        ) : (
          <Skeleton className="h-[10rem] w-[10rem] rounded-full" />
        )}
      </div>

      <div className="mt-5 text-[1.2rem] text-center   ">
        {userProfile?
        
        <p> {userProfile?.bio}</p>:
        <Skeleton className=" mt-5 text-[1.2rem] mx-auto text-center h-8 w-[350px]" />

      }
      </div>
      <div className="grid grid-flow-col mt-2 gap-4 p-2 ">
        {session?.user?.id &&
          session?.user?.id === userProfile?.creator?._id && <EditProfile />}
        <ShareUrl link={currentUrl} />
      </div>
      <Separator className="my-4" />
      <div className="mt-16 feed_layout">
        {data.map((post) => (
          <ThoughtCard
            key={post._id}
            post={post}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
