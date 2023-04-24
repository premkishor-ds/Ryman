import * as React from "react";
import ApiCall from "../../Apis/ApiCall";
import Address from "../commons/Address";
import GetDirection from "../commons/GetDirection";
import OpenClose from "../commons/openClose"
import timesvg from "../../images/watch-icn.svg"
import mapimage from "../../images/map.svg";
import Phonesvg from "../../images/phone.svg"
import { Addresssvg, mobilesvg, View_Store } from "../../../sites-global/global";
import Availability from "./Availability";
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function Nearby(props: any) {
  
  const [neabyData, setnearbyData] = React.useState(props.externalApiData.response.results);
  const metersToMiles = (meters: number) => {

    const miles = meters * 0.000621371;
    return miles.toFixed(2);
  }

  return (

    <>
      <Splide
        id="splide-nearby"
        options={{
          rewind: false,
          type: "slide",
          perPage: 3,
          perMove: 1,
          arrows: false,
          drag: false,
          pagination: false,
          lazyLoad: "nearby",
          breakpoints: {
            1279: {
              perPage: 1,
              drag: true,
              pagination: true,
              arrows: false,
              type: "splide",
            },
          },
        }}
      >
        {neabyData.map((location: any, index: Number) => {

          let url = "";
          var name: any = location.data.geomodifier?.toLowerCase();
          var region: any = location.data.address.region?.toLowerCase();
          var initialregion: any = region.toString();
          var finalregion: any = initialregion.replaceAll(" ", "-");
          var city: any = location.data.address.city?.toLowerCase();
          var initialrcity: any = city.toString();
          var finalcity: any = initialrcity.replaceAll(" ", "-");
          var string: any = name.toString();
          let result1: any = string.replaceAll(" ", "-");
          if (!location.data.slug) {
            url = `/${location.data.id}-${result1}.html`;
          } else {
            url = `/${location.data.slug.toString()}.html`;
          }
      
          if (index > 0) {
            return (
              <>
                <SplideSlide key={index}>
                  <div className="nearby-card">
                    <div className="location-name-miles icon-row">
                      <div className="icon"> <img className=" " src={mapimage} width="20" height="20"
                        alt="" /></div>
                      <h2><a className="inline-block notHighlight" href={url}>{location.data.geomodifier}</a></h2>
                      {location.distance ?

                        <div className="distance">
                          {metersToMiles(location.distance ?? 0)} <span>miles</span>
                        </div> : ''

                      }

                    </div>
                    <div className="icon-row content-col">
                      <Address address={location.data.address} />
                    </div>
                    {location.data.mainPhone ?
                      <div className="icon-row">
                        <div className="icon"> <img className=" " src={Phonesvg} width="20" height="20"
                          alt="" /></div>
                        <div className="content-col">
                          <h6>Telephone</h6>
                          <a href={`tel:${location.data.mainPhone}`}>{location.data.mainPhone}</a>
                        </div>
                      </div> : ''}

                   
                      {/* <div className="icon-row content-col availability-col">
                        <Availability c_openForShoppingAvailibility={location.data.c_open_for_shopping} 
                        c_clickCollectAvaliability={location.data.c_click_collect_availability} 
                        c_parking_facilities={location.data.c_parking_facilities} c_fitting_rooms={location.data.c_fitting_rooms}
                        hours={location.data.hours} />
                      </div>  */}
                    <div className="button-bx">
                      <a className="btn" href={url}>
                        {/* <div dangerouslySetInnerHTML={{__html: View_Store}}/> */}
                        View Store Detail</a>
                      <GetDirection buttonText="Direction" address={location.data.address} latitude={location.data.displayCoordinate ? location.data.displayCoordinate.latitude : location.data.yextDisplayCoordinate.latitude} longitude={location.data.displayCoordinate ? location.data.displayCoordinate.longitude : location.data.yextDisplayCoordinate.longitude} />
                    </div>
                  </div>
                </SplideSlide>
              </>

            )
          }
        }

        )
        }
      </Splide>
    </>
  )
}
