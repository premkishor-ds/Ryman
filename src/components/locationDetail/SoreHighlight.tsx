import * as React from "react";
import { useState } from "react";
import { StaticData } from "../../../sites-global/staticData";
import Noimage from "../../images/placeholder.jpg"
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function StoreHighlight(props: any) {
 
    const [isSmallScreen, setIsSmallScreen] = useState(false);
	React.useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 1024px)");
		mediaQuery.addListener(handleMediaQueryChange);
		handleMediaQueryChange(mediaQuery);

		return () => {
			mediaQuery.removeListener(handleMediaQueryChange);
		};
	}, []);

	const handleMediaQueryChange = (mediaQuery:any) => {
		if (mediaQuery.matches) {
			setIsSmallScreen(true);
		} else {
			setIsSmallScreen(false);
		}
	};

    // storeData ={...props.c_storeHighlightInfo}
    return (<>
    
        <div className="container mx-auto">
          
            <div className="sec-title">
                <h2>  {props.name} {StaticData.Storehighlight}</h2>
            </div>
            {isSmallScreen?
            <div className="services-inner">
            <Splide
        id="splide-nearby"
        options={{
            rewind: false,
            type: "slide",
            perPage: 2,
            perMove: 2,
            arrows: true,
            drag: false,
            pagination: false,
            lazyLoad: "nearby",
          breakpoints: {
            1279:{
              perPage: 2,
              drag: true,
              pagination: false,
              arrows: true,
              type: "splide",
            },
          },
        }}
      >

                {
                    props.c_storeHighlightInfo.map((res: any, i: Number) => {
                        return (
                            <> <SplideSlide key={i}>
                                {res.title && res.findOutMore.label?
                                
                                <div className="item mobile-serv-item">
                                    <div className="service-item">
                                        <div className="service-img">
                                            {res.image ?
                                                
                                                    <img src={res.image.image.url} className="w-full" height="250" />
                                                
                                             : <img className="w-full" src="http://a.mktgcdn.com/p-sandbox/PTjCS8rBXb9HTapnby2IEwQooHVJYvQqu7fhve2Gheo/1000x667.jpg" height="250" alt="" />
                                            }
                                        </div>

                                        <h3>{res.title}</h3>
                                        {/* <div className="service-desc">
                                            {res.description}
                                        </div> */}
                                        {res.findOutMore.link&&res.findOutMore.label?
                                        <div className="button-bx !ml-0 mt-4">
                                            <a className="btn" href={res.findOutMore.link}>
                                                {res.findOutMore.label}</a>
                                        </div>
                                        :''}
                                    </div> </div>
                                    :''}
                                      </SplideSlide>
                            </>

                        )
                    })
                }
                 </Splide>
            </div>:

<div className="services-inner">
    {
        props.c_storeHighlightInfo.map((res: any, i: Number) => {
            return (
                <> 
                    {res.title && res.findOutMore.label?
                    
                    <div className="item">
                        <div className="service-item">
                            <div className="service-img">
                                {res.image ?
                                    
                                        <img src={res.image.image.url} className="w-full" height="250" />
                                    
                                 : <img className="w-full" src="http://a.mktgcdn.com/p-sandbox/PTjCS8rBXb9HTapnby2IEwQooHVJYvQqu7fhve2Gheo/1000x667.jpg" height="250" alt="" />
                                }
                            </div>

                            <h3>{res.title}</h3>
                            <div className="service-desc">
                                {res.description}
                            </div>
                            {res.findOutMore.link&&res.findOutMore.label?
                            <div className="button-bx  !ml-0 mt-4">
                                <a className="btn " href={res.findOutMore.link}>
                                    {res.findOutMore.label}</a>
                            </div>
                            :''}
                        </div> </div>
                        :''}
                         
                </>

            )
        })
    }
  
</div>
}

        </div>
    </>

    )



}