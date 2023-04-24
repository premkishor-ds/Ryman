import * as React from "react";
import opennow from "../../images/open.svg";
import Fiiting_rooms from "../../images/open.svg";
import Parking from "../../images/open.svg";
import Availibilityclosed from "../../images/Availibilityclosed.svg";
import Availibilityservices from "./Availibilityservices";
export default function Availability(props: any) {
    var today: any = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
 
    return (
        <>
            {typeof props.c_openForShoppingAvailibility != "undefined" ? props.c_openForShoppingAvailibility.date.map((res: any, index: Number) => {
                var from = Date.parse(res.startDate);
                var to = Date.parse(res.endDate);
                var check = Date.parse(today);
                var text = "";
                if ((check <= to && check >= from)) {
                    if (props.hours && !props.hours?.reopenDate) {
                        if (props.c_openForShoppingAvailibility.availability) {
                            return (
                                <>
                                <Availibilityservices icon={opennow} text={props.c_openForShoppingAvailibility.text}  />
                                </>
                            );
                        } else {
                            return (
                                <>
                                 <Availibilityservices icon={Availibilityclosed} text={props.c_openForShoppingAvailibility.text}  />
                                </>
                            );
                        }
                    }
                    else {
                        return (
                            <>
                            <Availibilityservices icon={opennow} text="Open for Shopping"  />
                            </>
                        )
                    }
                }
                else {
                    return (
                        <>
                        <Availibilityservices icon={opennow} text="Open for Shopping"  />
                        </>
                    )
                }
            }
            ) : props.hours && !props.hours?.reopenDate ? <>
              <Availibilityservices icon={opennow} text="Open for Shopping"  />
            </> : <>
            <Availibilityservices icon={opennow} text="Open for Shopping"  />
            </>
            }
                  {typeof props.c_clickCollectAvaliability != "undefined" ? props.c_clickCollectAvaliability?.date?.map((res: any, index: Number) => {
                var from = Date.parse(res.startDate);
                var to = Date.parse(res.endDate);
                var check = Date.parse(today);
                var text = "";
                if ((check <= to && check >= from)) {
                    if (!props.hours?.reopenDate) {
                        if (props.c_clickCollectAvaliability.availability) {
                            return (
                                <>
                                  <Availibilityservices icon={opennow} text= {props.c_clickCollectAvaliability.text}  />
                                </>
                            );
                        } else {
                            return (
                                <>
                                 <Availibilityservices icon={Availibilityclosed} text= {props.c_clickCollectAvaliability.text}  />
                                </>
                            );
                        }
                    }
                    else {
                        return (
                            <>
                            <Availibilityservices icon={opennow} text="Click & Collect available"  />
                            </>
                        )
                    }
                }
                else {
                    return (
                        <>
                             <Availibilityservices icon={opennow} text="Click & Collect available"  />
                        </>
                    )
                }
            }
            ) : props.hours && !props.hours?.reopenDate ? <>
               <Availibilityservices icon={opennow} text="Click & Collect available"  />
            </> : <>
            <Availibilityservices icon={opennow} text="Click & Collect available"  />
            </>
            }
               {typeof props.c_fitting_rooms != "undefined" ? props.c_fitting_rooms?.date?.map((res: any, index: Number) => {
                var from = Date.parse(res.startDate);
                var to = Date.parse(res.endDate);
                var check = Date.parse(today);
                var text = "";
                if ((check <= to && check >= from)) {
                    if (!props.hours?.reopenDate) {
                        if (props.c_fitting_rooms.availability) {
                            return (
                                <>
                                <Availibilityservices icon={Fiiting_rooms} text={props.c_fitting_rooms.text}  />
                                </>
                            );
                        } else {
                            return (
                                <>
                                <Availibilityservices icon={Availibilityclosed} text={props.c_fitting_rooms.text}  />
                                </>
                            );
                        }
                    }
                    else {
                        return (
                            <>
                                <div className="opennow-sec">
                                    <div className="icons"><img className=" " src={Fiiting_rooms} width="20" height="20" alt="" />  </div>
                                    Fitting Rooms
                                </div>

                            </>
                        )
                    }
                }
                else {
                    return (
                        <>
                            <div className="opennow-sec">
                                <div className="icons"><img className=" " src={Fiiting_rooms} width="20" height="20" alt="" />  </div>
                                Fitting Rooms
                            </div>
                        </>
                    )
                }
            }
            ) : props.hours && !props.hours?.reopenDate ? <>
                <Availibilityservices icon={Fiiting_rooms} text="Fitting Rooms"  />
            </> : <>
            <Availibilityservices icon={Fiiting_rooms} text="Fitting Rooms"  />
            </>
            }
               {typeof props.c_parking_facilities != "undefined" ? props.c_parking_facilities?.date?.map((res: any, index: Number) => {
                var from = Date.parse(res.startDate);
                var to = Date.parse(res.endDate);
                var check = Date.parse(today);
                if ((check <= to && check >= from)) {
                    if (!props.hours?.reopenDate) {
                        if (props.c_parking_facilities.availability) {
                            return (
                                <>
                                <Availibilityservices icon={Parking} text={props.c_parking_facilities.text}  />
                                </>
                            );
                        } else {
                            return (
                                <>
                                 <Availibilityservices icon={Availibilityclosed} text={props.c_parking_facilities.text}  />
                                </>
                            );
                        }
                    }
                    else {
                        return (
                            <>
                                 <Availibilityservices icon={Parking} text="Parking Facilities"  />

                            </>
                        )
                    }
                }
                else {
                    return (
                        <>
                           <Availibilityservices icon={Parking} text="Parking Facilities"  />
                        </>
                    )
                }
            }
            ) : props.hours && !props.hours?.reopenDate ? <>
            <Availibilityservices icon={Parking} text="Parking Facilities"  />
            </> : <>
            <Availibilityservices icon={Parking} text="Parking Facilities"  />
            </>
            }
            
        </>
    )

}