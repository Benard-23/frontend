import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Editor from "../Editor";   // ✅ adjust path if needed

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Load the current post
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return res.json();
      })
      .then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      })
      .catch((err) => {
        console.error("Error loading post:", err);
        setMessage(`Failed to load post (${err.message})`);
      });
  }, [id]);

  // ✅ Update handler with clear error reporting
  async function updatePost(ev) {
  ev.preventDefault();

  const data = new FormData();
  data.set("title", title);
  data.set("summary", summary);
  data.set("content", content);
  if (file) data.set("file", file);

  try {
    const res = await fetch(`http://localhost:4000/post/${id}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (!res.ok) {
      const err = await res.json();
      setMessage(`Update failed: ${err.error || err.details}`);
      return;
    }
    const updated = await res.json();
    setMessage("✅ Updated successfully!");
  } catch (err) {
    console.error("Update error:", err);
    setMessage("Network error");
  }
}

  if (redirect) return <Navigate to={`/post/${id}`} />;

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
        required
      />
      <input type="file" onChange={(ev) => setFile(ev.target.files[0])} />

      <Editor value={content} onChange={setContent} />

      <button type="submit">Update Post</button>
      {message && <p>{message}</p>}
    </form>
  );
}
