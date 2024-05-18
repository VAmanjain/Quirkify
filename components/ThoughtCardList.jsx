
import ThoughtCard from "./Card";

const ThoughtCardList = ({ data , fetchQuery, setSearchText}) => {
    console.log(data);
    return (
      <div className="mt-16 feed_layout">
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