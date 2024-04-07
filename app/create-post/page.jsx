'use client'
import {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import From from "@components/Form"
const CreatePost = () => {
    const router = useRouter();
    const {data: session}= useSession()

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        thought:"",
        tag:"",
    })

    const createPost = async(e)=>{
        e.preventDefault();
        setSubmitting(true);
        
        try {
            const response = await fetch ('api/thought/new', {
                method:"POST", body:JSON.stringify({
                    thought:post.thought,
                    userId: session?.user.id,
                    tag:post.tag,
                })
            })

            if(response.ok){
                router.push('/explore');
            }
        } catch (error) {
            console.log(error);
        }
        finally{
            setSubmitting(false);
        }
    }

  return (
    <From
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handlesubmit={createPost}
    />
  )
}

export default CreatePost