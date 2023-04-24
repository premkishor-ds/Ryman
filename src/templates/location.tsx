import * as React from "react";
import Banner from "../components/locationDetail/banner";
import Cta from "../components/commons/cta";
import Contact from "../components/locationDetail/contact";
import ApiCall from "../Apis/ApiCall";
import Nearby from "../components/locationDetail/Nearby";
import { CustomFieldDebuggerReactProvider } from '@yext/custom-field-debugger';
import { JsonLd } from "react-schemaorg";
import Opening from "../components/commons/openClose";
import { nearByLocation } from "../types/nearByLocation";
import Logo from "../images/logo-header.svg"
import offerBanner from "../images/offer-banner.jpg"
import IframeMap from "../components/locationDetail/IframeMap";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  TransformProps,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/layouts/PageLayout";
import { fetch } from "@yext/pages/util";
import Nav from "../components/layouts/Nav";
import Footer from "../components/layouts/footer";
import Menu from "../components/locationDetail/Menu";
import PhotoSlider from "../components/locationDetail/PhotoSlider";
import PhotoGallery from "../components/locationDetail/PhotoGallery";
import About from "../components/locationDetail/About";
import Breadcrumb from "../components/layouts/Breadcrumb";
import CustomMap from "../components/locationDetail/CustomMap";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import StoreHighlight from "../components/locationDetail/SoreHighlight";
import OpenClose from "../components/commons/openClose";
import Faq from "../components/locationDetail/Faqs";
import { StaticData } from "../../sites-global/staticData";
import { AnswerExperienceConfig, apiKey, apikey_for_entity, baseuRL, experienceKey, stagingBaseurl, verticalKey, AnalyticsEnableDebugging, AnalyticsEnableTrackingCookie, favicon } from "../../sites-global/global";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import Offersection from "../components/commons/Offersection";
import Services from "../components/locationDetail/Services";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "photoGallery",
      "description",
      "c_canonical",
      "c_meta_title",
      "c_meta_description",
      "c_about_us_image",
      "c_about_us_heading",
      "c_about_us_description",
      "c_viewMore",
      "c_store_highlights",
      "dm_directoryParents.name",
      "dm_directoryParents.dm_directoryChildrenCount",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "c_banner_image",
      "additionalHoursText",
      "hours",
      "c_specific_day",
      "slug",
      "timezone",
      "c_related_FAQs.question",
      "c_related_FAQs.answer",
      "c_viewMoreFAQs",
      "yextDisplayCoordinate",
      "displayCoordinate",
      "cityCoordinate",
      "services",
      "c_click_collect_availability",
      "c_open_for_shopping",
      "c_parking_facilities",
      "c_fitting_rooms",
      "c_offerGallery",
      "c_offersection",
      "c_photoGallery",
      "geomodifier",
      "c_ourService1",
      "c_servicesAvailable",
      "c_storeDescription"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      savedFilterIds: ["1249533762"],

    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var url = "";
  var name: any = document.geomodifier.toLowerCase();
  var string: any = name.toString();;
  let result: any = string.replaceAll(" ", "-");
  // document.dm_directoryParents.map((result: any, i: Number) => {
  //   if (i > 0) {
  //     url += result.slug + "/"
  //   }
  // })
  if (!document.slug) {
    url += `${document.id}-${result}.html`;
  } else {
    url += `${document.slug.toString()}.html`;
  }

  return url;
};
/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.c_meta_title ? document.c_meta_title : ` Ryman ${document.geomodifier} Store -  | Office Supplies | Businesses, Offices, & Schools`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${document.c_meta_description ? document.c_meta_description : `Visit Ryman ${document.geomodifier}Buy office supplies in the UK for your business, office, school, or small business. Our range has everything from stationery to furniture at great prices with a service you can trust`}`,
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
          href: `${document._site.c_canonical ? document.c_canonical : stagingBaseurl

            }${document.slug ? document.slug : `${document.id}-${document.geomodifier.toLowerCase()}`}.html`,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${document.c_meta_description ? document.c_meta_description : `Visit Ryman ${document.geomodifier}Buy office supplies in the UK for your business, office, school, or small business. Our range has everything from stationery to furniture at great prices with a service you can trust`}`,
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
          property: "og:title",
          content: document.c_meta_title ? document.c_meta_title : ` Ryman ${document.geomodifier} Store -  | Office Supplies | Businesses, Offices, & Schools`,
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
          content: `${document._site.c_canonical ? document.c_canonical : stagingBaseurl

            }${document.slug ? document.slug : `${document.id}-${document.geomodifier.toLowerCase()}`}.html`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${document.c_meta_description ? document.c_meta_description : `Visit Ryman ${document.geomodifier}Buy office supplies in the UK for your business, office, school, or small business. Our range has everything from stationery to furniture at great prices with a service you can trust`}`,
        },
      },
      /// twitter tag






    ],

  };
};
type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {

  var location = `${data.document.yextDisplayCoordinate ? data.document.yextDisplayCoordinate.latitude : data.document.displayCoordinate.latitude},${data.document.yextDisplayCoordinate ? data.document.yextDisplayCoordinate.longitude : data.document.displayCoordinate.longitude}`;
  const url = `${AnswerExperienceConfig.endpoints.verticalSearch}?experienceKey=${experienceKey}&api_key=${apiKey}&v=20220511&version=${AnswerExperienceConfig.experienceVersion}&locale=${AnswerExperienceConfig.locale}&location=${location}&locationRadius=${AnswerExperienceConfig.locationRadius}&verticalKey=${verticalKey}&limit=4&retrieveFacets=true&skipSpellCheck=false&sessionTrackingEnabled=true&source=STANDARD`;

  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()

  )) as nearByLocation;
  return { ...data, externalApiData };
};



type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};

const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
  externalApiData,
}) => {
  const {
    _site,
    id,
    name,
    address,
    openTime,
    slug,
    hours,
    c_specific_day,
    mainPhone,
    photoGallery,
    c_banner_image,
    c_canonical,
    c_meta_title,
    c_meta_description,
    description,
    c_about_us_image,
    c_about_us_heading,
    c_about_us_description,
    dm_directoryParents,
    c_store_highlights,
    additionalHoursText,
    c_related_FAQs,
    c_storeHighlightInfo,
    c_click_collect,
    c_clickCollectCta,
    c_viewMore,
    c_viewMoreFAQs,
    timezone,
    yextDisplayCoordinate,
    displayCoordinate,
    cityCoordinate,
    c_click_collect_availability,
    c_open_for_shopping,
    c_offerGallery,
    geomodifier,
    c_parking_facilities,
    c_fitting_rooms,
    c_photoGallery,
    c_offersection,
    c_ourService1,
    c_servicesAvailable,
    c_storeDescription

  } = document;

  let templateData = { document: document, __meta: __meta };
  let hoursSchema = [];
  let breadcrumbScheme = [];
  for (var key in hours) {
    if (hours.hasOwnProperty(key)) {
      let openIntervalsSchema = "";
      if (key !== "holidayHours") {
        if (hours[key].isClosed) {
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: key,
          };
        } else {
          let end = "";
          let start = "";
          if (typeof hours[key].openIntervals != "undefined") {
            let openIntervals = hours[key].openIntervals;
            for (var o in openIntervals) {
              if (openIntervals.hasOwnProperty(o)) {
                end = openIntervals[o].end;
                start = openIntervals[o].start;
              }
            }
          }
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            closes: end,
            dayOfWeek: key,
            opens: start,
          };
        }
      } else {
      }

      hoursSchema.push(openIntervalsSchema);
    }
  }
  document.dm_directoryParents &&
    document.dm_directoryParents.map((i: any, index: any) => {
      if (i.meta.entityType.id == "ce_country") {
        document.dm_directoryParents[index].name =
          document.dm_directoryParents[index].name;
        document.dm_directoryParents[index].slug =
          document.dm_directoryParents[index].slug;

        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +

              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      } else if (i.meta.entityType.id == "ce_region") {
        let url = "";
        document.dm_directoryParents.map((j: any) => {
          if (
            j.meta.entityType.id != "ce_region" &&
            j.meta.entityType.id != "ce_city" &&
            j.meta.entityType.id != "ce_root"
          ) {

            url = url + j.slug;
          }
        });
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              url + "/" +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      } else if (i.meta.entityType.id == "ce_city") {
        let url = "";
        document.dm_directoryParents.map((j: any) => {
          if (
            j.meta.entityType.id != "ce_city" &&
            j.meta.entityType.id != "ce_root"
          ) {

            url = url + "/" + j.slug;
          }
        });
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              url + "/" +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 4,
    item: {
      "@id": stagingBaseurl + path,
      name: document.name,
    },
  });
  let imageurl = photoGallery ? photoGallery.map((element: any) => {
    return element.image.url
  }) : null;

  let bannerimage = c_banner_image && c_banner_image.image.url;


  return (

    <>

      <JsonLd<Storage>
        item={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Ryman",
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          openingHoursSpecification: hoursSchema,
          description: description,
          telephone: mainPhone,
          url: `${c_canonical ? c_canonical : stagingBaseurl}${slug ? slug : `${id}-${geomodifier}`}.html`
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />
      {c_related_FAQs ? (
        <>
          <JsonLd<FAQPage>
            item={{
              "@context": "https://schema.org",
              "@type": "FAQPage",

              mainEntity:
                c_related_FAQs &&
                c_related_FAQs.map((i: any) => {
                  return {
                    "@type": "Question",
                    name: i.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `<p>${i.answer}</p>`,
                    },
                  };
                }),
            }}
          />
        </>
      ) : (
        <></>
      )}


      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
          <PageLayout global={_site}>

            <BreadCrumbs
              name={geomodifier}
              parents={dm_directoryParents}
              baseUrl={relativePrefixToRoot} address={undefined}     ></BreadCrumbs>

            <Banner name={`${geomodifier}`} hours={hours} timezone={timezone} clickcollect={c_click_collect} c_bannerImage={bannerimage} />
            <div className="location-information">
              <Contact address={address} c_openForShoppingAvailibility={c_open_for_shopping} c_clickCollectAvaliability={c_click_collect_availability}
                c_parking_facilities={c_parking_facilities} c_fitting_rooms={c_fitting_rooms}
                c_clickCollectCta={c_clickCollectCta} phone={mainPhone} latitude={yextDisplayCoordinate ? yextDisplayCoordinate.latitude : displayCoordinate?.latitude}
                longitude={yextDisplayCoordinate ? yextDisplayCoordinate.longitude : displayCoordinate?.longitude} hours={hours} c_specific_day={c_specific_day} additionalHoursText={additionalHoursText} ></Contact>
              {
                hours ?
                  <div className="map-sec" id="map_canvas">
                    <CustomMap prop={yextDisplayCoordinate ? yextDisplayCoordinate : displayCoordinate} />
                  </div> :
                  <div className="map-sec without-hours" id="map_canvas">
                    <CustomMap prop={yextDisplayCoordinate ? yextDisplayCoordinate : displayCoordinate} />
                  </div>
              }
            </div>
            {/* {c_offerGallery?
        <div className="offerBanner">
          <div className="container">
            {c_offerGallery.map((offer:any)=>{
            return(
              <>
               <img src={offer.image.url} alt="offer" />
              </>
            )
            })}
           
          </div>
        </div>:''} */}







            {c_about_us_description && c_about_us_heading ?
              <About name={c_about_us_heading} c_viewMore={c_viewMore} photoGallery={c_about_us_image} description={c_about_us_description} />
              : ''}


            {c_store_highlights ?
              <div className="services-sec">
                <StoreHighlight c_storeHighlightInfo={c_store_highlights} name={name} />
              </div>
              : ''}
            {/* <div className="gallery-sec">
               <PhotoSlider1 photos={c_photoGallery}/>
               </div> */}
            <div className="faq-sec">
              {c_related_FAQs ? (
                <>
                  <Faq faqs={c_related_FAQs} c_viewMoreFAQs={c_viewMoreFAQs} />
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="gallery-sec">
              <PhotoGallery photos={c_photoGallery} />
            </div>
            {/* services */}
            <Services c_ourService1={c_ourService1} c_servicesAvailable={c_servicesAvailable}/>

            <div className="nearby-sec">
              <div className="container">
                <div className="sec-title"><h2 className="">{StaticData.NearStoretext}</h2></div>
                <div className="nearby-sec-inner">
                  {yextDisplayCoordinate || cityCoordinate || displayCoordinate ?
                    <Nearby externalApiData={externalApiData} /> : ''}
                </div>
              </div>
              <div className="content-center w-full text-center ">
                <a href="/" className="button-red"> {StaticData.AllLocationtext}</a>
              </div>
            </div>

          </PageLayout>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Location;