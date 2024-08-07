'use client'

import ViewCard from "@components/ViewCard";
import { useEffect, useState } from "react";

const viewThought = ({ params }) => {
    const [thought, setThought] = useState(null);
    const id = params.id;

    const fetchThought = async () => {
        try {
            const response = await fetch(`/api/thought/${id}`);
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
    }, [id]);

    useEffect(() => {
        
    }, [thought]);

  

    return (
        <>
            {thought && <ViewCard thought={thought} fetchThought={fetchThought} />}
        </>
    );
};

export default viewThought;