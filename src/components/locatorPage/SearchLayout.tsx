import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState, useRef } from 'react';
import * as React from "react";
import {  VerticalResults, ResultsCount, LocationBias, Pagination } from "@yext/search-ui-react";
import { Location } from "../../types/search/locations";
import LocationCard from "./LocationCard";
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { GoogleMaps } from "./GoogleMaps";
import { useSearchState, Result } from "@yext/search-headless-react";
import Geocode from "react-geocode";
import Address from "../commons/Address";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import $ from "jquery";
import Banner from "../locationDetail/banner";
import LoadingSpinner from "../commons/LoadingSpinner";
import { AnswerExperienceConfig, breadcrumbhome, center_latitude, center_longitude, googleApikey, search_icn, UseMylocationsvg } from "../../../sites-global/global";
import { StaticData } from "../../../sites-global/staticData";

import FilterSearch from "../locatorPage/FilterSearch";
import ViewMore from "./ViewMore";

var params1: any = { latitude: center_latitude, longitude:center_longitude }
var mapzoom = 8;
var centerLatitude = center_latitude;
var centerLongitude = center_longitude;
const SearchLayout = (props: any): JSX.Element => {
  const [isLoading, setIsloading] = React.useState(true);
  const [check, setCheck] = useState(false);
  type FilterHandle = React.ElementRef<typeof FilterSearch>;
  const filterRef = useRef<FilterHandle>(null);
  const locationResults = useSearchState(s => s.vertical.results) || [];
  const [inputvalue, setInputValue] = React.useState('');
  // const [inputvalue, setInputValue] = React.useState('');
  const[allowlocation,setallowLocation]=React.useState('');
  const[newparam,SetNewparam]=React.useState({latitude:0,
    longitude:0});
  const [offset, setOffset] = React.useState(0);
  const searchActions = useSearchActions();
  const state = useSearchState(s => s) || [];
  const [optionclick, setOptionClick] = useState(true);
  var searchKey: any;
  var target;

  var firstTimeRunners = true;


  const FirstLoad = () => {
    setCheck(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        
        let params: any = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        params1 = params
        SetNewparam(params1);
        mapzoom=3;
        searchActions.setUserLocation(params1);
        searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
        searchActions.executeVerticalQuery();
      }, function (error) {
        if (error.code == error.PERMISSION_DENIED) {

        }

      });

    }
    params1 = {
      latitude: center_latitude,
      longitude: center_longitude
    };
    SetNewparam(params1);
    // mapzoom=8;
    searchActions.setUserLocation(params1);
    searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
    searchActions.executeVerticalQuery();
    setTimeout(() => {
      setIsloading(false);
      $('body').removeClass("overflow-hidden")
    }, 3200);

  }
  const onClick = () => {

   if (navigator.geolocation) {
    const error =(error:any) => {    
     
      if(error.code == 1){
        setallowLocation('Please allow your Location')
          
          }       
  };


    navigator.geolocation.getCurrentPosition(function (position) {
      Geocode.setApiKey(googleApikey);
      Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
        (response: any) => {
          if (response.results[0]) {
            filterRef.current && filterRef.current.setInputValue(response.results[0].formatted_address);
            setallowLocation('');
          }
        },
        (error: any) => {
          console.error(error);
          setCheck(false);
        }
      );

      let params = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      centerLatitude = position.coords.latitude;
      centerLongitude = position.coords.longitude;
      mapzoom=3;
      searchActions.setUserLocation(params);
      searchActions.executeVerticalQuery();

    },error, {
      timeout: 10000,
  });
  }
  // else{
  //   setallowLocation('Please allow your Location')
  // }
  
}
  const bindInputKeyup = () => {
    searchKey = document.getElementsByClassName('FilterSearchInput');
    if (searchKey.length) {
      searchKey[0].addEventListener("keyup", function (e: any) {
     
        if (searchKey[0].value.trim() == "") {
          setOptionClick(true);
          centerLatitude = params1.latitude;
          centerLongitude = params1.longitude;
          searchActions.setUserLocation(params1);
          searchActions.setVertical("locations")
          searchActions.setQuery("");
          searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
          searchActions.executeVerticalQuery();
        }
      })
    }
  }

  const handleEnterPress = () => {
    let searchKey = document.getElementsByClassName('FilterSearchInput');

    searchKey[0].addEventListener("keydown", function (e: any) {
      if (e.key == "Enter") {
    
        setOptionClick(false);
        setCheck(false);
        let Search = (searchKey[0].value);
        mapzoom = 16;

        getCoordinates(Search);
        document.querySelector('.z-10').classList.add('hidden');

      }
    })
  }

  const getParents = (elem: any) => {
    while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'body') {
      elem = elem.parentNode;
      if (elem.classList.contains('options')) {
        return true;
      }
    }
    return false;
  }
  const optionClickHandler = () => {

    document.body.addEventListener('click', function (e: any) {
      const isOptionClick = getParents(e.target)
      if (isOptionClick) {
        var text = "";
        if (e.target.children.length) {
          for (let index = 0; index < e.target.children.length; index++) {
            text += e.target.children[index].innerText;
          }
   

          if (text.trim() != "") {
            searchActions.setQuery("");
            searchActions.executeVerticalQuery();
            getCoordinates(text);
          }
        } else {
          text += e.target.innerText;
          if (text.trim() != "") {
            searchActions.setQuery("");
            searchActions.executeVerticalQuery();
            getCoordinates(text);
          }
        }
      }
    });
  }
  const Findinput = () => {
    let searchKey = document.getElementsByClassName('FilterSearchInput');
    let Search = (searchKey[0].value);

    setInputValue('');
    if(searchKey[0].value!=""){
    getCoordinates(Search);
    }
  }

  const handleInputValue = () => {
    setInputValue('');
  }
  const handleSetUserShareLocation = (value:any, userShareStatus:boolean) => {
    setInputValue(value);
    if(!userShareStatus){
      setCenterLatitude(googleMapsConfig.centerLatitude);
      setCenterLongitude(googleMapsConfig.centerLongitude);
    }
  }

  useEffect(() => {
    if (firstTimeRunners) {
      firstTimeRunners = false;
      FirstLoad();
    }
    if (isLoading) {
      $('body').addClass("overflow-hidden")
    }

  }, [])

    function getCoordinates(address: String) {
    setInputValue('');
   
 
          setCheck(true);
          searchActions.setQuery(address);
          searchActions.setUserLocation(newparam);
          searchActions.setOffset(0);
          searchActions.executeVerticalQuery();
          
  }

  let bannerimage = props._site.c_locatorBannerImage != undefined  ? props._site.c_locatorBannerImage.image.url:'';
 

  const loader =
    isLoading ? <LoadingSpinner /> : '';

  const addClass = () => {

    document.body.setAttribute("class", "mapView");
    setActive('')


  }




  return (
    <>

      {loader}
      <div className="breadcrumb">
        <div className="container">
          <ul>
            <li>
              <a href="#" className="home"><div dangerouslySetInnerHTML={{ __html: breadcrumbhome }} /></a>
            </li>
            <li>{StaticData.locator_breadcrumb}</li>
          </ul>

        </div>
      </div>
      
      {/* {props._site?
      <Banner name={props._site.c_locatorTitleH1} c_locatorBannerAdditionalText={props._site.c_locator_description} c_bannerImage={bannerimage} />
:''} */}

      <div className="locator-main">
        {allowlocation.length > 0 ?
          <div className="for-allow">{allowlocation}</div>
          : ''}
        <div className="search-bx">
          <div className="location-with-filter">
            <h3 className="m-2 font-semibold text-slate-900">Store Finder</h3>

            <button className="useMyLocation" title="Search using your current location!" id="useLocation" onClick={onClick}>
              <div className="icon" dangerouslySetInnerHTML={{ __html: UseMylocationsvg }} />

              {StaticData.Usemylocation}
            </button>
          </div>

          <div className="search-field">
            <FilterSearch
             ref={filterRef}
              customCssClasses={{
                filterSearchContainer: "m-2 w-full",
                inputElement: "FilterSearchInput pr-[90px]",
                optionsContainer: "options"
              }}
              inputvalue={inputvalue}
              params={params1}
              searchOnSelect={true}
              searchFields={[
                {
                  entityType: "location",
                  fieldApiName: "address.line1",

                },
                {
                  entityType: "location",
                  fieldApiName: "address.postalCode",

                  },
                  {
                    entityType: "location",
                    fieldApiName: "name",

                },
                {
                  entityType: "location",
                  fieldApiName: "address.city",

                },
                {
                  entityType: "location",
                  fieldApiName: "address.region",

                  },
                  // {
                  //   entityType: "location",
                  //   fieldApiName: "address.countryCode",

                  // },
                ]}
                
                handleInputValue={handleInputValue}  
                handleSetUserShareLocation={handleSetUserShareLocation}
            />

            <button
              className="search-btn"
              aria-label="Search bar icon"
              id="search-location-button" onClick={Findinput}><div dangerouslySetInnerHTML={{ __html: search_icn }} /></button>
          </div>


          <ResultsCount
            customCssClasses={{ resultsCountContainer: "mx-2 my-0" }}
          />
        </div>
        <div className="mobile-btns">
          <div className="button-bx">

            <a className="btn listBtn" href="javascript:void(0);" onClick={() => {
              document.body.classList.remove('mapView')

            }}> List View</a>
            <a className="btn mapBtn" href="javascript:void(0);" onClick={addClass}> Map View</a>
          </div>
        </div>
        <div className=" map-section ">
          <GoogleMaps
            apiKey={googleApikey}
            centerLatitude={centerLatitude}
            centerLongitude={centerLongitude}
            check={check}
            defaultZoom={mapzoom}
            showEmptyMap={true}
          />
        </div>

        <div className="left-listing">

          <PerfectScrollbar >

            <div>
              {locationResults && locationResults.length > 0 ? (
                <VerticalResults<Location>
                  displayAllOnNoResults={false}
                  customCssClasses={{

                    verticalResultsContainer:
                      "result-list flex flex-col scroll-smooth  overflow-auto",

                  }}
                  CardComponent={LocationCard}
                />
              ) : (
                <div className="p-4 bg-white">
                  <p>No Stores found.</p>
                </div>
              )}
                <div className="button-bx">
               <ViewMore  className={" btn notHighlight !w-[132%] !mb-2 button view-more"} idName={"view-more-button"} buttonLabel={"View More"} />
               </div>
            </div>
          </PerfectScrollbar>
        </div>


      </div>


    </>
  );
};

export default SearchLayout;


