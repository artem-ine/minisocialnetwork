import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../jotai/useAuth";

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
            `http://localhost:1337/api/posts?user.id=${userProfile.id}&populate=*`,
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
          setUserPosts(userPostsData.data);
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
                    {post.attributes.users.data[0].attributes.username}
                  </p>
                  <p>Published at: {post.attributes.publishedAt}</p>
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
