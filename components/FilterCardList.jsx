import FilterCard from "./FilterCard";

const FilterCardList = ({ userProfiles, fetchQuery, setSearchText }) => {
    return (
      <div className="mt-16 feed_layout">
        {userProfiles.map((userProfile, index) => (
          <FilterCard key={index} userProfile={userProfile} fetchQuery={fetchQuery} setSearchText={setSearchText} />
        ))}
      </div>
    );
  };

  export default FilterCardList