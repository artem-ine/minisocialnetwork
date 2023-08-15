import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../jotai/useAuth";

function formatDateTime(dateTime) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(dateTime).toLocaleString(undefined, options);
}

function UserProfile() {
  const { auth } = useAuth();
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const jwtToken = auth.token;

  useEffect(() => {
    console.log("auth.isAuthenticated:", auth.isAuthenticated);
    const fetchData = async () => {
      try {
        console.log("jwtToken:", jwtToken);
        if (!jwtToken) {
          console.error("No JWT token available.");
          return;
        }

        // Fetch user profile
        const response = await fetch(
          `http://localhost:1337/api/users?filters[username]=${username}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching user profile");
        }

        const userData = await response.json();
        if (userData && userData.length > 0) {
          setUserProfile(userData[0]);
          console.log("userData:", userData[0]);

          // Fetch user posts
          const postsResponse = await fetch(
            `http://localhost:1337/api/posts?populate=*`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!postsResponse.ok) {
            throw new Error("Error fetching user posts");
          }

          const userPostsData = await postsResponse.json();
          const filteredPosts = userPostsData.data.filter(
            (post) => post.attributes.user.data.id === userProfile.id
          );
          setUserPosts(filteredPosts);
        } else {
          console.error("User data is missing or empty.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [auth.isAuthenticated, auth.token, username, jwtToken, userProfile.id]);

  return (
    <div>
      {auth.isAuthenticated ? (
        userProfile ? (
          <div>
            <h2>User Profile: {userProfile.username}</h2>
            <p>Email: {userProfile.email}</p>
            <p>Description: {userProfile.description}</p>
            <h3>User Posts</h3>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div key={post.id}>
                  <p>Post: {post.attributes.text}</p>
                  <p>
                    Published by:{" "}
                    {post.attributes.user.data.attributes.username}
                  </p>
                  <p>
                    Published at: {formatDateTime(post.attributes.publishedAt)}
                  </p>
                </div>
              ))
            ) : (
              <p>No posts to display.</p>
            )}
          </div>
        ) : (
          <p>Loading user profile...</p>
        )
      ) : (
        <p>You must be authenticated to view this page.</p>
      )}
    </div>
  );
}

export default UserProfile;
