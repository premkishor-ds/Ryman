import * as React from "react";

const Services = (props: any) => {
  console.log(props, "services")

  return (
    <>
      <div className="">
        {/* Our Services */}
        <div>
          <p>{props.c_ourService1.heading}</p>
          {props.c_ourService1.lists.map((data: any) => {
            return (
              <div>
                <p>{data.title}</p>
                <ul>
                  {data.lists.map((list: any) => {
                    return (
                      <li>{list}</li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
          <p>{props.c_ourService1.description}</p>
        </div>
        {/* Services available */}
        <div>
          <p>{props.c_servicesAvailable.heading}</p>
          <p>{props.c_servicesAvailable.description}</p>
          <ul>
            {props.c_servicesAvailable.list.map((data: any) => {
              return (
                <li>
                  <a href={data.link}><img src={data.photo.url} alt="" /></a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Services;
