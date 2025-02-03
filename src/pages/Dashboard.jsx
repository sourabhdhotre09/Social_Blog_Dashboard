import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost } from "../features/postsSlice";
import PostCard from "../Components/PostCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const searchQuery = useSelector((state) => state.search);

  const [newPostText, setNewPostText] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = () => {
    if (newPostText) {
      const newPost = {
        id: Date.now(),
        title: newPostText,
      };
      dispatch(addPost(newPost));
      setNewPostText("");
    }
  };


  const filteredPosts = posts.filter((post) => {
    const inPost = post.title.toLowerCase().includes(searchQuery.toLowerCase());
  

    const inComments =
      (post.comments || []).some((comment) =>
        comment.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
    return inPost || inComments;
  });
  

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4 mt-4">Posts</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="New post text"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          className="p-2 rounded border"
        />
        <button
          onClick={handleAddPost}
          className="bg-gray-800 text-white px-4 py-2 rounded ml-2"
        >
          Add Post
        </button>
      </div>
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {filteredPosts.length === 0 && !loading && (
        <p>No matching posts or comments found</p>
      )}
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Dashboard;
