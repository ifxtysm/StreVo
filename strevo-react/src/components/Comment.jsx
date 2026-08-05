function Comment({ comment }) {

    return (

        <div className="comment">

            <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.username)}&background=ff4d4f&color=ffffff`}
                alt={comment.username}
            />

            <div className="comment-content">

                <h4>{comment.username}</h4>

                <p>{comment.comment}</p>

            </div>

        </div>

    );

}

export default Comment;