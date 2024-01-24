import { useLocation, useNavigate } from "react-router-dom";
import "./footer.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import ENV from "../../utils/env";
import { setError } from "../../redux/slice/errorSlice";

type IFooterItem = {
  url: string;
  name: string;
  logo: JSX.Element;
};

type IFooterItems = IFooterItem[];

const footerItems: IFooterItems = [
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/praveen-balasubramaniam/",
    logo: (
      <svg
        enable-background="new 0 0 183.836 179.8984"
        id="linkedin"
        version="1.1"
        className="footer_logo"
        viewBox="0 0 183.836 179.8984"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path d="M21.5663,0C9.0703,0,0,8.6172,0,20.488c0,11.8636,8.8907,20.4748,21.1367,20.4748c6.3516,0,11.8244-2.0584,15.828-5.9552   c3.84-3.738,5.9572-8.8944,5.9532-14.6132C42.6367,8.3868,33.8555,0,21.5663,0z M31.3867,29.2732   c-2.4804,2.4144-6.0272,3.6896-10.25,3.6896C13.4023,32.9628,8,27.834,8,20.488C8,13.0196,13.4531,8,21.5663,8   c7.9337,0,13.172,4.9392,13.3516,12.49C34.9179,23.9376,33.664,27.0564,31.3867,29.2732z" />
          <path d="M3.836,179.8984h35.9531V47.7208H3.836V179.8984z M11.836,55.7208h19.9531v116.1776H11.836V55.7208z" />
          <path d="M134.5939,47.7208c-16.672,0-26.8792,5.7536-32.7932,11.166l-1.1247-11.166H60v132.1776h39.836v-69.4708   c0-2.992,1.2107-9.2052,1.9727-10.8456c4.8124-10.3652,11.3044-10.3652,21.1364-10.3652c11.3244,0,20.8909,10.6192,20.8909,23.1876   v67.494h40v-74.6816C183.836,65.7128,158.3087,47.7208,134.5939,47.7208z M175.836,171.8984h-24v-59.494   c0-16.9064-13.2305-31.1876-28.8909-31.1876c-10.0468,0-21.4336,0-28.3944,14.998c-1.4376,3.0996-2.7147,10.5292-2.7147,14.2128   v61.4708H68V55.7208h25.4415l1.6328,16.1776h6.5544l1.172-1.8908c2.668-4.2948,11.1056-14.2868,31.7932-14.2868   c19.8632,0,41.2421,15.488,41.2421,49.496V171.8984z" />
        </g>
      </svg>
    ),
  },
];

export const FooterLink: React.FC<{ item: IFooterItem }> = (props) => {
  const { item } = props;

  return (
    <a target="_blank" href={item.url} className="footer_icon_cont">
      {item.logo}
    </a>
  );
};
export default function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((e: RootState) => e.initialReducer);
  const reviewToggle = () => {
    if (isLoggedIn) {
      navigate("/review", {
        state: { redirect: pathname },
      });
    } else {
      dispatch(setError("Kindly Log in Post a Review about Us"));
      navigate("/login", {
        state: {
          redirect: "/review",
        },
      });
    }
  };

  if (ENV.nonAvailablePath.includes(pathname)) return null;

  return (
    <footer className="footer_main_cont">
      <div className="footer_sub_cont">
        <div className="footer_upper_part">
          <FooterLink item={footerItems[0]} />
        </div>
        <p className="footer_review_text" onClick={reviewToggle}>
          We are Open to reviews kindly send your reviews here
        </p>
      </div>
      <hr />
      <p className="footer_review_text">
        ©2021 All Rights Reserved | Designed and Developed by
        {" Praveen  "}
      </p>
    </footer>
  );
}
