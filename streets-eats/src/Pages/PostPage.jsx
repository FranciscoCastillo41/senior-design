import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../src/Services/firebase";
import { doc, getDoc } from "firebase/firestore";
import BlogPosts from "../Components/PreviewBlog";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", postId));
        if (postDoc.exists()) {
          setPost(postDoc.data());
        } else {
          console.log("No such post!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto">
        {post.title}
      </h1>
      <img
        src={post.image}
        className="mt-10 p-3 mx-h-[600px] w-full object-cover"
      ></img>
      <div
        className="p-3 max-w-2xl mx-auto w-full"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <BlogPosts />

      
    </main>
  );
};

export default PostPage;
