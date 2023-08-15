import React, { useState, useEffect } from "react";
import { useAuth } from "../jotai/useAuth";
import DisplayPost from "../components/posts/DisplayPost";
import CreatePost from "../components/posts/CreatePost";

function Home() {
  const { auth } = useAuth();
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   // Fetch posts and set the state
  //   fetch("http://localhost:1337/api/posts")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPosts(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching posts:", error);
  //     });
  // }, []);

  const handlePostCreated = (newPost) => {
    // Add the new post to the state
    setPosts([newPost, ...posts]);
  };

  return (
    <div>
      {auth.isAuthenticated && (
        <div>
          <h2>Welcome, {auth.user.username}!</h2>
          <CreatePost onPostCreated={handlePostCreated} />
        </div>
      )}
      {auth.isAuthenticated && <DisplayPost posts={posts} />}
    </div>
  );
}

export default Home;
