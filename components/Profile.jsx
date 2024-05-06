// import Link from "next/link";
// import ThoughtCard from "./Card";

// const Profile = ({ userProfile, data, desc, handleDelete }) => {
//   return (
//     <section className="max-w-[768px]">
//       <h1 className="head_text text-left">
//         <span className="blue_gradient">{userProfile?.quirkId}'s Profile</span>
//       </h1>
//       <p className="desc text-left">{desc}</p>

//       <div className="mt-5">
//         <p>Bio: {userProfile?.bio}</p>
//         <img
//           src={userProfile?.image}
//           alt="User Profile"
//           className="rounded-full w-[8rem] "
//         />
//         <Link href="/update-profile" className="black_btn">
//           Edit
//         </Link>
//       </div>

//       <div className="mt-16 prompt_layout ">
//         {data.map((post) => (
//           <ThoughtCard
//             key={post._id}
//             post={post}
//             handleDelete={() => handleDelete && handleDelete(post)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Profile;



import Link from "next/link";
import ThoughtCard from "./Card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { WhatsappIcon, WhatsappShareButton } from "next-share";

const Profile = ({ userProfile, data, desc, handleDelete }) => {
  const { data: session } = useSession();

  console.log(userProfile?.UserProfiles?.image);
  return (
    <section className="max-w-[768px]">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{userProfile?.quirkId}'s Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-5">
        <p>Bio: {userProfile?.bio}</p>
        {/* {userProfile?.image && (
          <img
            src={userProfile.image}
            alt="User Profile"
            className="rounded-full w-[8rem]"
          />
        )} */}
   
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

        {
          session?.user?.id && session?.user?.id === userProfile?.creator?._id ?
          <Link href="/update-profile" className="black_btn">
          Edit
        </Link>
          :""
        }
       

 
       <WhatsappShareButton
  url={`http://localhost/profile/${userProfile?.creator?._id}`}
  // title={'next-share is a social share buttons for your next React apps.'}
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