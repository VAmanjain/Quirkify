
import ThoughtCard from "./Card";

const ThoughtCardList = ({ data , fetchQuery, setSearchText}) => {
    
    return (
      <div className="mt-16 w-full flex flex-col gap-2 justify-start items-center ">
        {data.map((post) => (
          <ThoughtCard
            key={post._id}
            post={post}
            fetchQuery={fetchQuery}
            setSearchText={setSearchText}
          />
        ))}
      </div>
    );
  };

  export default ThoughtCardList;