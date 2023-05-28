import React, { useState, useEffect, useRef } from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
  Agenda,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

const ProjectBookings = () => {
  const schedulerRef = useRef(null);
  const head = "Bookings";
  const apiURL = "http://139.59.236.50:8000/projectbookings/";

  const fieldsData = {
    id: "id",
    subject: { name: "prod_name" },
    isAllDay: { name: "isAllDay" },
    startTime: { name: "date", parse: (value) => new Date(value) },
    endTime: { name: "date", parse: (value) => new Date(value) },
    description: { name: "desc" },
    price: { name: "rate" },
    person: { name: "user" },
    status: { name: "status" },
  };
  

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    // const testData = [
    //   {
    //     id: "8c1e9620-65d2-40fe-bbac-c765eddc37e0",
    //     date: "2023-05-22",
    //     time: "16:21:50.920000",
    //     status: "booked",
    //     user: "adarsh",
    //     prod_name: "lux",
    //     rate: 34,
    //     proj_category: "residential",
    //     desc: "sdfghjkzxcvbn"
    //   },
    //   {
    //     id: "24b02bef-525a-4148-95d7-12a01350c3f2",
    //     date: "2023-05-23",
    //     time: "07:56:46.769000",
    //     status: "booked",
    //     user: "kumar",
    //     prod_name: "lux",
    //     rate: 8776,
    //     proj_category: "oiuytr",
    //     desc: "poiuytreasdfghjkmnbvcx"
    //   },
    //   // Add more test data here...
    // ];
  
    // setDataSource(testData);
    // console.log(dataSource)
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setDataSource(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  const eventTemplate = (props) => {
    return (
      <div>
        <div>{props.subject}</div>
        <div>Description: {props.description}</div>
        <div>Date: {props.startTime.toDateString()}</div>
        <div>Time: {props.startTime.toLocaleTimeString()}</div>
        <div>Person: {props.person}</div>
        <div>Status: {props.status}</div>
        <div>Price: {props.price}</div>
      </div>
    );
  };

  const editorTemplate = (props) => {
    const date = props.date instanceof Date ? props.date.toDateString() : '';
    const time = props.time || '';
  
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>Product:</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{props.prod_name}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>User:</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{props.user}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>About:</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{props.desc}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>Rate:</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{props.rate}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>Status:</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{props.status}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>Date:</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{date}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>Time:</td>
            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{time}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  
  
  
  

  const onPopupOpen = (args) => {
    if (args.target.classList.contains("e-work-cells")) {
      args.cancel = true;
      return;
    }

    const deleteButton = args.type === "QuickInfo"
      ? document.querySelector(".e-event-popup .e-delete")
      : document.querySelector(".e-schedule-dialog .e-event-delete");

    deleteButton.ej2_instances[0].disabled = true;
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div
        className="ml-80 mb-10 w-[100vh] relative"
        style={{ marginTop: "110px" }}
      >
        <ScheduleComponent
          height="600px"
          width="1162px"
          selectedDate={new Date()}
          eventSettings={{ dataSource: dataSource, fields: fieldsData }}
          eventTemplate={eventTemplate}
          editorTemplate={editorTemplate}
          popupOpen={onPopupOpen}
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="Month" />
            <ViewDirective option="Agenda" />
          </ViewsDirective>
          <Inject services={[Day, Week, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    </div>
  );
};

export default ProjectBookings;
