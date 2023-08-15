import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../jotai/useAuth";

function CreatePost({ onPostCreated }) {
  const { auth } = useAuth();
  const [postText, setPostText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwtToken = auth.token;

      const response = await fetch("http://localhost:1337/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: postText,
          author: auth.user.id,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPostText("");
        onPostCreated(newPost); // Notify parent component about the new post
      } else {
        console.error("Error creating post");
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
