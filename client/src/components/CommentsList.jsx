import "./CommentList.css";
import { formatTimeAgo } from "../utils/formatTimeAgo";

export function CommentsList({ comments }) {
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
                                <span className="username">@{comment.author?.username || 'anonymous'}</span>
                                <span className="comment-time">
                                    {formatTimeAgo(comment.created_at)}
                                </span>
                            </div>
                            
                            <div className="comment-text">{comment.content}</div>
                            
                            <div className="comment-actions">
                                <button className="like-btn">
                                    ❤️ {comment.likes_count || 0}
                                </button>
                                <button className="reply-btn">Reply</button>
                            </div>
                            
                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="replies-section">
                                    {comment.replies.map((reply) => (
                                        <div key={reply._id} className="reply-item">
                                            <div className="comment-avatar">
                                                <img 
                                                    src={reply.author?.profile_picture || "/Fuckass.png"} 
                                                    alt={`${reply.author?.username || 'User'}'s avatar`}
                                                    className="avatar"
                                                />
                                            </div>
                                            <div className="reply-content">
                                                <div className="comment-header">
                                                    <span className="username">@{reply.author?.username || 'anonymous'}</span>
                                                    <span className="comment-time">
                                                        {formatTimeAgo(reply.created_at)}
                                                    </span>
                                                </div>
                                                <div className="comment-text">{reply.content}</div>
                                                <div className="comment-actions">
                                                    <button className="like-btn">
                                                        ❤️ {reply.likes_count || 0}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
