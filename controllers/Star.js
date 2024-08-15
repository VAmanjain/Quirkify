export const removeStar = async({id,thoughtId, fetchData})=>{
    console.log(id, thoughtId);
    
    await fetch(`api/unstar-thought/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          thoughtId: thoughtId,
        }),
      });
      fetchData();
}


export const addStar = async({id,thoughtId, fetchData})=>{
    
    console.log(id, thoughtId);
    

    await fetch(`api/star-thought/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          thoughtId: thoughtId,
        }),
      });
      fetchData();
}