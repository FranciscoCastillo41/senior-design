import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../src/Services/firebase";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-2">{post.tag}</p>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
