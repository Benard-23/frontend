import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../../UserContext";


export default function PostPage() {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPost() {
            try {
                const res = await fetch(`https://api-adtu.onrender.com/post/${id}`);
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                const data = await res.json();
                setPostInfo(data);
            } catch (err) {
                console.error("❌ Error fetching post:", err);
                setError("Could not load post.");
            }
        }
        loadPost();
    }, [id]);

    if (error) return <div className="post-page"><p>{error}</p></div>;
    if (!postInfo) return <div className="post-page"><p>Loading…</p></div>;

    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>

            <div className="author">
                <span>{postInfo.author?.username}</span>
                <time style={{ display: "block", marginTop: "5px" }}>
                    {formatISO9075(new Date(postInfo.createdAt))}
                </time>
            </div>

            {/* ✅ check with optional chaining so it works as soon as both objects exist */}
            {userInfo?.id === postInfo.author?._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        Edit this post
                    </Link>
                </div>
            )}

            {postInfo.cover && (
                <div className="image">
                    <img
                        src={`https://api-adtu.onrender.com/${postInfo.cover}`}
                        alt={postInfo.title}
                    />
                </div>
            )}

            <div
                className="content"
                dangerouslySetInnerHTML={{ __html: postInfo.content }}
            />
        </div>
    );
}


