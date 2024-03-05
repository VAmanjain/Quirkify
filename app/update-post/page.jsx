"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const thoughtId = searchParams.get("id");
  
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
      thought: "",
      tag: "",
    });
    
    useEffect(() => {
        const getThoughtDetails = async () => {
            const response = await fetch(`api/thought/${thoughtId}`);
            const data = await response.json();
            setPost({
                thought: data.thought,
                tag: data.tag,
            });
        };
        if (thoughtId) {
            getThoughtDetails();
        }
    }, [thoughtId]);
    console.log(thoughtId);
    
  const UpdatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!thoughtId) return alert("Post ID not found");

    try {
      const response = await fetch(`api/thought/${thoughtId}`, {
        method: "PATCH",
        body: JSON.stringify({
          thought: post.thought,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handlesubmit={UpdatePost}
    />
  );
};

export default EditPost;
