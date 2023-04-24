import { Wrapper } from '@googlemaps/react-wrapper';
// import { Result, useAnswersState } from '@yext/answers-headless-react';
import { useSearchState, Result, useSearchActions } from "@yext/search-headless-react";
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { twMerge, useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import Mapicon from "../../images/map-pin.svg";
import clustericon from "../../images/cluster.png";
import mapimage from "../../images/map.svg";
import timesvg from "../../images/watch-icn.svg"
import Hovermap from "../../images/hovermap.svg"
import Hours from '../commons/hours';
import reactElementToJSXString from 'react-element-to-jsx-string';
import Nav from '../layouts/Nav';
import UserMarker from "../../images/map-center.svg";
import { renderToString } from "react-dom/server";
import LocationCard from './LocationCard';
import Opening from '../commons/openClose';
import GetDirection from '../commons/GetDirection';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import Address from '../commons/Address';
import Phonesvg from "../../images/phone.svg"
import { ResultsCount } from '@yext/search-ui-react';
import OpenClose from '../commons/openClose';
import $ from "jquery";
import { Directionsvg, View_Store } from '../../../sites-global/global';
import { StaticData } from '../../../sites-global/staticData';
/**
 * CSS class interface for the {@link GoogleMaps} component
 *
 * @public
 */
declare global {
  interface Window {
    getdirection: any;
  }
}
export interface GoogleMapsCssClasses {
  googleMapsContainer?: string
}

/**
 * Props for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsProps {
  apiKey: string,
  centerLatitude: number,
  centerLongitude: number,
  defaultZoom: number,
  showEmptyMap: boolean,
  check: boolean,
  providerOptions?: google.maps.MapOptions,
  customCssClasses?: GoogleMapsCssClasses
}

type UnwrappedGoogleMapsProps = Omit<GoogleMapsProps, 'apiKey' | 'locale'>;
let mapMarkerClusterer: { clearMarkers: () => void; } | null = null;
// let infoWindow:any = null;
const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
   googleMapsContainer: 'locator-map-block'
};

/**
 * A component that renders a map with markers to show result locations.
 *
 * @param props - {@link GoogleMapsProps}
 * @returns A React element conatining a Google Map
 *
 * @public
 */
export function GoogleMaps(props: GoogleMapsProps) {

  return (
    <div>
      <Wrapper apiKey={props.apiKey} >
        <UnwrappedGoogleMaps {...props} />
      </Wrapper>
    </div>
  );
}

function UnwrappedGoogleMaps({
  centerLatitude,
  centerLongitude,
  defaultZoom: zoom,
  showEmptyMap,
  check,
  providerOptions,
  customCssClasses
}: UnwrappedGoogleMapsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [downinfo, setDownInfo] = useState(true);
  var isHover = true;
  let searchZoom: number | Number | null | undefined = null;
  let currentMapZoom: Number | undefined = 0;
  let stopAnimation = false;
  // if(!infoWindow){ infoWindow = new google.maps.InfoWindow();}
  let center: any = {
    lat: Number,
    lng: Number
  }




  const locationResults = useSearchState(s => s.vertical.results) || [];
  locationResults.map((result: any, i: Number) => {
    if (i == 0) {
      center = {
        lat: result.rawData.yextDisplayCoordinate ? result.rawData.yextDisplayCoordinate.latitude : result.rawData.displayCoordinate.latitude,
        lng: result.rawData.yextDisplayCoordinate ? result.rawData.yextDisplayCoordinate.longitude : result.rawData.displayCoordinate.longitude
      };
    }

  })


  const [hover, setHover] = useState(true);
  var info= false;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const noResults = !locationResults.length;
  let containerCssClass = cssClasses.googleMapsContainer;


  if (noResults && !showEmptyMap) {
    containerCssClass = twMerge(cssClasses.googleMapsContainer, 'hidden');
  }

  let pinStyles = {
    fill: "#da261b", //default google red
    stroke: "#da261b",
    text: "white",
    fill_selected: "#000",
    stroke_selected: "#000",
    text_selected: "#fff",
  };

  let marker_icon = {
    // default google pin path
    /*path: "M18.942,56.14C2.965,32.568,0,30.149,0,21.486A21.3,21.3,0,0,1,21.111,0,21.3,21.3,0,0,1,42.222,21.486c0,8.663-2.965,11.082-18.942,34.654a2.614,2.614,0,0,1-4.339,0Zm2.17-25.7a8.954,8.954,0,1,0-8.8-8.953A8.875,8.875,0,0,0,21.111,30.439Z",*/
    url: Mapicon,
    fillColor: pinStyles.fill,
    scale: 1.1,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(21, 22),
  };
  function zoomMapTo(zoomTo, centerToSet = false) {
    currentMapZoom = map.getZoom();
    let newZoom = (currentMapZoom > zoomTo) ? (currentMapZoom - 1) : (currentMapZoom + 1);
    map.setZoom(newZoom);
    if (newZoom != zoomTo && !stopAnimation) sleep(200).then(() => {
      zoomMapTo(zoomTo, centerToSet);
    });
    if (newZoom == zoomTo) {
      stopAnimation = false;
      if (centerToSet) {
        if (typeof map.panTo != 'undefined') {
          map.panTo(centerToSet);
        } else {
          map.setCenter(centerToSet);
        }
      }
    }
  }
 

  const bounds = new google.maps.LatLngBounds();
  const markers1 = useRef<google.maps.Marker[]>([]);
  const usermarker = useRef<google.maps.Marker[]>([]);
  const infoWindow = useRef(new google.maps.InfoWindow());
  
  deleteMarkers();
  userdeleteMarkers();
  // function getCoordinates(address:String){

  const userlat = useSearchState(s => s.location.locationBias) || [];
  const iplat = userlat.latitude;
  const iplong = userlat.longitude;
  const position = {
    lat: iplat,
    lng: iplong
  }

  const Usermarker1 = new google.maps.Marker({
    position,
    map,
    icon: UserMarker
  });
  usermarker.current.push(Usermarker1);

  try { if (mapMarkerClusterer) { mapMarkerClusterer.clearMarkers(); } } catch (e) { }
  for (const result of locationResults) {
    const position = getPosition(result);
    const marker = new google.maps.Marker({
      position,
      map,
      icon: marker_icon,
      // animation: google.maps.Animation.DROP
    });

    const location = new google.maps.LatLng(position.lat, position.lng);
    bounds.extend(location);
    markers1.current.push(marker);

  }
  if (markers1.current.length > 0) {
    let markers = markers1.current;
 
    mapMarkerClusterer = new MarkerClusterer({
      map, markers
      , renderer: {
        render: ({ markers, position: position }) => {
          return new google.maps.Marker({
            position: {
              lat: position.lat(),
              lng: position.lng(),
            },
            icon: clustericon,
            label: {
              text: String(markers?.length),
              color: 'white'
            },
            //  animation: google.maps.Animation.DROP,
          });
        },
      },
    });
  }

  useEffect(() => {

    if (ref.current && !map) {

      setMap(new window.google.maps.Map(ref.current, {
        center,
        zoom,
        ...providerOptions
      }));

    }
    else if (markers1.current.length > 0 && map && check && hover) {

      setTimeout(function () {
        // map.setCenter(center);
        //  map.panTo(position)
       
        var bounds = new google.maps.LatLngBounds();
     
        if(zoom > 6){
        bounds.extend(center);
        bounds.extend(position);
        map.fitBounds(bounds);
        map.setZoom(8)
        }
        else{
          bounds.extend(center);
          bounds.extend(position);
          map.fitBounds(bounds);
          // map.setZoom(6)
        }
        
      }, 1000);



    }
    else if (hover) {
      map?.setZoom(zoom)
      if (zoom > 4) {
        // setTimeout(function () {
        //   map.setZoom(3)
        // }, 2000);
      }
    }
  }, [center, map, providerOptions, zoom]);
  gridHover(markers1, Hovermap, marker_icon);
  gridclick(markers1, Hovermap, marker_icon);


  for (let i = 0; i < markers1.current.length; i++) {
    markers1.current[i].addListener("click", () => {
      setHover(false);
      if(!info){
      markers1.current[i].setIcon(Hovermap);
      }
      locationResults.map((result, index) => {
        if (i == index) {


          let resultelement = document.querySelectorAll(`.result-list-inner-${index + 1}`);
          for (let index = 0; index < resultelement.length; index++) {
            resultelement[index].classList.add('active')
             resultelement[index].classList.add('fixed-hover')

          }
          let position = getPosition(locationResults[index]);
          Infowindow(i, result);
          scrollToRow(index);
        }
            map.setZoom(16);
        map.setCenter(center);
        infoWindow.current.open(map, markers1.current[i]);
      })



    })


    markers1.current[i].addListener("mouseover", () => {
      if (hover) {
        markers1.current[i].setIcon(Hovermap);

        addActiveGrid(i);


      }

    })
    markers1.current[i].addListener("mouseout", () => {
      if (hover) {
        markers1.current[i].setIcon(marker_icon);
      }
      if (hover) {
        removeActiveGrid(i)
      }

    })
  }
  
  if(infoWindow.current!=null){ 
    infoWindow.current.addListener("closeclick", () => { 
    setHover(true);
    info=false;
    infoWindow.current.close();
    locationResults.map((result, index) => {
      let resultelement = document.querySelectorAll(`.result-list-inner-${index + 1}`);      
      for (let index = 0; index < resultelement.length; index++) {
        resultelement[index].classList.remove('active','fixed-hover');
      }
    })
     map?.setZoom(8);       
  });
}

  function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const hours = (result: any) => {

    return (
      <Hours hours={result} c_specific_day={undefined} />
    )
  }
  function addActiveGrid(index: any) {
    let elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove('active')
    }
    document.querySelectorAll(".result")[index].classList.add("active");
  }
  function removeActiveGrid(index: any) {
    let elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove('active')
    }
    document.querySelectorAll(".result")[index].classList.remove("active");
  }
  function gridHover(markerPins: any, marker_hover_icon: any, marker_icon: any) {

    let elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].addEventListener("mouseover", (e) => {

        if (hover) {
          
          markerPins.current[index].setIcon(marker_hover_icon);
        
          addActiveGrid(index);
        }
      });
      elements[index].addEventListener("mouseout", () => {
     
        if (hover) {
          // if(!info){
            if(elements[index].classList.contains('fixed-hover')){
            markerPins.current[index].setIcon(marker_hover_icon);
          }
          else{
            
            markerPins.current[index].setIcon(marker_icon);
          }
          
         
          removeActiveGrid(index)
        }
      });

    }
  }
  function gridclick(markerPins: any, marker_hover_icon: any, marker_icon: any) {
    let elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {

      if(!elements[index].classList.contains("markerEventBinded")){
        elements[index].classList.add("markerEventBinded");
      elements[index].addEventListener("click", (e) => {
        if (!(e.target as HTMLInputElement).classList.contains("notHighlight")) {
          if(index>0){
          markerPins.current[index-1].setIcon(marker_icon);
          }
          $(".result").removeClass("fixed-hover");
          locationResults.map((result, i) => {
            if (i == index) { 
              setHover(false);  
              isHover = false;
              if(!info){
              markerPins.current[index].setIcon(marker_hover_icon);
              }
              document.querySelectorAll(".result")[index].classList.add("fixed-hover");
              addActiveGrid(index);
              setTimeout(() => {
                map.setZoom(12);
              

              }, 1000)
              map.setZoom(8);
              let position = {
                lat: result.rawData.yextDisplayCoordinate ? result.rawData.yextDisplayCoordinate.latitude : result.rawData.displayCoordinate.latitude,
                lng: result.rawData.yextDisplayCoordinate ? result.rawData.yextDisplayCoordinate.longitude : result.rawData.displayCoordinate.longitude
              }
              var bounds = new google.maps.LatLngBounds();
              bounds.extend(center);
              bounds.extend(position);
              map.fitBounds(bounds);
              map?.setCenter(position);
              // map?.panTo(position)

              Infowindow(i, result);
              infoWindow.current.open(map, markers1.current[index]);
            }
          })
        }
      });
    }
      // elements[index].addEventListener("mouseout", () => {
      //   if(!info){
      //   markerPins.current[index].setIcon(marker_icon);
      //   }
      //   removeActiveGrid(index)
      // });

    }

  }
  const metersToMiles = (meters: number) => {
    const miles = meters * 0.000621371;
    return miles.toFixed(2);
  }


  function Infowindow(i: Number, result: any): void {
    info=true;
    let url = "";

    var name: any = result.rawData.geomodifier?.toLowerCase();
    var region: any = result.rawData.address.region?.toLowerCase();
    var initialregion: any = region.toString();
    var finalregion: any = initialregion.replaceAll(" ", "-");
    var city: any = result.rawData.address.city?.toLowerCase();
    var initialrcity: any = city.toString();
    var finalcity: any = initialrcity.replaceAll(" ", "-");
    var string1: any = name.toString();
    let result1: any = string1.replaceAll(" ", "-");
    if (!result.rawData.slug) {
      url = `${result.rawData.id}-${result1}.html`;
    } else {
      url = `${result.rawData.slug.toString()}.html`;
    }


    const MarkerContent =


    (<>   <div className="flex flex-col max-w-[24rem] w-64 lg:w-[22.5rem] font-main-font text-xs sm:text-sm lg:text-base">
    <div className="location-name-miles icon-row">
      <div className="icon"> <img className=" " src={mapimage} width="20" height="20"
        alt="" /></div>
      <h2><a className="inline-block notHighlight" href={url}>{result.rawData.geomodifier}</a></h2>
      {result.distance ?
        <div className="distance">
          {metersToMiles(result.distance ?? 0)} <span>{StaticData.miles}</span>
        </div>
        : ''}
    </div>
    <div className="icon-row content-col">
      <Address address={result.rawData.address} />
    </div>
   {result.rawData.mainPhone?
    <div className="icon-row">
      <div className="icon"> <img className=" " src={Phonesvg} width="20" height="20" alt="" />
      </div>
      <div className="content-col">
        <h6>Telephone</h6>
        <a id="address" className="notHighlight" href={`tel:${result.rawData.mainPhone}`}>
          {result.rawData.mainPhone}</a>
      </div>
    </div>:''}

    {result.rawData.hours && result.rawData.hours.reopenDate ? ''
      : result.rawData.hours ? <><div className="icon-row">
        <div className="icon"> <img className=" " src={timesvg} width="20" height="20" alt="" /> </div>
        <h6>Opening Hours</h6>
        <OpenClose timezone={result.rawData.timezone} hours={result.rawData.hours} deliveryHours={result.rawData.hours}></OpenClose>
      </div></> : ''}

    <div className="button-bx mb-2.5">
      <a type="button" href={url}
        className="btn">
        {/* <div dangerouslySetInnerHTML={{__html: View_Store}}/> */}
        {StaticData.StoreDetailbtn}</a>
      {result.rawData.displayCoordinate ?
        <a data-listener="false" data-latitude={result.rawData.displayCoordinate.latitude} data-longitude={result.rawData.displayCoordinate.longitude} className="getdirection btn" rel="noopener noreferrer" data-city={result.rawData.address.city}
          data-country={result.rawData.address.countryCode} data-region={result.rawData.address.region}>
          {/* <div dangerouslySetInnerHTML={{__html: Directionsvg}}/> */}
          {StaticData.getDirection}</a> :
        <a data-listener="false" data-latitude={result.rawData.yextDisplayCoordinate.latitude} data-longitude={result.rawData.yextDisplayCoordinate.longitude} data-city={result.rawData.address.city}
          data-country={result.rawData.address.countryCode} data-region={result.rawData.address.region} className="cursor-pointer getdirection1 btn" rel="noopener noreferrer" >
          {/* <div dangerouslySetInnerHTML={{__html: Directionsvg}}/> */}
          {StaticData.getDirection}
        </a>
      }

      {/* <GetDirection buttonText="Direction" latitude={result.rawData.displayCoordinate?.latitude} longitude={result.rawData.displayCoordinate?.longitude}/> */}
    </div>
  </div>
  </>);



    let string = renderToString(MarkerContent);
    infoWindow.current.setContent(string);

  }


  google.maps.event.addListener(infoWindow.current, 'domready', () => {
    var inputs;
    inputs = document.getElementsByClassName('getdirection');
    if (inputs.length == 0) {
      inputs = document.getElementsByClassName('getdirection1');
    }
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("click", GetDirection);
    }
  });


  function GetDirection(e: any) {
    var origin: any = null;

    if (e.target.dataset.city) {
      origin = e.target.dataset.city;
    } else if (e.target.dataset.region) {
      origin = e.target.dataset.region;
    } else {
      origin = e.target.dataset.country;
    }
    if (navigator.geolocation) {
      const error = (error: any) => {
        var getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          e.target.dataset.latitude +
          "," +
          e.target.dataset.longitude +
          "&origin=" +
          origin + ",UK";
        window.open(getDirectionUrl, "_blank");
      };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let currentLatitude = position.coords.latitude;
          let currentLongitude = position.coords.longitude;
          let getDirectionUrl =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            e.target.dataset.latitude +
            "," +
            e.target.dataset.longitude +
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


  function deleteMarkers(): void {
    for (let i = 0; i < markers1.current.length; i++) {
      markers1.current[i].setMap(null);
    }
    markers1.current = [];
  }
  function userdeleteMarkers(): void {
    for (let i = 0; i < usermarker.current.length; i++) {
      usermarker.current[i].setMap(null);
    }
    usermarker.current = [];
  }



  return (
    <>
      <div className={containerCssClass} ref={ref} />
    </>
  );
}

function getPosition(result: Result) {

  const lat = result.rawData.yextDisplayCoordinate ? (result.rawData as any).yextDisplayCoordinate.latitude :
    (result.rawData as any).displayCoordinate.latitude;
  const lng = result.rawData.yextDisplayCoordinate ? (result.rawData as any).yextDisplayCoordinate.longitude
    :
    (result.rawData as any).displayCoordinate.longitude;
  return { lat, lng };
}

function scrollToRow(index: any) {
  let result: any = [].slice.call(document.querySelectorAll(`.result`) || [])[0];
  let offset: any = [].slice.call(document.querySelectorAll(`.result`) || [])[index];

  // alert(offset.offsetTop-result.offsetTop); 
  let o = offset.offsetTop - result.offsetTop;

  [].slice.call(document.querySelectorAll(".scrollbar-container") || []).forEach(function (el: any) {
    el.scrollTop = o;
  });

}
