import "./CommentList.css";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { useNavigate } from "react-router-dom";

export function CommentsList({ comments }) {

    const navigate = useNavigate();

    function handleUserPosts(authorId, authorUsername) {
        navigate(`/author/${authorUsername}/${authorId}`, {
            state: {
                authorId: authorId,
                authorUsername: authorUsername
            }
        });
    }


    return (
        <div className="comments-section">
            <div className="comments-header">
                <h3>Comments ({comments.length})</h3>
            </div>

            <div className="comments-list">
                {comments.map((comment, index) => (
                    <div key={comment._id || index} className="comment-item">
                        <div className="comment-avatar">
                            <img
                                src={comment.author?.profile_picture || "/Fuckass.png"}
                                alt={`${comment.author?.username || 'User'}'s avatar`}
                                className="avatar"
                            />
                        </div>

                        <div className="comment-content">
                            <div className="comment-header">
                                <p
                                    onClick={() => handleUserPosts(comment.author?._id, comment.author?.username)}
                                >{comment.author ? comment.author.username : "Unknown"}</p>
                                <span className="comment-time">
                                    {formatTimeAgo(comment.created_at)}
                                </span>
                            </div>

                            <div className="comment-text">{comment.content}</div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
