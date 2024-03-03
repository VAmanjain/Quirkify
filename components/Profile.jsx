import ThoughtCard from "./Card";

const Profile = ({ names, data, desc, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient ">{names} Profile</span>
      </h1>
      <p className="desc text-left">
        {desc}
      </p>
      <div className="mt-16 prompt_layout ">
      {data.map((post) => (
        <ThoughtCard
          key={post._id}
          post={post}
          handleDelete={()=>handleDelete &&handleDelete(post)}
          handleEdit={()=>handleEdit && handleEdit(post)}
        />

      ))}
    </div>
    </section>
  );
};

export default Profile;
