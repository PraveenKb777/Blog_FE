import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commentSvg from "../../assets/svgs/comment.svg";
import Comments, { IComment } from "../../components/Comments/Comments";
import SendButton from "../../components/SendButton/SendButton";
import UserDetails, { IUser } from "../../components/UserDetails/UserDetails";
import axiosInstance from "../../utils/auth";
import "./blog.css";

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  readtime: number;
  author: IUser;
  hashtags: [];
  blogImages: string;
  createdAt: Date;
  updatedAt: Date;
}
export default function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<IBlog>();
  const [totalComments, setTotalComments] = useState<number>();
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [toggleComment, setToggleComment] = useState(false);
  const [addComment, setAddComment] = useState("");
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const getAllComments = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`comment/${id}`);
      const data = await res.data;
      setCommentList(data.data.comments);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const verifyUser = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/user");
      await res.data;

      setLoggedIn(true);
    } catch (error) {
      console.warn("Not Logged in");
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  useEffect(() => {
    if (toggleComment) getAllComments();
  }, [getAllComments, toggleComment]);

  const fetchBlogPost = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/blogs/${id}`);
      const data = await response.data;
      setBlog(data.data.blog);
      if (response.status === 200) {
        const countRes = await axiosInstance.get(`/comment/count/${id}`);
        const data = await countRes.data;
        setTotalComments(data.data.totalComments);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const postComment = async () => {
    setAddCommentLoading(true);
    try {
      const res = await axiosInstance.post(`/comment`, {
        comment: addComment,
        blog_id: id,
      });
      const data = await res.data;
      if (res.status === 200) {
        setAddComment("");
        setCommentList((e) => [data.data, ...e]);
        setTotalComments((e) => {
          return e ? e + 1 : 0;
        });
      }
      console.log(await res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setAddCommentLoading(false);
    }
  };

  const removeBlogFromState = (id: string) => {
    setCommentList((e) => {
      const a = [...e].filter((item) => item._id !== id);
      return a;
    });
    setTotalComments((e) => (e ? e - 1 : 0));
  };

  useEffect(() => {
    fetchBlogPost();
  }, [fetchBlogPost]);

  useEffect(() => {
    if (blog?.title) {
      document.title = `${blog.title} - Blogs@PKBMG`;
    }
  }, [blog?.title]);

  return (
    <>
      <main className="view_blog_main_cont">
        <div
          className={`comment-right-menu ${
            !toggleComment ? "hiddenComment" : ""
          }`}
        >
          <div className="post_comment_main">
            <p
              style={{
                marginBottom: "10px",
                cursor: "pointer",
                alignSelf: "flex-end",
              }}
              onClick={() => setToggleComment(false)}
            >
              X
            </p>
            {loggedIn ? (
              <>
                <textarea
                  value={addComment}
                  onChange={(e) => setAddComment(e.target.value)}
                  placeholder="Write your thoughts..."
                  maxLength={250}
                  className={`post_comment_input ${
                    addComment.length && "isHeight"
                  }`}
                />
                <SendButton
                  label="Post"
                  onClick={postComment}
                  isLoading={addCommentLoading}
                  addOnClass={!addComment ? "post_comment_btn" : ""}
                />
              </>
            ) : (
              <p>Login to post a comment</p>
            )}
            <hr />
          </div>
          {commentList.map((e) => (
            <Comments
              data={e}
              key={e._id}
              remove={removeBlogFromState}
              isLoggedIn={loggedIn}
            />
          ))}
        </div>
        <div className="view_blog_maindiv">
          <h1>{blog?.title}</h1>
          <hr className="view_blog_hr_line" />
          <div className="view_blog_expressions">
            <div
              onClick={() => setToggleComment((e) => !e)}
              className="view_blog_comment"
            >
              <img className="expression_comment" src={commentSvg} />
              <span>{totalComments}</span>
            </div>
            {blog?.readtime && (
              <div className="view_blog_comment">
                <span>Estimate Read Time : {"  "}</span>
                <span> {blog?.readtime} mins</span>
              </div>
            )}
          </div>
          <hr className="view_blog_hr_line" />
          <UserDetails author={blog?.author} createdAt={blog?.createdAt} />

          <div
            className="blog_view_tag"
            dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
          ></div>
        </div>
      </main>
    </>
  );
}
