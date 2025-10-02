import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      modules={modules}
    />
  );
};

export default Editor;
