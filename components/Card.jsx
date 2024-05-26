"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import ShareUrl from "./share";
import { Skeleton } from "./ui/skeleton";

// const Card = ({ post, handleDelete, fetchQuery, setSearchText }) => {
//   const [userProfile, setUserProfile] = useState(null);
//   const { data: session } = useSession();
//   const pathName = usePathname();
//   const router = useRouter();
//   const [copied, setCopied] = useState("");

//   const starLength = post?.star.length;

//   const addStar = async (id) => {
//     await fetch(`api/star-thought/${id}`, {
//       method: "PATCH",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         thoughtId: post._id,
//       }),
//     });
//     fetchQuery();
//   };

//   const removeStar = async (id) => {
//     await fetch(
//       `api/unstar-thought/${id}`,
//       {
//         method: "PATCH",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({
//           thoughtId: post._id,
//         }),
//       },
//       { cache: "no-store" }
//     );
//     fetchQuery();
//   };

//   const handleCopy = () => {
//     setCopied(post.thought);
//     navigator.clipboard.writeText(post.thought);
//     setTimeout(() => setCopied(false), 3000);
//   };

//   const fetchUser = async () => {
//     try {
//       const response = await fetch(
//         `/api/user-profile/${post.creator?._id}/user`
//       );
//       const data = await response.json();
//       setUserProfile(data);
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     }
//   };

//   useEffect(
//     () => {
//       fetchUser();
//     },
//     1000,
//     [post.creator?._id]
//   );

//   return (
//     <div className="feed_card">
//       <div className="flex justify-between items-start gap-5">
//         <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
//           {userProfile?.UserProfiles?          <Image
//             src={
//               userProfile?.UserProfiles?.length > 0 &&
//               userProfile.UserProfiles[0].image.startsWith("/")
//                 ? userProfile.UserProfiles[0].image
//                 : userProfile?.UserProfiles?.length > 0
//                 ? `/${userProfile.UserProfiles[0].image}`
//                 : ""
//             }
//             alt="user_image"
//             width={40}
//             height={40}
//             className="rounded-full object-contain"
//           />:
//           <Skeleton/>
//           }
//           {/* // <Image */}
//           //   src={
//           //     userProfile?.UserProfiles?.length > 0 &&
//           //     userProfile.UserProfiles[0].image.startsWith("/")
//           //       ? userProfile.UserProfiles[0].image
//           //       : userProfile?.UserProfiles?.length > 0
//           //       ? `/${userProfile.UserProfiles[0].image}`
//           //       : ""
//           //   }
//           //   alt="user_image"
//           //   width={40}
//           //   height={40}
//           //   className="rounded-full object-contain"
//           // />

//           <div className="flex flex-col">
//             <h3 className="font-satoshi font-semibold text-gray-900"></h3>
//             <Link
//               href={`/profile/${post.creator?._id}`}
//               className="font-inter text-sm text-gray-500"
//             >
//               {userProfile?.UserProfiles?.length > 0
//                 ? userProfile.UserProfiles[0].quirkId
//                 : "Unknown User"}
//             </Link>
//           </div>
//           {session?.user.id === post.creator?._id &&
//             pathName === "/profile" && (
//               <Button
//                 variant="ghost"
//                 className=" p-3 rounded-full gap-4 justify-end "
//               >
//                 <p
//                   className="font-inter text-sm orange_gradient cursor-pointer"
//                   onClick={handleDelete}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-4"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                     />
//                   </svg>
//                 </p>
//               </Button>
//             )}
//         </div>
//       </div>
//       <p className="my-4 font-satoshi text-sm text-gray-700">{post.thought}</p>
//       <div className="flex">
//         {post.tag.map((tag, index) => (
//           <p
//             className="font-inter mx-1 text-blue-500  text-sm blue_gradient cursor-pointer"
//             onClick={() => setSearchText(`#${tag}`)}
//             key={index}
//           >
//             {`#${tag}`}
//           </p>
//         ))}
//       </div>

//       <Separator className="my-4" />
//       <div className=" w-full my-2 flex h-5 items-center justify-evenly space-x-4 text-sm">
//         {post?.star.some((starId) => starId === session?.user?.id) ? (
//           <Button
//             variant="ghost"
//             className="w-full"
//             onClick={() => removeStar(session?.user?.id)}
//           >
//             <FaStar className="cursor-pointer" />
//             <p className="mx-1">{starLength}</p>
//           </Button>
//         ) : (
//           <Button
//             variant="ghost"
//             className="w-full"
//             onClick={() => addStar(session?.user?.id)}
//           >
//             <CiStar className="cursor-pointer" />
//             <p className="mx-1">{starLength}</p>
//           </Button>
//         )}

