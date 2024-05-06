"use client"

import Link from "next/link";
import ThoughtCard from "./Card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { WhatsappIcon, WhatsappShareButton } from "next-share";
import { useState, useRef } from "react";

const Profile = ({ userProfile, data, desc, handleDelete }) => {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const spanRef = useRef(null);

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
    <section className="max-w-[768px]">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{userProfile?.quirkId}'s Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-5">
        <p>Bio: {userProfile?.bio}</p>
        <Image
          src={
            userProfile?.UserProfiles?.length > 0 &&
            userProfile.UserProfiles[0].image
              ? userProfile.UserProfiles[0].image.startsWith("/")
                ? userProfile.UserProfiles[0].image
                : `/${userProfile.UserProfiles[0].image}`
              : ""
          }
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />
        {session?.user?.id && session?.user?.id === userProfile?.creator?._id && (
          <Link href="/update-profile" className="black_btn">
            Edit
          </Link>
        )}

        <div className="copy_btn" onClick={handleCopy}>
          <span ref={spanRef}>{`https://main--quirkify-1.netlify.app/profile/${userProfile?.creator?._id}`}</span>
          <Image
            src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt={copied ? "Copied" : "Copy"}
            width={12}
            height={12}
          />
        </div>

        <WhatsappShareButton
          url={`https://main--quirkify-1.netlify.app/profile/${userProfile?.creator?._id}`}
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <div className="mt-16 prompt_layout">
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