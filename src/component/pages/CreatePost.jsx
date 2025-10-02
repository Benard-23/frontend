import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";       // ✅ fixed import path

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState("");

  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (file) data.set("file", file);

    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        setRedirect(true);
        setMessage("✅ Post created successfully!");
        setTitle("");
        setSummary("");
        setContent("");
        setFile(null);
      } else {
        const err = await response.json();
        setMessage(`❌ Error: ${err.error || "Failed to create post"}`);
      }
    } catch (error) {
      console.error("❌ Error creating post:", error);
      setMessage("❌ Network error");
    }
  }

  if (redirect) return <Navigate to="/" />;

  return (
    <form onSubmit={createNewPost}>
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

      <button type="submit">Create Post</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CreatePost;


