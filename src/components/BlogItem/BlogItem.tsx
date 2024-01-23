import React from "react";
import "./blogitem.css";
import { IBlog } from "../../pages/Blog/Blog";
import UserDetails from "../UserDetails/UserDetails";
import { Link } from "react-router-dom";

interface IBlogItemProps {
  item: IBlog;
}

export default function BlogItem(props: IBlogItemProps) {
  const { item } = props;

  return (
    <Link to={`/blogs/${item._id}`} className="blogitem_main_cont">
      <div className="blogitem_details_main_cont">
        <UserDetails author={item.author} createdAt={item.createdAt} />
        <h1 className="blogitem_title">{item.title}</h1>
        <p className="blogitem_estimated_time">
          Estimated Read Time : {item.readtime} Mins
        </p>
      </div>
      <img
        src={item.blogImages}
        className="blogitem_image"
        alt={`${item.title} - image`}
      />
    </Link>
  );
}
