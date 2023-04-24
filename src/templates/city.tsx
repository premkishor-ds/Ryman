import * as React from "react";
// import Banner from "../components/banner";
import GetDirection from "../components/commons/GetDirection";
import constant from "../constant";
// import { stagingBaseUrl } from "../constants";
// import bannerImage from "../images/banner.png"
import "../index.css";
var currentUrl = "";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import Banner from "../components/locationDetail/banner";
import { StaticData } from "../../sites-global/staticData";
import Phonesvg from "../images/phone.svg"
import mapimage from "../images/map.svg";
import { Addresssvg, favicon, regionNames, stagingBaseurl } from "../../sites-global/global";
import { JsonLd } from "react-schemaorg";
import Address from "../components/commons/Address";
import PageLayout from "../components/layouts/PageLayout";
import Availability from "../components/locationDetail/Availability";
import OpenClose from "../components/commons/openClose";
import timesvg from "../images/watch-icn.svg";
var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "matlan-city",
    filter: {
      entityTypes: ["ce_city"],
      savedFilterIds: ["dm_matalan-stores-directory_address_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_canonical",
      "c_meta_title",
      "c_banner_image",
      "c_bannerHeading",
      "c_meta_description",
      "dm_directoryParents.name",
      "dm_directoryParents.dm_directoryChildrenCount",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.c_open_for_shopping",
      "dm_directoryChildren.c_click_collect_availability",
      "dm_directoryChildren.c_parking_facilities",
      "dm_directoryChildren.c_fitting_rooms",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.geomodifier",
      "dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.yextDisplayCoordinate"
    ],
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var url: any = ""
  document.dm_directoryParents.map((i: any) => {
    if (i.meta.entityType.id == 'ce_country') {
      url = `${i.slug}`
    }
    else if (i.meta.entityType.id == 'ce_region') {
      url = `${url}/${i.slug}/${document.slug.toString()}.html`
    }
  })
  return url;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {


  var canonical="";
  document.dm_directoryChildren.map((entity: any) => {
    canonical= entity.address.countryCode.toLowerCase().replaceAll(" ", "-") + '/' +  entity.address.region.toLowerCase().replaceAll(" ", "-")
    })

  return {
    title:`${document.c_meta_title?document.c_meta_title:`Ryman Stores in ${document.name} | Find a Local Store`}`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
      tags: [
        {
          type: "meta",
          attributes: {
            name: "description",
            content: `${document.c_meta_description?document.c_meta_description:`Use this page to find your nearest Ryman store in ${document.name} and discover the location details you need to visit us today.`}`,
          },
        },
        {
          type: "link",
          attributes: {
            rel: "shortcut icon",
            href: favicon,
          },
        },
        {
          type: "meta",
          attributes: {
            name: "author",
            content: "Ryman",
          },
        },

        {
          type: "meta",
          attributes: {
            name: "robots",
            content: "noindex, nofollow",
          },
        },

        {
          type: "link",
          attributes: {
            rel: "canonical",
            href: `${
              document.c_canonical 
                 ? document.c_canonical + "/" +canonical + "/"+ document.slug + ".html"
                 : 
                      stagingBaseurl 
                         ? stagingBaseurl + canonical + "/"+ document.slug + ".html"
                         : "/" + document.slug + ".html"
            }`,
          },
        },
        // /og tags

        {
          type: "meta",
          attributes: {
            property: "og:url",
            content: `${
              document.c_canonical 
                 ? document.c_canonical + "/" +canonical + "/"+ document.slug + ".html"
                 : 
                      stagingBaseurl 
                         ? stagingBaseurl + canonical + "/"+ document.slug + ".html"
                         : "/" + document.slug + ".html"
            }`,
          },
        },
        {
          type: "meta",
          attributes: {
            property: "og:description",
            content: `${document.c_meta_description?document.c_meta_description:`Use this page to find your nearest Ryman store in ${document.name} and discover the location details you need to visit us today.`}`,
          },
        },
        {
          type: "meta",
          attributes: {
            property: "og:title",
            content: `${document.name}`,
          },
        },
        {
          type: "meta",
          attributes: {
            property: "og:image",
            content: favicon,
          },
        },

      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: `${
            document.c_canonical 
               ? document.c_canonical + "/" +canonical + "/"+ document.slug + ".html"
               : 
                    stagingBaseurl 
                       ? stagingBaseurl + canonical + "/"+ document.slug + ".html"
                       : "/" + document.slug + ".html"
          }`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content:`${document.c_meta_description?document.c_meta_description:`Use this page to find your nearest Ryman store in ${document.name} and discover the location details you need to visit us today.`}`
        },
      },
    ],
  };
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    dm_directoryParents,
    dm_directoryChildren,
    c_globalData,
    c_banner_image,
    c_bannerHeading,
    c_canonical,
    c_metaDescription,
    c_metaTitle,
    _site,
  } = document;
  var address;
  var c_companyrn;
  var c_footerLinks;
  var c_headerLinks1;
  var c_phoneNumber;
  var facebookPageUrl;
  var instagramHandle;
  var twitterHandle;
  var c_tikTok;
  var sortedChildren = dm_directoryChildren.sort(function (a: any, b: any) {
    var a = a.name;
    var b = b.name;
    return a < b ? -1 : a > b ? 1 : 0;
  });

  let slugString = "";
  document.dm_directoryParents.forEach((e: any) => {
    slugString += e.slug + "/";
  });

  const childrenDivs = dm_directoryChildren.map((entity: any) => {
    var origin: any = null;
    if (entity.address.city) {
      origin = entity.address.city;
    } else if (entity.address.region) {
      origin = entity.address.region;
    } else {
      origin = entity.address.country;
    }
    // let key: any = Object.keys(entity.hours)[0];
    var url = "";
    var name: any = entity.geomodifier.toLowerCase();
    var region: any = entity.address.region.toLowerCase();
    var initialregion: any = region.toString();
    var finalregion: any = initialregion.replaceAll(" ", "-");
    var city: any = entity.address.city.toLowerCase();
    var initialrcity: any = city.toString();
    var finalcity: any = initialrcity.replaceAll(" ", "-");
    var string: any = name.toString();;
    let result: any = string.replaceAll(" ", "-");
    if (!entity.slug) {
      url = `/${entity.id}-${result}.html`;
    } else {
      url = `/${entity.slug.toString()}.html`;
    }



    return (

      <div className="c_location">
        <div className=" city-location">
          <div className="location-name-miles icon-row">
          <div className="icon"> <img className=" " src={mapimage} width="20" height="20"
                        alt="" /></div>
            <h2><a className="inline-block notHighlight" href={url}>{entity.geomodifier}</a></h2>
          </div>
          <div className="icon-row">
            <Address address={entity.address} />
          </div>
          {entity.mainPhone?
          <div className="icon-row">
             <div className="icon">
             <img className=" " src={Phonesvg} width="20" height="20"
                          alt="" />
                          </div>
            <div className="content-col">
              <h6>Telephone</h6>
              <a href={`tel:${entity.mainPhone}`}>{entity.mainPhone}</a>
            </div>
          </div>:''}
          {entity.hours?
          <div className="icon-row">
            <div className="icon"> <img className=" " src={timesvg} width="20" height="20" alt="" /> </div>
            <div className="content-col open-now-string">
             
              {typeof entity.hours?.reopenDate!="undefined"?
              <h6>{StaticData.tempClosed}</h6>
            :entity.hours?<> <h6>Opening Hours</h6><OpenClose timezone={entity.timezone} hours={entity.hours} deliveryHours={entity.hours}></OpenClose></>:''}
             
              {/* <div dangerouslySetInnerHTML={{ __html: Openclose }} /> */}
            </div>
          </div>:''}
          <div className="icon-row content-col availability-col">

            {/* <Availability c_openForShoppingAvailibility={entity.c_open_for_shopping}
             c_clickCollectAvaliability={entity.c_click_collect_availability}
             c_parking_facilities={entity.c_parking_facilities} c_fitting_rooms={entity.c_fitting_rooms}
              hours={entity.hours} /> */}
          </div>



          <div className="button-bx">
            <a className="btn" href={url}>

              View Store Detail</a>
            <GetDirection buttonText="Direction" address={entity.address} latitude={entity.yextDisplayCoordinate.latitude} longitude={entity.yextDisplayCoordinate.longitude} />
          </div>
        </div>
      </div>
    );
  });
  function getDirectionUrl(entitiy: any) {
    var origin: any = null;
    if (entitiy.address.city) {
      origin = entitiy.address.city;
    } else if (entitiy.address.region) {
      origin = entitiy.address.region;
    } else {
      origin = entitiy.address.country;
    }
    if (navigator.geoentity) {
      const error = (error: any) => {
        var message_string =
          "Unable to determine your entity. please share your entity";
        // if (confirm(message_string) != true) {
        //   var getDirectionUrl =
        //     "https://www.google.com/maps/dir/?api=1&destination=" +
        //     entitiy.yextDisplayCoordinate.latitude +
        //     "," +
        //     entitiy.yextDisplayCoordinate.longitude +
        //     "&origin=" +
        //     origin;

        //   window.open(getDirectionUrl, "_blank");
        // } else {
        //   return false;
        // }
        var getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          entitiy.yextDisplayCoordinate.latitude +
          "," +
          entitiy.yextDisplayCoordinate.longitude +
          "&origin=" +
          origin;

        window.open(getDirectionUrl, "_blank");
      };
      navigator.geoentity.getCurrentPosition(
        function (position: any) {
          let currentLatitude = position.coords.latitude;
          let currentLongitude = position.coords.longitude;
          let getDirectionUrl =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            entitiy.yextDisplayCoordinate.latitude +
            "," +
            entitiy.yextDisplayCoordinate.longitude +
            "&origin=" +
            currentLatitude +
            "," +
            currentLongitude;
          window.open(getDirectionUrl, "_blank");
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  }
  c_globalData &&
    c_globalData.map((i: any) => {
      address = i.address ? i.address : [];
      c_companyrn = i.c_companyrn ? i.c_companyrn : "";
      c_footerLinks = i.c_footerLinks ? i.c_footerLinks : [];
      c_headerLinks1 = i.c_headerLinks1 ? i.c_headerLinks1 : [];
      c_phoneNumber = i.phoneNumber ? i.phoneNumber : "";
      facebookPageUrl = i.facebookPageUrl ? i.facebookPageUrl : "";
      instagramHandle = i.instagramHandle ? i.instagramHandle : "";
      twitterHandle = i.twitterHandle ? i.twitterHandle : "";
      c_tikTok = i.c_tikTok ? i.c_tikTok : "";
    });

  var url: any = ""

  document.dm_directoryParents.map((i: any) => {
    if (i.meta.entityType.id == 'ce_country') {
      url = `${i.slug}`
    }
    else if (i.meta.entityType.id == 'ce_region') {
      url = `${url}/${i.slug}/${document.slug.toString()}.html`
    }
  })
  let breadcrumbScheme: any = [];
  let currentIndex: any = 0;
  dm_directoryParents &&
    dm_directoryParents.map((i: any, index: any) => {
      currentIndex = index;
      if (index != 0) {
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id": `${constant.stagingBaseurl}${i.slug}`,
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: currentIndex + 1,
    item: {
      "@id": `${constant.stagingBaseurl}/${document.slug.toString()}.html`,
      name: document.name,
    },
  });
  let bannerimage = c_banner_image && c_banner_image.image.url;
  return (
    <>
         <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ryman",
          url: "https://www.rymanbusiness.com/",
          logo: "https://eu.evocdn.io/dealer/1411/content/media/My_Theme/ry-foot-logo.png",
          address: {
            "@type": "PostalAddress",
            // streetAddress: address.line1,
            // addressLocality: address.city,
            // addressRegion: address.region,
            // postalCode: address.postalCode,
            addressCountry: "United Kingdom",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "contact",
            telephone: "0333 103 0933",
            email: "https://www.rymanbusiness.com/contact-us"
          },
          sameAs: [
            "https://www.facebook.com/rymanbusiness/",
            "https://twitter.com/RymanBusiness",
            "https://www.linkedin.com/company/rymanbusiness",
            "https://www.instagram.com/rymanbusiness/"
           
          ],
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />
      <PageLayout global={_site}>
        <BreadCrumbs
          name={name}
          address={address}
          parents={dm_directoryParents}
          baseUrl={relativePrefixToRoot}
        ></BreadCrumbs>
           <Banner name={c_bannerHeading?c_bannerHeading:name} c_bannerImage={bannerimage} />

        <div className="content-list city-page">
          <div className="container mx-auto">
            <div className="sec-title">
              <h2>
              Ryman Stores in  {name}
              </h2>
            </div>
            <div className="flex flex-wrap justify-center items-start -mx-2.5 lg:-mx-[.9375rem]">
              {childrenDivs}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};
export default City;