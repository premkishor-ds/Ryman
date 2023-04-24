import * as React from "react";
import abbanner from "../../images/ab-banner.jpg"
import dt12 from "../../images/dtl2.jpg"
import PhotoSlider from "./PhotoSlider"

export default function About(props: any) {

  return (
    <>
      <div className="about-sec ">
        <div className="about-inner-sec">
          <div className="w-full lg:w-2/5 xl:w-[47%] relative  left-0">

            <div id="splide" className="splide lg:-mx-[15px] lg:h-full">
              <div className="splide__track lg:h-full">
                <ul className="splide__list lg:h-full">
                  {props.photoGallery ?
                    <PhotoSlider photoGallery={props.photoGallery} />
                    : ''}
                </ul>
              </div>
            </div>
          </div>
          <div className="about-content">
            <div className="mb-4">
              <h2>{props.name}</h2>
              <div className="text-text-light mt-3 md:mt-6">
              <p dangerouslySetInnerHTML={{__html: props.description}}/>
              </div>
              {props.c_viewMore.link&&props.c_viewMore.label?
              <div className="content-center w-full ">
                <a href={props.c_viewMore.link} className="button-red">{props.c_viewMore.label}</a>
              </div>
              :''}
            </div>
          </div>
        </div>
      </div>
    </>
  )


}