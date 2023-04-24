// src/template/404.tsx
import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  GetPath,
  Template,
  TemplateConfig,
} from "@yext/pages";
import * as React from "react";
import { StaticData } from "../../sites-global/staticData";
import PageLayout from "../components/layouts/PageLayout";
export const config: TemplateConfig = {
  stream: {
    $id: "404",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "name",
      "c_canonical",
      "c_meta_title",
      "c_meta_description",
      "c_locatorBannerImage",
      "c_locatorTitleH1",
      "c_locator_description",
      "c_matalan_header_logo",
      "c_header_links",
      "c_footerDescription",
      "c_customer_services",
      "c_about_matalan",
      "c_our_website",
      "c_socialIcons",
      "c_appSectionText",
      "c_app_icon",
      "c_matalan_footer_logo",
      "c_fAQs",
      "c_store_finder",
      "richTextDescription",
      "c_top_header_links"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["global-data"]
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

// The path must be exactly 404.html
export const getPath: GetPath<TemplateProps> = () => {
  return "404.html";
};

// Add a title to the page
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "Page Not Found",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: `https://www.matalan.co.uk/assets/favicon-f338a10eae042f47c9a3ee119cde59c2ded0a0a45db4da3c09f7937309ebf169.ico`,
        },
      },
    ]
  };
};

// Template that will show as the page
const FourOhFour: Template<TemplateRenderProps> = ({
  document,
}) => {
  const {
    _site
  } = document;
  return (
    <>
      <PageLayout global={_site}>
        <div className="content-list">
          <div className="container">
            <div className="sec-title text-center">
              <h1 className="" style={{ textAlign: "center" }}>
                {StaticData.PagenotFound}
              </h1>
              <p>{StaticData.cantfind_page}.</p>
              <p>{StaticData.Youcouldtry}</p>
              <div className="button-bx max-w-[45rem] !mx-auto !mt-5">
                <a className="btn" href="javascript:history.back()">{StaticData.Previuspage} &gt;</a>
                <a className="btn" href="/">{StaticData.homePage} &gt;</a>
              </div>
            </div>


          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default FourOhFour;
