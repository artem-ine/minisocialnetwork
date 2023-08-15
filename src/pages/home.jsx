import React, { useState, useEffect } from "react";
import { useAuth } from "../jotai/useAuth";
import DisplayPost from "../components/posts/DisplayPost";
import CreatePost from "../components/posts/CreatePost";

function Home() {
  const { auth } = useAuth();
  const [posts, setPosts] = useState([]);

  const handlePostCreated = (newPost) => {
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
      <DisplayPost posts={posts} />
    </div>
  );
}

export default Home;
