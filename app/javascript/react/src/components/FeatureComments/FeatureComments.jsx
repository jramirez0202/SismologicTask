import React, { useState, useEffect } from "react";
import AxiosData from "../../../../api/AxiosData.js";

const FeatureComments = ({ featureId }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await AxiosData.fetchFeatureComments(featureId);
        if (response) {
          setComments(response);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [featureId]);

  const handleToggleChange = () => {
    setShowComments(!showComments);
  };

  const handleCreateComment = async () => {
    if (!newComment.trim()) {
      setCommentError("Comentario debe incluir texto");
      return;
    }
    try {
      const response = await AxiosData.createFeatureComment(
        featureId,
        newComment
      );
      if (response) {
        setComments([...comments, response]);
        setNewComment("");
        setCommentError("");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      setCommentError("Error al crear el comentario");
    }
  };

  return (
    <div className="mt-4">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={showComments}
          onChange={handleToggleChange}
        />
        <div
          className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600`}
        ></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {showComments ? "Ocultar comentarios" : "Mostrar comentarios"}
        </span>
      </label>
      {showComments && (
        <div>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="mb-2">
                <strong>{comment.user}</strong>
                {comment.body}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
                setCommentError("");
              }}
              placeholder="Escribe tu comentario aquí"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {commentError && (
              <span className="block text-red-500 text-sm mb-2">{commentError}</span>
            )}
            <button
              onClick={handleCreateComment}
              className="text-[#10768488] font-bold"
            >
              Comentar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureComments;
