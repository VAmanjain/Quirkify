import Link from "next/link";
import ThoughtCard from "./Card";

const Profile = ({ userProfile, data, desc, handleDelete }) => {
  return (
    <section className="max-w-[768px]">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{userProfile?.quirkId}'s Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-5">
        <p>Bio: {userProfile?.bio}</p>
        <img
          src={userProfile?.image}
          alt="User Profile"
          className="rounded-full w-[8rem] "
        />
        <Link href="/update-profile" className="black_btn">
          Edit
        </Link>
      </div>

      <div className="mt-16 prompt_layout ">
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
