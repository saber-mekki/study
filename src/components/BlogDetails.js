import React, { useEffect, useState } from "react";
import SectionOne from "./layouts/SectionOne";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [Recentblog, setRecentBlogs] = useState(null);
  const [Replies, setReplies] = useState(null);
  const [comment, setComment] = useState("");
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/blogs/${id}`
        );
        setBlog(response.data.blog);
      } catch (error) {
        console.error("Failed to fetch blog details:", error);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/blogs");
        const blogsData = response.data.blogs;
        setRecentBlogs(blogsData);
      } catch (err) {
        alert("Error fetching blogs");
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/replies",
          { id }
        );
        const ReplisData = response.data.replies;
        setReplies(ReplisData);
      } catch (err) {
        console.log("Error fetching Replies");
        console.error(err);
      }
    };
    fetchReplies();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.user_email;

    try {
      await axios.post("http://localhost:5000/api/v1/Createreply", {
        blog_id: blog.id,
        reply_text: comment,
        email_user: userEmail,
      });

      setComment("");
      window.location.reload();
    } catch (error) {
      console.log("Failed to fetch blog details:", error);
    }
  };

  if (!blog || !Recentblog) {
    return <div>Loading...</div>;
  }

  return (
    <SectionOne title={"Blog Details"}>
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="mb-35">
                <img
                  className="img-fluid rounded"
                  src={
                    process.env.PUBLIC_URL + "/assets/images/blog-single.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="post-meta font-weight-500 mb-15">
                <span className="mr-4">
                  <i className="far fa-calendar-alt text-primary mr-2" />
                  {new Date(blog.created_at).toLocaleDateString()}
                </span>
                <span>
                  <i className="fas fa-user text-primary mr-2" />{" "}
                  {blog.user_name}
                </span>
              </div>
              <h2 className="text-secondary font-weight-bold mb-4">
                {blog.title}
              </h2>

              <div className="mt-3 mb-60">
                <div className="blockquote bg-secondary p-30 my-4 text-white rounded text-center">
                  {blog.content}
                </div>
              </div>

              {Array.isArray(Replies) && Recentblog.length > 0 ? (
                Replies.map((reply) => (
                  <div key={reply.id} className="my-4">
                    <div className="media has-outline-primary d-block d-sm-flex border-bottom mb-30 pb-30">
                      <Link
                        to={"/"}
                        className="d-inline-block mr-2 mb-3 mb-md-0"
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/user-03.jpg"
                          }
                          className="mr-3 rounded-circle"
                          alt=""
                        />
                      </Link>
                      <div className="media-body">
                        <Link
                          to={"/"}
                          className="h4 d-inline-block font-weight-600 mb-10 text-secondary"
                        >
                          {reply.email_user}
                        </Link>
                        <p>
                          <span className="text-black-300 mr-3">
                            {new Date(reply.created_at).toLocaleDateString()}
                          </span>
                          <Link
                            to={"/"}
                            className="text-primary font-weight-600"
                          >
                            Reply
                          </Link>
                        </p>

                        <p className=" h2 mt-15">{reply.reply_text}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments .</p>
              )}

              <div>
                <h3 className="text-black-200 my-5  font-weight-600 mb-30">
                  comment
                </h3>
                <form method="POST" onSubmit={handleCommentSubmit}>
                  <div className="row">
                    <div className="form-group mb-30 col-md-12">
                      <textarea
                        className="form-control shadow-none rounded-sm"
                        name="comment"
                        rows="7"
                        value={comment}
                        onChange={handleCommentChange}
                        required
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary rounded-pill mt-2"
                    type="submit"
                  >
                    Comment Now
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-4  mt-lg-0">
              <div className="widget">
                <h4 className="widget-title">Archives</h4>
                <ul className="widget-list list-unstyled">
                  <li>
                    <Link to={"/"}>
                      <i className="fas fa-caret-right mr-2" />
                      April
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"}>
                      <i className="fas fa-caret-right mr-2" />
                      May
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"}>
                      <i className="fas fa-caret-right mr-2" />
                      June
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"}>
                      <i className="fas fa-caret-right mr-2" />
                      Julay
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"}>
                      <i className="fas fa-caret-right mr-2" />
                      August
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"}>
                      <i className="fas fa-caret-right mr-2" />
                      September
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="widget m-0">
                <h4 className="widget-title">Recent Post</h4>
              </div>
              <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                {Array.isArray(Recentblog) && Recentblog.length > 0 ? (
                  Recentblog.slice(0, 3).map((blog) => (
                    <div key={blog.id} className="my-4">
                      <div className="">
                        <div className="post-meta font-weight-500 small mb-2">
                          <span className="mr-4">
                            <i className="far fa-calendar-alt text-primary mr-2" />{" "}
                            {new Date(blog.created_at).toLocaleDateString()}
                          </span>
                          <span>
                            <i className="fas fa-user text-primary mr-2" />{" "}
                            {blog.user_name}
                          </span>
                        </div>
                        <Link
                          to={`/blog-details/${blog.id}`}
                          className="text-secondary font-weight-600 h5"
                        >
                          {blog.title}
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No blogs found.</p>
                )}

                <div
                  onClick={() => window.scrollTo(0, 0)}
                  className="mt-3 mb-20 text-center"
                >
                  <Link to="/blog" className="">
                    View All
                  </Link>
                </div>
              </div>
              <div className="widget">
                <h4 className="widget-title">Tags</h4>
                <ul className="tag-list list-inline list-unstyled mt-2">
                  <li className="list-inline-item">
                    <Link to={"/"}>Tutor</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to={"/"}>Education</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to={"/"}>Online learning</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to={"/"}>Teacher</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to={"/"}>Student</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to={"/"}>Photography</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionOne>
  );
}

export default BlogDetails;
