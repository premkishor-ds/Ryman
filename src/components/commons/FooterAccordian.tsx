import * as React from "react";
import "../../index.css";
import logofooter from "../../images/logo-footer.svg";
import facebook from "../../images/facebook.svg";
import instagram from "../../images/instagram.svg";
import twitter from "../../images/twitter.svg";
import youtube from "../../images/youtube.svg";
import printest from "../../images/printest.svg";
import { cookieText, cookiesUrl } from "../../../sites-global/global"
import CookieConsent from "react-cookie-consent";
import { StaticData } from "../../../sites-global/staticData";
import { useEffect, useState } from "react";
import Link from "../commons/Link";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const FooterAccordian = (props: any) => {
	const { footer } = props;


	return (
		<>
           <div>
 <Accordion>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{footer.c_customer_services.headerLinksHeading}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {footer.c_customer_services.headerLinks.map((customerService: any) => {
									return (<li>
											<Link props={customerService}/>
										</li>)
								})}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{footer.c_about_matalan.headerLinksHeading}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {footer.c_about_matalan.headerLinks.map((aboutMatalan: any) => {
									return (<li>
										<Link props={aboutMatalan}/>
										</li>)
								})}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>{footer.c_our_website.headerLinksHeading}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {footer.c_our_website.headerLinks.map((ourWebsite: any) => {
									return (<li>
										<Link props={ourWebsite}/>
									</li>)
								})}
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>

	</>
	);
};
export default FooterAccordian;
 
