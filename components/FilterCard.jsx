import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useSession } from "next-auth/react";

const FilterCard = ({
  userProfile,
  fetchQuery,
  setSearchText,
  handleTagClick,
}) => {
  const { creator, _id, thought, tag, star, createAt } = userProfile;
  const { data: session } = useSession();
  // Ensure tag is an array
  const tagsArray = Array.isArray(tag) ? tag : [tag];

  const addStar = async (id) => {
    try {
      await fetch(
        `api/star-thought/${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            thoughtId: _id,
          }),
        },
        { cache: "no-store" }
      );
      fetchQuery();
    } catch (error) {
      console.log(error);
    }
  };

  const removeStar = async (id) => {
    try {
      await fetch(
        `api/unstar-thought/${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            thoughtId: _id,
          }),
        },
        { cache: "no-store" }
      );
      fetchQuery();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h1>{creator?.profile?.quirkId}</h1>
        {creator.profile.image && (
          <Image
            src={`/${creator.profile.image}`}
            width={40}
            height={40}
            alt="userAvatar"
          />
        )}
        <p>
          <strong>Creator ID:</strong> {creator.profile._id}
        </p>
        <p>
          <strong>Thought ID:</strong> {_id}
        </p>
        <p>
          <strong>Thought:</strong> {thought}
        </p>
        <p>
          <strong>Tag:</strong>{" "}
          {tagsArray.length > 0 ? (
            <div>
              {tagsArray.map((t, index) => (
                <span key={index} onClick={()=>{setSearchText(`#${t}`)}} className="cursor-pointer" >{`#${t}`}</span>
              ))}
            </div>
          ) : (
            "No tags"
          )}
        </p>
        {/* <p><strong>Starred By:</strong> {star.length > 0 ? star.join(", ") : "None"}</p> */}
        {/* <p><strong>Created At:</strong> {new Date(createAt).toLocaleString()}</p> */}
        {star.some((starId) => starId === session?.user?.id) ? (
          <FaStar
            onClick={() => removeStar(session?.user?.id)}
            className="cursor-pointer"
          />
        ) : (
          <CiStar
            onClick={() => addStar(session?.user?.id)}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default FilterCard;
