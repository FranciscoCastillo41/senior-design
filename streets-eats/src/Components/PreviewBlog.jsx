import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../src/Services/firebase";
import { Link } from "react-router-dom";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState({});
  const [profileImages, setProfileImages] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);

        // Fetch authors' names and profile images
        const authorsMap = {};
        const profileImagesMap = {};
        const promises = fetchedPosts.map((post) => {
          return fetchAuthorData(post.userId).then(({ displayName, profileImageUrl }) => {
            authorsMap[post.userId] = displayName || "Unknown";
            profileImagesMap[post.userId] = profileImageUrl || "";
          });
        });
        await Promise.all(promises);
        setAuthors(authorsMap);
        setProfileImages(profileImagesMap);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const fetchAuthorData = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return { displayName: userData.displayName, profileImageUrl: userData.profileImageUrl };
      }
      return { displayName: null, profileImageUrl: null };
    } catch (error) {
      console.error("Error fetching author data: ", error);
      return { displayName: null, profileImageUrl: null };
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {loading ? (
            <p>Loading...</p>
          ) : (
            posts.map((post) => (
              <Link to={`/posts/${post.id}`} key={post.id}>
                <article className="flex max-w-xl flex-col items-start justify-between">
                  <div className="flex items-center gap-x-4 text-xs">
                    <a
                      href={post.category}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category}
                    </a>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.content}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    {profileImages[post.userId] && ( // Conditionally render the image if available
                      <img
                        src={profileImages[post.userId]}
                        alt=""
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                    )}
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a>
                          <span className="absolute inset-0" />
                          {authors[post.userId] || "Unknown"}
                        </a>
                      </p>
                      <p className="text-gray-600">Author</p>
                    </div>
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;




