import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import ShareUrl from "./share";
import { usePathname } from "next/navigation";
import SwiperImage from "./SwiperImage";
import { Skeleton } from "./ui/skeleton";
import { addStar, removeStar } from "@controllers/Star";

const FilterCard = ({
  userProfile,
  fetchQuery,
  setSearchText,
}) => {
  const { creator, _id, thought, tag, star, images } = userProfile;
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  const pathname = usePathname();

  // Ensure tag is an array
  const tagsArray = Array.isArray(tag) ? tag : [tag];

  const handleCopy = () => {
    setCopied(post.thought);
    navigator.clipboard.writeText(post.thought);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <div className="feed_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            {creator.profile ? (
              <Image
                src={`/${creator?.profile?.image}`}
                alt="user_image"
                width={40}
                height={40}
                className="rounded-full object-contain"
              />
            ) : (
              <Skeleton className="h-12 w-12 rounded-full" />
            )}
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900"></h3>
              <Link
                href={`/profile/${creator?.profile?._id}`}
                className="font-inter text-sm text-gray-100 hover:text-gray-300"
              >
                {creator?.profile ? creator?.profile?.quirkId : "Unknown User"}
              </Link>
            </div>
            {session?.user.id === creator.profile?._id &&
              pathname === "/profile" && (
                <Button
                  variant="ghost"
                  className=" p-3 rounded-full gap-4 justify-end "
                >
                  <p
                    className="font-inter text-sm orange_gradient cursor-pointer"
                    onClick={handleDelete}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </p>
                </Button>
              )}
          </div>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">{thought}</p>
        <div className="flex">
          {tagsArray.length > 0 ? (
            <div className="text-blue-500">
              {tagsArray.map((t, index) => (
                <span
                  key={index}
                  onClick={() => {
                    setSearchText(`#${t}`);
                  }}
                  className="cursor-pointer"
                >{`#${t}`}</span>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
<div className="flex gap-3 overflow-hidden justify-center  ">
       {
       images?.length > 0 && 
       <SwiperImage postImage={images} />}
      </div>

        <Separator className="my-4" />
        <div className="w-full my-2 flex h-5 items-center justify-evenly space-x-1  sm:space-x-4 text-sm text-[0.8rem]">
          {star.some((starId) => starId === session?.user?.id) ? (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                removeStar({ id: session?.user?.id, thoughtId: _id,fetchData: fetchQuery });
              }}
            >
              <FaStar className="cursor-pointer" />
              <p className="mx-1">{star.length}</p>
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                addStar({ id: session?.user?.id, thoughtId: _id,fetchData: fetchQuery });
              }}
            >
              <CiStar className="cursor-pointer" />
              <p className="mx-1">{star.length}</p>
            </Button>
          )}
          <Separator orientation="vertical" />
          <Button
            variant="ghost"
            onClick={handleCopy}
            className="w-full cursor-pointer flex text-sm text-[0.8rem] "
          >
            <Image
              src={
                copied === thought
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt={copied === thought ? "tick_icon" : "copy_icon"}
              width={12}
              height={12}
              className="mx-1 sm:mx-2"
            />
            Copy
          </Button>
          <Separator orientation="vertical" />
          <ShareUrl link={`${process.env.NEXT_PUBLIC_BASE_URI}/explore/${_id}`} />
        </div>
      </div>
    </>
  );
};

export default FilterCard;
