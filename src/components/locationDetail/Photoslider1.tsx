import * as React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const PhotoSlider = (props: any) => {
  // const { c_photoGallery, height, width } = props;  
  const photos = props.photos && props.photos.map((element:any) => (     
	<SplideSlide>
    <img  className ="Photogalleryimg" height="" width="" src={element.url}  />
	</SplideSlide>    
  ));
 
 
  
  return (
    <>
    {photos?
    <>
     <h2 className="">PHOTO GALLERY{" "}</h2>
      {/* <h2 className="heading text-center text-bold text-red">PHOTO GALLERY</h2>   */}
      <div className="Photogallery">
      {photos}
      </div>
      </>
        :""}  
      
    </>
  );
};

export default PhotoSlider;