import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/auth";
import avatar from "../../assets/svgs/avatar.svg";
import "./blog.css";
import moment from "moment";

interface IBlog {
  _id: string;
  title: string;
  content: string;
  readtime: number;
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
        <div className="view_blog_user">
          <img src={avatar} alt="avatar" className="view_blog_user_avatar" />
          <div className="view_blog_user_details">
            <p className="view_blog_user_name">
              {blog?.author.firstname}
              {blog?.author.lastname}
            </p>
            <p className="view_blog_created_at">
              {moment(blog?.createdAt).format("MMM D, YYYY")} * Estimated read
              time: {blog?.readtime} minutes
            </p>
          </div>
        </div>
        <div
          className="blog_view_tag"
          dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
        ></div>
      </div>
    </main>
  );
}
