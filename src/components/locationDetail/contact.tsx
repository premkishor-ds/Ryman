import * as React from "react";
import Cta from "../commons/cta";
import Hours from "../commons/hours";
import woodtexture from "../../images/wood-texture.jpg";
import mapimage from "../../images/map.svg";
import Phonesvg from "../../images/phone.svg"
import  Address  from "../commons/Address";
import GetDirection from "../commons/GetDirection";
import { StaticData } from "../../../sites-global/staticData";
import Availability from "./Availability";
import Holidayhours from "./Holdayhours";
import Model from "./Model";

const Contact = (props: any) => {
  const { address, phone,latitude,longitude,hours,c_specific_day,additionalHoursText,c_openForShoppingAvailibility,c_clickCollectAvaliability,c_parking_facilities,c_fitting_rooms } = props;
  return (
    <>
    
    <div className='address-main-sec'>

        <h4 className="box-title">Store Info</h4>

        <div className="icon-row content-col">
        <div className="icon"> <img className=" " src={mapimage} width="20" height="20"
                alt="" /></div>
        <h6>{StaticData.Address}</h6>
          <Address address={address} />
        </div>

  
  {phone ?
          <div className="icon-row">
            <div className="icon"> <img className=" " src={Phonesvg} width="22" height="22" alt="" /></div>
            <div className="content-col">
              <h6>{StaticData.Telephone}</h6>
              <a id="address" className="" href={`tel:${phone}`}>
                {phone}</a>
            </div>
          </div>

          : ''}
   
       <div className="icon-row content-col availability-col">
      <Availability c_openForShoppingAvailibility={c_openForShoppingAvailibility} 
      c_clickCollectAvaliability={c_clickCollectAvaliability} 
      c_parking_facilities={c_parking_facilities} c_fitting_rooms={c_fitting_rooms}
      hours={hours}/>
      </div>

      <ul className="">
        <li className="button-bx direction-button">
         <GetDirection buttonText="Direction" address={address} latitude={latitude} longitude={longitude}/>
        </li>
    
      </ul>      
  </div>
  {hours && typeof hours.monday!="undefined"?
                <div className="hours">
                  <div className="hours-sec">
                    
                    <div className="hours-div mb-5 md:mb-1 flex flex-col">
                    {hours.holidayHours&&!hours.reopenDate?<>
                             <Model name='Holiday hours' holidayHours={hours.holidayHours} c_specific_day={c_specific_day} />
        </>
        :''} 
                      {hours && 
                      <Hours title={"Store Hours"} additionalHoursText={additionalHoursText} hours={hours} c_specific_day={c_specific_day} />
                      
                      
                      }
                    </div>
                  </div>
                 
                </div>
                :''}
              
    </>
  );
};


export default Contact;
