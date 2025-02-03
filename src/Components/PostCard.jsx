import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removePost, updatePost } from "../features/postsSlice";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.title);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(removePost(post.id));
    }
  };

  const handleEdit = () => {
    dispatch(updatePost({ ...post, title: editText }));
    setIsEditing(false);
  };

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment }]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  const handleEditComment = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditingCommentText(text);
  };

  const handleSaveComment = () => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === editingCommentId
          ? { ...comment, text: editingCommentText }
          : comment
      )
    );
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  return (
    <div className="border p-4 rounded mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border rounded p-2"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
            onClick={handleEdit}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <p>{post.title}</p>
      )}
      <div className="mt-2">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded mr-2"
          onClick={handleLike}
        >
          Like ({likes})
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div className="mt-4">
        <h4 className="font-bold">Comments:</h4>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="border p-2 rounded mb-2">
              {editingCommentId === comment.id ? (
                <div>
                  <input
                    type="text"
                    value={editingCommentText}
                    onChange={(e) => setEditingCommentText(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                    onClick={handleSaveComment}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
                    onClick={() => setEditingCommentId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  {comment.text}
                  <button
                    className="bg-gray-800 text-white px-2 py-1 rounded ml-2"
                    onClick={() => handleEditComment(comment.id, comment.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border rounded p-2"
        />
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded ml-2"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default PostCard;
