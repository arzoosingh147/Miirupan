import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Create context
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: uuidv4(),
      title: "Looking for a frontend partner!",
      description: "I'm building a UI/UX tool and need help with animations.",
      tag: "project",
      replies: [],
      comments: [],
      votes: { up: 3, down: 1 },
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Can someone explain React useEffect?",
      description: "I'm confused about cleanup functions.",
      tag: "guidance",
      replies: [],
      comments: [],
      votes: { up: 5, down: 0 },
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Pitch: Fast Portfolio Builder Tool",
      description: "I built a tool to generate dev portfolios. Thoughts?",
      tag: "skills",
      replies: [],
      comments: [],
      votes: { up: 7, down: 0 },
      createdAt: new Date().toISOString()
    }
  ]);

  // Add new post
  const addPost = (title, description, tag = "community", user) => {
    const newPost = {
      id: uuidv4(),
      title,
      description,
      tag,
      authorEmail: user.email, // add this
      replies: [],
      comments: [],
      votes: { up: 0, down: 0 },
      createdAt: new Date().toISOString()
    };
    setPosts((prev) => [newPost, ...prev]);
  };
  

  // Update vote count
  const updateVotes = (postId, type) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedVotes = { ...post.votes };
        if (type === "upvote") updatedVotes.up += 1;
        else if (type === "downvote") updatedVotes.down += 1;
        return { ...post, votes: updatedVotes };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Add a comment
  const addComment = (postId, text) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = [
          ...post.comments,
          { id: uuidv4(), text, replies: [] }
        ];
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Add a reply to a comment
  const addReply = (postId, commentId, text) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment) => {
          if (comment.id === commentId) {
            const updatedReplies = [...comment.replies, { id: uuidv4(), text }];
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Optional: Edit a post
  const editPost = (postId, updatedFields) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, ...updatedFields } : post
    );
    setPosts(updatedPosts);
  };

  // Optional: Delete a post
  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        updateVotes,
        addComment,
        addReply,
        editPost,
        deletePost
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
