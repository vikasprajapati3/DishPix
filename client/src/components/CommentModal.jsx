import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function CommentsModal({ post, onClose, onCountChange }) {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data } = await api.get(
                    `/api/posts/${post._id}/comments`
                );
                setComments(data.comments || []);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to load comments."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [post._id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim() || submitting) return;

        try {
            setSubmitting(true);
            setError("");

            const { data } = await api.post(
                `/api/posts/${post._id}/comments`,
                { text: text.trim() }
            );

            setComments((current) => [data.comment, ...current]);
            setText("");
            onCountChange(post._id, 1);
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to add comment."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (comment) => {
        if (!window.confirm("Delete this comment?")) return;

        try {
            await api.delete(`/api/comments/${comment._id}`);

            setComments((current) =>
                current.filter((item) => item._id !== comment._id)
            );

            onCountChange(post._id, -1);
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to delete comment."
            );
        }
    };

    const currentUserId = user?._id || user?.id;
    const postOwnerId = post.userId?._id || post.userId;

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <section
                className="bg-white w-full max-w-md rounded-xl overflow-hidden shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="font-bold text-lg">Comments</h2>
                    <button onClick={onClose} aria-label="Close comments">
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                    </button>
                </div>

                <div className="p-4 h-80 overflow-y-auto space-y-4">
                    {loading ? (
                        <p className="text-center text-neutral-500">
                            Loading comments...
                        </p>
                    ) : comments.length === 0 ? (
                        <p className="text-center text-neutral-500">
                            No comments yet. Be the first!
                        </p>
                    ) : (
                        comments.map((comment) => {
                            const commentOwnerId =
                                comment.user?._id || comment.user;

                            const canDelete =
                                String(commentOwnerId) === String(currentUserId) ||
                                String(postOwnerId) === String(currentUserId);

                            return (
                                <div
                                    key={comment._id}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center font-bold shrink-0">
                                        {(comment.user?.username || "U")
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm">
                                            <span className="font-bold mr-2">
                                                {comment.user?.username || "User"}
                                            </span>
                                            {comment.text}
                                        </p>
                                        <p className="text-xs text-neutral-400 mt-1">
                                            {comment.createdAt
                                                ? new Date(
                                                    comment.createdAt
                                                ).toLocaleDateString()
                                                : ""}
                                        </p>
                                    </div>

                                    {canDelete && (
                                        <button
                                            onClick={() => handleDelete(comment)}
                                            className="text-neutral-400 hover:text-red-500"
                                            aria-label="Delete comment"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    )}
                                </div>
                            );
                        })
                    )}

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write a comment..."
                        maxLength={500}
                        className="flex-1 min-w-0 border rounded-full px-4 py-2 text-sm outline-none focus:border-rose-400"
                    />

                    <button
                        type="submit"
                        disabled={!text.trim() || submitting}
                        className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold disabled:opacity-50"
                    >
                        {submitting ? "Posting..." : "Post"}
                    </button>
                </form>
            </section>
        </div>
    );
}
