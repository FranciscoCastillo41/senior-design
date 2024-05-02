import React, { useState, useEffect } from "react";
import { db, auth } from "../Services/firebase";
import { collection, addDoc, doc, getDocs, getDoc, query, where } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [authors, setAuthors] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [profileImages, setProfileImages] = useState({});
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (!user) return;
        const q = query(collection(db, "posts"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        setUserPosts(posts);
        
        // Fetch display names and profile images for each post's author
        const authorsMap = {};
        const profileImagesMap = {};
        posts.forEach((post) => {
          const userId = post.userId;
          const storedProfileImage = localStorage.getItem(`profileImage_${userId}`);
          if (storedProfileImage) {
            profileImagesMap[userId] = storedProfileImage;
            setProfileImages(profileImagesMap);
          } else {
            fetchAuthorData(userId).then(({ displayName, profileImageUrl }) => {
              authorsMap[userId] = displayName;
              profileImagesMap[userId] = profileImageUrl;
              setAuthors(authorsMap);
              setProfileImages(profileImagesMap);
            });
          }
        });
      } catch (error) {
        console.error("Error fetching user posts: ", error);
      }
    };
    fetchUserPosts();
  }, [user]);
  

  const fetchAuthorData = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return { displayName: userData.displayName || "Unknown", profileImageUrl: userData.profileImageUrl || "" };
      }
      return { displayName: "Unknown", profileImageUrl: "" };
    } catch (error) {
      console.error("Error fetching author data: ", error);
      return { displayName: "Unknown", profileImageUrl: "" };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        console.error("User is not authenticated.");
        return;
      }

      const strippedContent = content.replace(/<[^>]+>/g, "");

      const postRef = await addDoc(collection(db, "posts"), {
        title,
        tag,
        image: imageUrl, // Use imageUrl directly
        category,
        content: strippedContent,
        userId: user.uid,
        createdAt: new Date(),
      });
      console.log("Post added with ID: ", postRef.id);
      setTitle("");
      setTag("");
      setContent("");
      setImageUrl(""); // Reset imageUrl after submission
      setCategory("");
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  return (
    <div className="p-10">
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="space-y-12 container mx-auto">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-base font-semibold leading-8 text-gray-900">
              Create a post
            </h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Share valuable information about the food trucking industry!
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tags
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    autoComplete="tags"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image URL
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Food</option>
                    <option>Locations</option>
                    <option>Advice</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <ReactQuill
                theme="snow"
                placeholder="Write something..."
                value={content}
                onChange={(content) => setContent(content)}
                className="h-72 mb-12"
              />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-5">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            View your posts
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {userPosts.map((post) => (
            <Link to={`/posts/${post.id}`}>
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
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
                  <img
                    src={profileImages[post.userId] || ""}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;


