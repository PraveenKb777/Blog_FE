import React from "react";
import avatar from "../../assets/svgs/avatar.svg";
import moment from "moment";

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string | null;
  avatar: string | null;
  username?: string;
  email?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUserDetails {
  author?: IUser;
  createdAt?: Date;
  readtime?: number;
}

export default function UserDetails(props: IUserDetails) {
  return (
    <div className="view_blog_user">
      <img
        src={props.author?.avatar || avatar}
        alt="avatar"
        className="view_blog_user_avatar"
      />
      <div className="view_blog_user_details">
        <p className="view_blog_user_name">
          {props?.author?.firstname}
          {props?.author?.lastname}
        </p>
        {props.createdAt && (
          <p className="view_blog_created_at">
            {moment(props?.createdAt).format("MMM D, YYYY")}
            {props.readtime &&
              ` * Estimated read time: ${props?.readtime} minutes`}
          </p>
        )}
      </div>
    </div>
  );
}
