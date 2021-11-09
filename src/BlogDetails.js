import { useParams } from "react-router";
import useFetch from "./useFetch";
import { useHistory } from "react-router";
import Moment from "moment";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8000/blogs/" + id);
  const history = useHistory();

  const handleDeleteClick = () => {
    fetch("http://localhost:8000/blogs/" + id, {
      method: "Delete",
    }).then(() => {
      history.push("/");
    });
  };

  const handleEditClick = () => {
    history.push(`/edit/${blog.id}`);
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>
            Written by {blog.author} on the{" "}
            {Moment(blog.creationDate).format("DD-MM-YYYY")}
          </p>
          <div>{blog.body}</div>
          <button onClick={handleDeleteClick}>Delete</button>
          <button onClick={handleEditClick}>Edit</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
