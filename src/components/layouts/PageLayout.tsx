import * as React from "react";
import Footer from "./footer";
import Nav from "./Nav";
import Offersection from "../commons/Offersection";


type Props = {
  title?: string;
  _site?: any;
  global: any;
  children?: React.ReactNode;
};

const PageLayout = ({
  title,
  _site,
  global,
  children,
}: Props) => {
  return (
    <>
      {typeof global != "undefined" ?
        <Nav _site={global} />
        : ''}

      {global.c_offersection ?
        <Offersection c_offersection={global.c_offersection} />
        : <></>}

      {children}
      {typeof global != "undefined" ?
        <Footer footer={global} />
        : ''}
    </>
  );
};

export default PageLayout;
