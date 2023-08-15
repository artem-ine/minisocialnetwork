import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../jotai/useAuth";

function CreatePost({ onPostCreated }) {
  const { auth } = useAuth();
  const [postText, setPostText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objectData = {
      data: {
        text: postText,
        users: auth.user,
      },
    };

    try {
      const jwtToken = auth.token;

      const response = await fetch("http://localhost:1337/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectData),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPostText("");
        onPostCreated(newPost); // Notify parent component about the new post
      } else {
        const errorData = await response.json();
        console.error("Error creating post:", errorData);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      {auth.isAuthenticated && (
        <div>
          <h2>Create Post</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <br />
            <button type="submit">Post</button>
          </form>
        </div>
      )}
    </div>
  );
}

CreatePost.propTypes = {
  onPostCreated: PropTypes.func.isRequired,
};

export default CreatePost;
