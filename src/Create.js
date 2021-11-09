import { useState } from "react";
import { useHistory } from "react-router";
import DatePicker from "react-datepicker";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("luigi");
  const [isPending, setIsPending] = useState(false);
  const [creationDate, setCreationDate] = useState(new Date());
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, creationDate, author };

    setIsPending(true);

    fetch("http://localhost:8000/blogs", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("New Blog added!");
      setIsPending(false);
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a new Blog</h2>
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
        {isPending && <button disabled>Saving...</button>}
        {!isPending && <button>Add Blog</button>}
        <p>{title}</p>
        <p>{body}</p>
        <p>{author}</p>
      </form>
    </div>
  );
};

export default Create;
