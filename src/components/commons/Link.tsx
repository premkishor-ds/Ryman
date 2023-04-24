import * as React from "react";


const Link = (props: any) => {
return(<>
 {props.props.linkType=="URL"?
    
        <>
        <a href={props.props.link}>{props.props.label}</a>
        </>
    
        :(props.props.linkType=="OTHER")?
        
                <>
                  <a href={props.props.link} target="_blank">{props.props.label}</a>
                </>
            
        
        :(props.props.linkType=="PHONE")?
          
                <>
                 <a href={`tel:${props.props.link}`}>{props.props.label}</a>
                </>
                  
        :(props.props.linkType=="Email")?
          
                <>
                <a href={`mailto:${props.props.link}`}>{props.props.label}</a>
                </>
                :''
           
        
    }
    </>
)
}



export default Link;