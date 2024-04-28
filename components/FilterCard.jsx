import Image from "next/image";

const FilterCard = ({ userProfile }) => {
  const { quirkId, creator, thoughts } = userProfile;
  
  return (
    <div className="card">
      <div className="card-body">
        <ul>
          {thoughts.map((thought, index) => (
            <li key={index}>
              <div className="card-header">
                {creator.image &&
                      <Image
                      src={`/${creator.image}`}
                      alt="user_image"
                      width={40}
                      height={40}
                      className="rounded-full object-contain"
                    />
                }
        
                <h2>{quirkId}</h2>
              </div>
              <p>{thought.thought}</p>
              <p> {thought.tag}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterCard;
2