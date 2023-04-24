import * as React from "react";
import { breadcrumbhome } from "../../../sites-global/global";
import { regionNames } from "../../../sites-global/global";
type data = {
  name: any;
  parents: any;
  baseUrl: any;
  address: any;
};

const BreadCrumbs = (props: data) => {

  const [list, setList] = React.useState(null);
 var breadcrumbs;
  var data: any = [];
  React.useEffect(() => {
    setURL(props.parents, props.baseUrl);
  }, [setList]);

  const setURL = (parents: any, baseUrl: any) => {


    if (parents) {
      for (let i = 0; i < parents.length; i++) {

           
       if (parents[i].meta.entityType.id == "ce_country") {
          // parents[i].name = regionNames.of(parents[i].name);
 
          parents[i].slug = parents[i].slug;
          
          data.push({
            name: regionNames.of(parents[i].name),
            slug: parents[i].slug,
            count:parents[i].dm_directoryChildrenCount
          });

        } 
        else if (parents[i].meta.entityType.id == "ce_region") {
      
          data.push({ name: parents[i].name, slug:`${parents[i-1].slug}/${parents[i].slug}`, 
          count:parents[i].dm_directoryChildrenCount});
          parents[i].name = parents[i].name;
          parents[i].slug = `${parents[i-1].slug}/${parents[i].slug}`;
        } else if (parents[i].meta.entityType.id == "ce_city") {
       
          parents[i].name = parents[i].name;
          parents[i].slug = `${parents[i - 1].slug}/${parents[i].slug}`;
          data.push({
            name: parents[i].name,
            slug: parents[i].slug,
            count:parents[i].dm_directoryChildrenCount
          });
        }
      }


      breadcrumbs = data.map((crumb: any) => (
        <li key={crumb.slug}>
          {(crumb.count==1)?<a href="javascript:void(0)" className="cursor-not-allowed"> {crumb.name}</a>
          :<a href={baseUrl + crumb.slug + ".html"}> {crumb.name}</a>}
          
        </li> 
      ));
      setList(breadcrumbs);
    } else {
      setList(null);
    }
  };
  return (
    <div className="breadcrumb">
      <div className="container mx-auto">
        <ul className="flex">
          <li>
            <a className="home" href="/">
            <div dangerouslySetInnerHTML={{__html: breadcrumbhome}}/>
            </a>
          </li>
          {/* <li>
            <a href="https://main-sushi--issue--quotation-sbx-pgsdemo-com.sbx.preview.pagescdn.com/">Store Locator</a>
          </li> */}
          {list ? (
            list
          ) : (
            <>
              {props.address && props.address.city ? (
                <li className="inline-block">
                  {" "}
                  <a href={props.baseUrl + props.address.city }>
                    {props.address.city ? props.address.city : ""}
                  </a>
                </li>
              ) : (
                <></>
              )}
            </>
          )}
         
          <li>{props && props.name}</li>

        </ul>
      </div>
    </div>
  );
};
export default BreadCrumbs;