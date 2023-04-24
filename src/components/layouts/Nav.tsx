import * as React from "react";
import { useEffect, useState } from "react";
import Logo from "../../images/logo-header.svg";
import Menu from "./Menu";
import { CSSTransition } from "react-transition-group";
import { humburgerIcon, logo } from "../../../sites-global/global";
import Link from "../commons/Link";

const Nav = (props: any) => {
  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  })
  const toggle = () => {
    (document.getElementById("body") as HTMLInputElement).classList.toggle("menu-opened");
    
  };
  const RemoveMenu=()=>{
    (document.getElementById("body") as HTMLInputElement).classList.remove("menu-opened");
  }

  return (
    <>
      <div className="site-header">
        <div className="header-top">
          <div className="container">
          <img src="https://eu.evocdn.io/dealer/1411/content/media/My_Theme/ry-foot-logo.png" />
            {/* <div className="logo">
              {props._site.c_matalan_header_logo?
               <img src={props._site.c_matalan_header_logo.image.url} />
              :
              <div dangerouslySetInnerHTML={{ __html: logo }} />}
            </div> */}


            <ul className="top-hdr-links">
              {props._site.c_top_header_links&&props._site.c_top_header_links.map((toplinks:any)=>{
                return   (
                 <li className="px-4 inline"> 
                <Link props={toplinks}/>
                </li>
                )
              })}
            </ul>


          </div>
        </div>

        <navbar className="main-nav" onClick={RemoveMenu}>
          <div className="container">
            <Menu c_matalanMenu={props._site} />
          </div>
        </navbar>

        <button type="button" className="menu-btn" id="menu-btn" onClick={toggle}>
        <div dangerouslySetInnerHTML={{ __html: humburgerIcon }} />
        <span>Menu</span>
        </button>

      </div>
    </>
  )
}

export default Nav;
