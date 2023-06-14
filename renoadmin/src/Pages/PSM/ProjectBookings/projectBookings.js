import React, { useState, useEffect, useRef } from "react";
// import {
//   Inject,
//   ScheduleComponent,
//   Day,
//   Week,
//   Month,
//   Agenda,
//   ViewsDirective,
//   ViewDirective,
// } from "@syncfusion/ej2-react-schedule";
import TopHeader from "../../../UI/TopHeader/TopHeader";
// import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import EventCalender from "react-event-calendar"
// const EventCalendar = require('react-event-calendar');

const localizer = momentLocalizer(moment);

const ProjectBookings = () => {
  const schedulerRef = useRef(null);
  const head = "Bookings";
  const apiURL = "http://139.59.236.50:8000/projectbookings/";
  const [events, setEvents] = useState([]);

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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      const parsedEvents = data.map((event) => ({
        id: event.id,
        title: event.prod_name,
        description: event.desc,
        start: new Date(event.date),
        end: new Date(event.date),
        user: event.user,
        status: event.status,
        rate: event.rate,
      }));
      setEvents(parsedEvents);
      console.log(parsedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(apiURL);
  //     const data = await response.json();
  //     setDataSource(data);
  //     console.log(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const eventTemplate = (props) => {
  //   return (
  //     <div>
  //       <div>{props.subject}</div>
  //       <div>Description: {props.description}</div>
  //       <div>Date: {props.startTime.toDateString()}</div>
  //       <div>Time: {props.startTime.toLocaleTimeString()}</div>
  //       <div>Person: {props.person}</div>
  //       <div>Status: {props.status}</div>
  //       <div>Price: {props.price}</div>
  //     </div>
  //   );
  // };

  const eventComponent = ({ event }) => {
    return (
      <div>
        <div>Title: {event.title}</div>
        <div>Description: {event.description}</div>
        <div>Date: {moment(event.start).format("YYYY-MM-DD")}</div>
        <div>Time: {moment(event.start).format("HH:mm")}</div>
        <div>Person: {event.user}</div>
        <div>Status: {event.status}</div>
        <div>Price: {event.rate}</div>
      </div>
    );
  };

  const editorTemplate = (props) => {
    const date = props.date instanceof Date ? props.date.toDateString() : "";
    const time = props.time || "";

    return (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>
              Product:
            </td>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>
              {props.prod_name}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>User:</td>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>
              {props.user}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>About:</td>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>
              {props.desc}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>Rate:</td>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>
              {props.rate}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>
              Status:
            </td>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>
              {props.status}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>Date:</td>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>{date}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>Time:</td>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>{time}</td>
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

    const deleteButton =
      args.type === "QuickInfo"
        ? document.querySelector(".e-event-popup .e-delete")
        : document.querySelector(".e-schedule-dialog .e-event-delete");

    deleteButton.ej2_instances[0].disabled = true;
  };
  const [selectedRange, setSelectedRange] = useState(false);
  const handleSelect = (slotInfo) => {
    setSelectedRange(true);
  };

  const handleClosePopup = () => {
    setSelectedRange(false);
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div
        className="ml-80 mb-10 w-[100vh] relative"
        style={{ marginTop: "110px" }}>
        <Calendar
          localizer={localizer}
          selectable={true}
          events={events}
          defaultView="month"
          onSelectEvent={handleSelect}
          components={{
            event: eventComponent,
          }}
          views={["day", "week", "month", "agenda"]}
          onShowMore={(events, date) =>
            this.setState({ showModal: true, events })
          }
          style={{ height: 700, width: 1100 }}
        />
        {handleSelect && editorTemplate}
        {/* {eventPopup} */}
      </div>
    </div>
  );
};

export default ProjectBookings;
