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
import FooterAccordian from "../commons/FooterAccordian";

const Footer = (props: any) => {
	const { footer } = props;
	// const [isNavVisible, setNavVisibility] =  useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 1024px)");
		mediaQuery.addListener(handleMediaQueryChange);
		handleMediaQueryChange(mediaQuery);

		return () => {
			mediaQuery.removeListener(handleMediaQueryChange);
		};
	}, []);

	const handleMediaQueryChange = mediaQuery => {
		if (mediaQuery.matches) {
			setIsSmallScreen(true);
		} else {
			setIsSmallScreen(false);
		}
	};
	// if (typeof window !== "undefined") {
	// 	mediaQuery = window?.innerWidth;
	// }


	return (
		<>

			<footer className="site-footer">

				<div className="container">

					<div className="store-locator">
						{footer.c_store_finder.map((storfinder: any) => {
							return (
								<>
									<div className="store-inner">
										<img src={storfinder.icon.url} />
										<div className="uppercase text-center   
   px-2 transition-all duration-300   hover:bg-red text-gray-dark
    hover:text-white   border-black border hover:border-transparent  bg-white text-sm md:text-base font-medium"><Link props={storfinder.cTA}/></div>

									</div>
								</>
							)
						})}
{/* 

						<div className="store-inner">
							<img src={footer.c_fAQs.icon.url} />

							<Link props={footer.c_fAQs.cTA} />

						</div> */}




					</div>
                   {!isSmallScreen?
					<div className="link-sec-footer ">
						<div className="footer-block">
							<h4 className="footer-block-title">{footer.c_customer_services.headerLinksHeading}</h4>
							<ul className="list-none">
								{footer.c_customer_services.headerLinks.map((customerService: any) => {
									return (<li>
											<Link props={customerService}/>
										</li>)
								})}
							</ul>
						</div>
						<div className="footer-block">
							<h4 className="footer-block-title">{footer.c_about_matalan.headerLinksHeading}</h4>
							<ul className="list-none"><li>{footer.c_about_matalan.headerLinksHeading}</li>
								{footer.c_about_matalan.headerLinks.map((aboutMatalan: any) => {
									return (<li>
										<Link props={aboutMatalan}/>
										</li>)
								})}
							</ul>
						</div>
						<div className="footer-block">
							<h4 className="footer-block-title">{footer.c_our_website.headerLinksHeading}</h4>
							<ul className="list-none">
								{footer.c_our_website.headerLinks.map((ourWebsite: any) => {
									return (<li>
										<Link props={ourWebsite}/>
									</li>)
								})}
							</ul>
						</div>
					</div>:<FooterAccordian footer={footer}/>}
					<div className="copyright-bx">
						<h4 className="footer-block-title">{footer.c_appSectionText}</h4>
						{/* <ul className="flex-row mt-4 flex w-full mb-3 app-icons">
							{footer.c_app_icon.map((appicon: any) => {
								return (
									<>
										<li className="mr-3">
											<a href={appicon.cTA.link}>
											<img src={appicon.icon.url} />
										</a></li>

									</>
								)
							})}


						</ul> */}
						<ul className="social-media-bx">
							{footer.c_socialIcons.map((icon: any) => {
								return (

									<>
										<li className=""> <a href={icon.cTA.link} target="_blank"><img src={icon.icon.url} height="20" alt="twitter" width="21" className="inline-block w-5 h-auto" /> </a> </li>
									</>
								)
							})}
						</ul>


						<span className="text-xs flex-wrap" data-copyright="">
							{footer.c_footerDescription}</span>

						<div className="company-logo">
							<img src="https://eu.evocdn.io/dealer/1411/content/media/My_Theme/ry-foot-logo.png" /></div>
					</div>

				</div>

			</footer>

			<CookieConsent
				buttonText={StaticData.CookiebuttonText}
				buttonStyle={{
					marginLeft: "100px",
				}}
			>
				<p>
					{cookieText}
					<a className="text-cookies-link" href={cookiesUrl}>
						{StaticData.cookie}
					</a>
					.
				</p>
			</CookieConsent>
		</>
	);
};

export default Footer;
function handleMediaQueryChange(mediaQuery: MediaQueryList) {
	throw new Error("Function not implemented.");
}

