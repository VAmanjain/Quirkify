// 'use client'
// import {useEffect, useState} from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import From from "@components/Form"
// const CreatePost = () => {
//     const router = useRouter();
//     const {data: session, status}= useSession();
//     const [submitting, setSubmitting] = useState(false);
//     const [post, setPost] = useState({
//         thought:"",
//         tag:"",
//     })

//     useEffect(() => {
//         if (status === "unauthenticated") {
//           router.replace("/");
//         }
//       }, [status, session, router]);


//     const createPost = async(e)=>{
//         e.preventDefault();
//         setSubmitting(true);
        
//         try {


//             // const tag = post.tag.startsWith('#') ? post.tag.slice(1) : post.tag;

//             const response = await fetch ('api/thought/new', {
//                 method:"POST", body:JSON.stringify({
//                     thought:post.thought,
//                     userId: session?.user.id,
//                     tag:post.tag,
//                 })
//             })

//             if(response.ok){
//                 router.push('/explore');
//             }
//         } catch (error) {
//             console.log(error);
//         }
//         finally{
//             setSubmitting(false);
//         }
//     }

//   return (
//     <>
//     <From
//     type="Create"
//     post={post}
//     setPost={setPost}
//     submitting={submitting}
//     handlesubmit={createPost}
//     />
//     </>
//   )
// }

// export default CreatePost


'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from "@components/Form"

const CreatePost = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    thought: "",
    tag: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/")
    }
  }, [status, session, router])

  const createPost = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const tag = post.tag.startsWith('#') ? post.tag.slice(1) : post.tag

      const response = await fetch('api/thought/new', {
        method: "POST",
        body: JSON.stringify({
          thought: post.thought,
          userId: session?.user.id,
          tag: tag,
        }),
      })

      if (response.ok) {
        router.push('/explore')
      }
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPost}
      
      />
    </>
  )
}

export default CreatePost