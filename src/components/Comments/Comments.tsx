import React, { useState } from "react";
import UserDetails, { IUser } from "../UserDetails/UserDetails";
import SendButton from "../SendButton/SendButton";
import "./comments.css";
import axiosInstance from "../../utils/auth";
import NormalBtn from "../NormalBtn/NormalBtn";
import { setError } from "../../redux/slice/errorSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import ShowModal from "../ShowModal/ShowModal";

export interface IComment {
  _id: string;
  comment: string;
  user_id: IUser;
  blog_id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ICommentProps {
  data?: IComment | null;
  remove: (id: string) => void;
  isLoggedIn: boolean;
}

interface IReply {
  _id: string;
  reply: string;
  user_id: string;
  comment_id: string;
  createdAt: Date;
  updatedAt: Date;
}
export default function Comments({ data, remove, isLoggedIn }: ICommentProps) {
  const [replyText, setReplyText] = useState("");
  const [isReplyOn, setIsReplyOn] = useState(false);
  const [replies, setReplies] = useState<IReply[]>([]);
  const [delModal, setDelModal] = useState(false);
  const [totalReplies, setTotalReplies] = useState<number | null>(null);
  const dispatch = useDispatch();
  const { user } = useSelector((e: RootState) => e.initialReducer);

  const onClickSend = async () => {
    if (!isReplyOn) {
      setIsReplyOn(true);
    } else {
      try {
        const response = await axiosInstance.post(`/reply/${data?._id}`, {
          reply: replyText,
        });
        await response.data;
        if (response.status === 200) {
          await getAllReplies();
          setReplyText("");
          setIsReplyOn(false);
        }
        setIsReplyOn(false);
      } catch (error) {
        dispatch(setError(error.response.data.message));
      }
    }
  };

  const getAllReplies = async () => {
    try {
      const res = await axiosInstance.get(`/reply/${data?._id}`);
      const datares = await res.data;
      setTotalReplies(datares.data.total);
      setReplies(datares.data.replies);
    } catch (error) {
      console.log(error.response);
    }
  };

  const onClickCommentDelete = async () => {
    const id = data?._id;
    try {
      const res = await axiosInstance.delete("/comment", { data: { _id: id } });
      if (res.status === 204) {
        remove(id || "");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(">>isLog", isLoggedIn);
  return (
    <>
      <div className="comments-main-cont">
        <div className="comments_user_details_delete">
          <UserDetails author={data?.user_id} createdAt={data?.createdAt} />
          {user._id === data?.user_id._id && (
            <p onClick={() => setDelModal(true)}>Delete</p>
          )}
        </div>
        <p className="comments_comment">{data?.comment}</p>
        {totalReplies !== null ? (
          <>
            <p className="total-replies ">Total Replies : {totalReplies} </p>
            {replies.map((e) => (
              <p className="PlaygroundEditorTheme__quote">{e.reply}</p>
            ))}
          </>
        ) : (
          <NormalBtn onClick={getAllReplies} label="View  Replies" />
        )}

        {isLoggedIn && (
          <SendButton
            onClick={onClickSend}
            label="Reply"
            addOnClass="comments_reply_btn"
          />
        )}
        <textarea
          placeholder="Your Thoughts...."
          maxLength={250}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className={`comment_reply_textarea ${!isReplyOn ? "isReplyNot" : ""}`}
        />

        <hr />
      </div>

      <ShowModal
        leftBtnFunction={onClickCommentDelete}
        isVisible={delModal}
        rightBtnFunction={() => setDelModal(false)}
      />
    </>
  );
}
