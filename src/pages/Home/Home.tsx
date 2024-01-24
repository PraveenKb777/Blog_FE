import React, { useCallback, useEffect, useState } from "react";

import "./home.css";
import BlogItem from "../../components/BlogItem/BlogItem";
import axiosInstance from "../../utils/auth";
import { IBlog } from "../Blog/Blog";

interface IGetBlogListRes {
  total?: number;
  totalPages?: number;
  currentPage?: number;
  prevPage?: null | number;
  nextPage?: null | number;
  blogs?: IBlog[];
}

interface IPaginationProps {
  totalPages: number;
  currentPage?: number;
  prevFun?: (page: number) => void;
  nextFun?: (page: number) => void;
}
export const Pagination: React.FC<IPaginationProps> = (props) => {
  const lastpage = props.totalPages === props.currentPage;
  const firstpage = props.currentPage === 1;
  return (
    <div className="container">
      <ul className="pagination">
        {!firstpage && (
          <li
            onClick={() => {
              props.prevFun && props.prevFun(props.currentPage || 0);
            }}
          >
            <p>Prev</p>
          </li>
        )}
        <li>
          <p>{props.currentPage}</p>
        </li>

        {!lastpage && (
          <li
            onClick={() => {
              props.nextFun && props.nextFun(props.currentPage || 0);
            }}
          >
            <p>Next</p>
          </li>
        )}
      </ul>
    </div>
  );
};
export default function Home() {
  const [blogList, setBlogList] = useState<IBlog[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [otherPageDetails, setOtherPageDetails] = useState<IGetBlogListRes>();
  const getBlogList = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/blogs?limit=10&page=${pageNo}`);
      const resData = await res.data;

      const { data } = resData;
      const {
        blogs,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        total,
      }: IGetBlogListRes = data;
      setOtherPageDetails({
        currentPage,
        totalPages,
        total,
        nextPage,
        prevPage,
      });

      setBlogList(blogs || []);
    } catch (error) {
      console.log(error);
    }
  }, [pageNo]);

  useEffect(() => {
    document.title = "Blogs @ PKBMG";
    getBlogList();
  }, [getBlogList]);
  return (
    <>
      <main className="home_main_cont">
        <div className="home_main_sub_cont">
          {blogList.length
            ? blogList.map((e) => <BlogItem item={e} key={e._id} />)
            : "Loading ....."}
        </div>
      </main>
      {blogList.length ? (
        <Pagination
          prevFun={(num) => {
            setPageNo(num - 1);
          }}
          currentPage={pageNo}
          totalPages={otherPageDetails?.totalPages || 0}
          nextFun={(num) => {
            setPageNo(num + 1);
          }}
        />
      ) : null}
    </>
  );
}
