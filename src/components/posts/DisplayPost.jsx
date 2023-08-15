import React, { useState, useEffect } from "react";
import { useAuth } from "../../jotai/useAuth";

function DisplayPost() {
  const { auth } = useAuth();
  const [posts, setPosts] = useState([]);
  const jwtToken = auth.token;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!jwtToken) {
          console.log("if statement = " + jwtToken);
          console.error("No JWT token available.");
          return;
        }

        const response = await fetch(
          "http://localhost:1337/api/posts/?populate=*",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching posts");
        }

        const responseData = await response.json();
        const fetchedPosts = responseData.data;
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [auth.token, jwtToken]);

  return (
    <div>
      <h2>Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <p>{post.attributes.text}</p>
            <p>Author: {post.attributes.users.data[0].attributes.username}</p>
          </div>
        ))
      ) : (
        <p>No posts to display.</p>
      )}
    </div>
  );
}

export default DisplayPost;
