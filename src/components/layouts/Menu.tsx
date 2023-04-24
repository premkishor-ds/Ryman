import * as React from "react";
import Link from "../commons/Link";
import { humburgerIcon, logo } from "../../../sites-global/global";

function Menu(props: any) {
  const toggle = () => {
    (document.getElementById("body") as HTMLInputElement).classList.toggle("menu-opened");
    
  };
  return (
    <>
      <ul className="primary-nav">
      <button type="button" className="menu-btn" id="menu-btn" onClick={toggle}>
        <div dangerouslySetInnerHTML={{ __html: humburgerIcon }} />
        </button>

        {props.c_matalanMenu.c_header_links.map((item: any, i: Number) => {
          return (
            <>
              <li>
              <Link props={item} />
              </li>
            </>
          )
        })}
         {props.c_matalanMenu.c_top_header_links&&props.c_matalanMenu.c_top_header_links.map((toplinks:any)=>{
                return   (
                 <li className=" lg:hidden inline"> 
                <Link props={toplinks}/>
                </li>
                )
              })}

      </ul>
    </>
  )
}

export default Menu