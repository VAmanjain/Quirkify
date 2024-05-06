"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import Link from "next/link";

const Card = ({ post, handleTagClick, handleDelete }) => {
  const [userProfile, setUserProfile] = useState(null);
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const AddStar = async (id) => {
    await fetch(`api/star-thought/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        thoughtId: post._id,
      }),
    });
  };

  const RemoveStar = async (id) => {
    await fetch(`api/unstar-thought/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        thoughtId: post._id,
      }),
    },
   {cache:"no-store"});
  };

  const handleCopy = () => {
    setCopied(post.thought);
    navigator.clipboard.writeText(post.thought);
    setTimeout(() => setCopied(false), 3000);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `/api/user-profile/${post.creator?._id}/user`
      );
      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {

    fetchUser();
  },3000, [post.creator?._id]);

  return (
    <div className="feed_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={
              userProfile?.UserProfiles?.length > 0 &&
              userProfile.UserProfiles[0].image.startsWith("/")
                ? userProfile.UserProfiles[0].image
                : userProfile?.UserProfiles?.length > 0
                ? `/${userProfile.UserProfiles[0].image}`
                : ""
            }
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900"></h3>
            <Link href={`/profile/${post.creator._id}`} className="font-inter text-sm text-gray-500">
  {userProfile?.UserProfiles?.length > 0
    ? userProfile.UserProfiles[0].quirkId
    : "Unknown User"}
</Link>
          </div>
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === post?.thought
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt={copied === post?.thought ? "tick_icon" : "copy_icon"}
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.thought}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      
      {post?.star.some(starId => starId === session?.user?.id) ? (
  <FaStar onClick={() => RemoveStar(session?.user?.id)} className="cursor-pointer" />
) : (
  <CiStar onClick={() => AddStar(session?.user?.id)}  className="cursor-pointer" />
)}

      {session?.user.id === post.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
