import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "../../types/search/locations";
import Hours from "../commons/hours";
import GetDirection from "../commons/GetDirection";
import Opening from "../commons/openClose";
import mapimage from "../../images/map.svg";
import Phonesvg from "../../images/phone.svg"
import timesvg from "../../images/watch-icn.svg"
import Address from "../commons/Address";
import OpenClose from "../commons/openClose";
import opennow from "../../images/open.svg"
import clickn from "../../images/clickn.svg"
import { Matalan_marker, Openclose, View_Store } from "../../../sites-global/global";
import { StaticData } from "../../../sites-global/staticData";
import Availability from "../locationDetail/Availability";
import { SvgIcon } from "@mui/material";
import { svgIcons } from "../../types/svgicon";

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
}
let array = [];



const LocationCard: CardComponent<Location> = ({ result }) => {
  const { address } = result.rawData;
  let url = "";
  const[hoursopen,setHoursopen]=React.useState(false);
  var name: any = result.rawData.geomodifier?.toLowerCase();
  var region: any = result.rawData.address.region?.toLowerCase();
  var initialregion: any = region.toString();
  var finalregion: any = initialregion.replaceAll(" ", "-");
  var city: any = result.rawData.address.city?.toLowerCase();
  var initialrcity: any = city.toString();
  var finalcity: any = initialrcity.replaceAll(" ", "-");
  var string: any = name.toString();
  let result1: any = string.replaceAll(" ", "-");
 if (!result.rawData.slug) {
   url= `/${result.rawData.id}-${result1}.html`;
 } else {
   url= `/${result.rawData.slug.toString()}.html`;
 }
 function opentime(e: any) {
  var closethis = e.target.closest(".lp-param-results");
  if (closethis.querySelector('.storelocation-openCloseTime').classList.contains("hidden")) {
    closethis.querySelector('.storelocation-openCloseTime').classList.remove("hidden")
    setHoursopen(true);
  }
  else {
    closethis.querySelector('.storelocation-openCloseTime').classList.add("hidden")
    setHoursopen(false);
  }
}

  return (
    <div className={`location result-list-inner-${result.index} result`} id={`result-${result.index}`}>
      <div className="result-inner ">
        <div className="center-column">
          <div className="lp-param-results lp-subparam-hours">
            <div className="location-name-miles icon-row">
              <div className="icon"> <img className=" " src={mapimage} width="20" height="20"
                alt="" /></div>
              <h2><a className="inline-block notHighlight" href={url}>{result.rawData.geomodifier}</a></h2>
              {typeof result.distance != "undefined" ?
                <div className="distance">
                  {metersToMiles(result.distance)} <span>{StaticData.miles}</span>
                </div>
                : ''}
            </div>
            <div className="icon-row content-col address-with-availablity notHighlight">
              <Address address={address} />
              <div className="availablity-content">
                <Availability c_openForShoppingAvailibility={result.rawData.c_open_for_shopping} 
                c_clickCollectAvaliability={result.rawData.c_click_collect_availability}
                c_parking_facilities={result.rawData.c_parking_facilities} c_fitting_rooms={result.rawData.c_fitting_rooms}
                 hours={result.rawData.hours} />
              </div>
            </div>
             {result.rawData.mainPhone?
            <div className="icon-row">
              <div className="icon"> <img className=" " src={Phonesvg} width="20" height="20" alt="" />
              </div>
              <div className="content-col">
                <h6>Telephone</h6>
                <a id="address" className="notHighlight" href={`tel:${result.rawData.mainPhone}`}>
                  {result.rawData.mainPhone}</a>
              </div>
            </div>:""}
            {result.rawData.hours ? <>
              <div className="icon-row">
              <h6>Opening Hours</h6>
                {result.rawData.hours?.reopenDate ? <>
                  <div className="icon"> <img className=" " src={timesvg} width="20" height="20" alt="" /> </div>
                  <div className="cursor-pointer flex open-now-string items-center " data-id={`main-shop-${result.rawData.id}`} onClick={opentime}>
                    {StaticData.tempClosed}
                  </div>
                </>
                  : <> <div className="icon"> <img className=" " src={timesvg} width="20" height="20" alt="" /> </div>
                    <div className=" cursor-pointer  flex open-now-string items-center " data-id={`main-shop-${result.rawData.id}`} onClick={opentime}>
                      <OpenClose timezone={result.rawData.timezone} hours={result.rawData.hours} deliveryHours={result.rawData.hours}></OpenClose>
                      <div dangerouslySetInnerHTML={{ __html: Openclose }} />
                    </div></>}


                <div className={`storelocation-openCloseTime  capitalize hidden`}>
                    {hoursopen?
                   typeof result.rawData.hours === "undefined" ? ("") :
                     <Hours key={result.rawData.name} additionalHoursText={result.rawData.additionalHoursText} hours={result.rawData.hours} c_specific_day={result.rawData.c_specific_day} />
                   :''}
                </div>
              </div></> : ''}

            <div className="button-bx">
            {result.rawData.displayCoordinate ?
                <GetDirection buttonText={StaticData.getDirection} address={address} latitude={result.rawData.displayCoordinate?.latitude} longitude={result.rawData.displayCoordinate?.longitude} />
                : <GetDirection buttonText={StaticData.getDirection} address={address} latitude={result.rawData.yextDisplayCoordinate?.latitude} longitude={result.rawData.yextDisplayCoordinate?.longitude} />}
              <a type="button bg-red text-white" href={url} className=" btn notHighlight ">
                {/* <div dangerouslySetInnerHTML={{__html: View_Store}}/> */}
                {svgIcons.storeview}STORE DETAIL
              </a>
            
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}

export default LocationCard;