import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/auth";
import "./blog.css";

interface IBlog {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    firstname: string;
    lastname: string | null;
    avatar: string | null;
    username: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
  hashtags: [];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
export default function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<IBlog>();
  const fetchBlogPost = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/blogs/${id}`);
      const data = await response.data;
      setBlog(data.data.blog);
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  console.log(blog);
  useEffect(() => {
    fetchBlogPost();
  }, [fetchBlogPost]);

  return (
    <main className="view_blog_main_cont">
      <div className="view_blog_maindiv">
        <h1>{blog?.title}</h1>
        <div
          className="blog_view_tag"
          dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
        ></div>
      </div>
    </main>
  );
}
