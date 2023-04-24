import * as React from "react";

function Availibilityservices(props:any){
    return(

        <div className="opennow-sec">
                    <div className="icons"><img className=" " src={props.icon} width="20" height="20" alt="" />  </div>
                    {props.text}
                </div>
                    )

}
export default Availibilityservices;



