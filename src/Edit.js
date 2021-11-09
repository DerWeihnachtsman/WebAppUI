import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";
import DatePicker from "react-datepicker";

const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [creationDate, setCreationDate] = useState(new Date());
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8000/blogs/" + id);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, creationDate, author };

    setIsSaving(true);

    fetch("http://localhost:8000/blogs/" + id, {
      method: "Put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log(JSON.stringify(blog));
      setIsSaving(false);
      history.push("/");
    });
  };

  useEffect(() => {
    if (blog != null && error == null) {
      setTitle(blog.title);
      setBody(blog.body);
    }
  }, [blog, error]);

  return (
    <div className="create">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blog && (
        <form onSubmit={handleSubmit}>
          <label>Blog Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog Body</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <label>Choose Date</label>
          <DatePicker
            selected={creationDate}
            onChange={(e) => setCreationDate(e)}
          ></DatePicker>
          <label>Blog Author</label>
          <select value={author} onChange={(e) => setAuthor(e.target.value)}>
            <option value="mario">Mario</option>
            <option value="luigi">Luigi</option>
          </select>
          {isSaving && <button disabled>Saving...</button>}
          {!isSaving && <button>Save Changes</button>}
        </form>
      )}
    </div>
  );
};

export default Edit;
