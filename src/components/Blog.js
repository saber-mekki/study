import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionOne from "./layouts/SectionOne";
import axios from "axios";
import SectionTwo from "./layouts/SectionTwo";
function Blog() {
    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get( `${process.env.REACT_APP_API_BASE_URL}/blogs`);
                const blogsData = response.data.blogs;
                setBlogs(blogsData);

            } catch (err) {
                alert("Error fetching blogs");
                console.error(err);
            }
        };

        fetchBlogs();
    }, []);




    return (
        <SectionTwo title={'Blogs'}>
            <section className="section-padding pb-fix">
                <div className="container">
                    <div className="row">



                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <div key={blog.id} className="col-md-4 mb-4">
                                    <div className="card shadow border-0 hover-grayscale">
                                    <Link to={`/blog-details/${blog.id}`} className="initiate-scripts">
                                    <img
                                                className="card-img-top"
                                                src={process.env.PUBLIC_URL + '/assets/images/blog.jpg'}
                                                alt={blog.title}
                                            />
                                        </Link>
                                        <div className="card-body border-top p-30">
                                            <div className="post-meta font-weight-500 small mb-20">
                                                <span className="mr-3">
                                                    <i className="far fa-calendar-alt text-primary mr-2" />
                                                    {new Date(blog.created_at).toLocaleDateString()}
                                                </span>
                                                <span>
                                                    <i className="fas fa-user text-primary mr-2" />
                                                    {blog.user_name}
                                                </span>
                                            </div>
                                            <h5 className="font-weight-600">
                                            <Link to={`/blog-details/${blog.id}`} className="initiate-scripts">
                                            {blog.title}
                                                </Link>
                                            </h5>
                                            <p className="mt-3">
                                                {blog.content.length > 100
                                                    ? blog.content.substring(0, 50) + "..."
                                                    : blog.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No blogs found.</p>
                        )}







                    </div>
                </div>
            </section>
        </SectionTwo>
    );
}


export default Blog;