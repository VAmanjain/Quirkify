'use client'

import Card from "@components/Card";
import Loader from "@components/Loader";
import ViewCard from "@components/ViewCard";
import { useEffect, useState } from "react";

const viewThought = ({ params }) => {
    const [thought, setThought] = useState(null);
    
    const fetchThought = async () => {
        try {
            const response = await fetch(`/api/thought/${ params.id}`);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            setThought(data);
            
        } catch (error) {
            console.error(`Fetch problem: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchThought();
    }, [ params.id]);

    return (
        <>
            {thought ? <ViewCard thought={thought[0]} fetchThought={fetchThought} />:<Loader/> }
            
        </>
    );
};

export default viewThought;