//         <Separator orientation="vertical" />
//         <Button
//           variant="ghost"
//           onClick={handleCopy}
//           className=" w-full cursor-pointer flex "
//         >
//           <Image
//             src={
//               copied === post?.thought
//                 ? "/assets/icons/tick.svg"
//                 : "/assets/icons/copy.svg"
//             }
//             alt={copied === post?.thought ? "tick_icon" : "copy_icon"}
//             width={12}
//             height={12}
//             className="mx-2"
//           />
//           Copy
//         </Button>
//         <Separator orientation="vertical" />

//         <ShareUrl link="hey" />
//       </div>
//     </div>
//   );
// };

const Card = ({ post, handleDelete, fetchQuery, setSearchText }) => {
  const [userProfile, setUserProfile] = useState(null);
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const starLength = post?.star.length;

  const addStar = async (id) => {
    await fetch(`api/star-thought/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        thoughtId: post._id,
      }),
    });
    fetchQuery();
  };

  const removeStar = async (id) => {
    await fetch(`api/unstar-thought/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        thoughtId: post._id,
      }),
    });
    fetchQuery();
  };

  const handleCopy = () => {
    setCopied(post.thought);
    navigator.clipboard.writeText(post.thought);
    setTimeout(() => setCopied(false), 3000);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/user-profile/${post.creator?._id}/user`);
      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [post.creator?._id]);

  return (
    <div className="feed_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {userProfile?.UserProfiles ? (
            <Image
              src={
                userProfile.UserProfiles[0]?.image?.startsWith("/")
                  ? userProfile.UserProfiles[0].image
                  : `/${userProfile.UserProfiles[0].image}`
              }
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          ) : (
            <Skeleton className="h-12 w-12 rounded-full" />
          )}
          <div className="flex flex-col">
          {userProfile?.UserProfiles ? 
            <h3 className="font-satoshi font-medium">

            <Link href={`/profile/${post.creator?._id}`} className="font-inter text-sm text-gray-100 hover:text-gray-300 ">
              {userProfile?.UserProfiles?.length > 0 ? userProfile.UserProfiles[0].quirkId : "Unknown User"}
            </Link>
            </h3>:
            <Skeleton className="h-6 w-[150px]" />
            
            }
          </div>
          {session?.user.id === post.creator?._id && pathName === "/profile" && (
            <Button variant="ghost" className="p-3 rounded-full gap-4 justify-end">
              <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </p>
            </Button>
          )}
        </div>
      </div>
      {post ?
      <p className="my-4 font-satoshi text-sm text-gray-300">{post.thought}</p>
      :
    <Skeleton className="h-6 w-[250px]" />

    }
      <div className="flex">
  {post ? (
    post.tag.map((tag, index) => (
      <p className="font-inter mx-1 text-blue-500 text-sm blue_gradient cursor-pointer" onClick={() => setSearchText(`#${tag}`)} key={index}>
        {`#${tag}`}
      </p>
    ))
  ) : (
    <Skeleton className="h-6 w-[250px]" />
  )}
</div>

      <Separator className="my-4" />
      <div className="w-full my-2 flex h-5 items-center justify-evenly space-x-4 text-sm">
        {post?.star.some((starId) => starId === session?.user?.id) ? (
          <Button variant="ghost" className="w-full" onClick={() => removeStar(session?.user?.id)}>
            <FaStar className="cursor-pointer" />
            <p className="mx-1">{starLength}</p>
          </Button>
        ) : (
          <Button variant="ghost" className="w-full" onClick={() => addStar(session?.user?.id)}>
            <CiStar className="cursor-pointer" />
            <p className="mx-1">{starLength}</p>
          </Button>
        )}
        <Separator orientation="vertical" />
        <Button variant="ghost" onClick={handleCopy} className="w-full cursor-pointer flex">
          <Image
            src={copied === post?.thought ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt={copied === post?.thought ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
            className="mx-2"
          />
          Copy
        </Button>
        <Separator orientation="vertical" />
        <ShareUrl link="Not done yet" />

      </div>
    </div>
  );
};


export default Card;
