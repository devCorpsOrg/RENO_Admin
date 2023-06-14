import React, { useState, useEffect, useRef } from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const ProjectBookings = () => {
  const schedulerRef = useRef(null);
  const head = "Bookings";
  const apiURL = "http://139.59.236.50:8000/projectbookings/";
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
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
          style={{ height: 700, width: 1100 }}
        />
        {selectedEvent && (
          <div className="fixed flex flex-col top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-50 h-50 bg-white p-10 rounded-3xl">
              <div className="flex flex-row gap-20 mb-10">
                <h4 className="text-2xl text-lime-500 font-bold">
                  Event Details
                </h4>
                <button
                  className="float-right font-bold text-2xl focus:outline-none text-red-500"
                  onClick={handleClosePopup}>
                  x
                </button>
              </div>
              <div>
                <div>Title: {selectedEvent.title}</div>
                <div>Description: {selectedEvent.description}</div>
                <div>
                  Date: {moment(selectedEvent.start).format("YYYY-MM-DD")}
                </div>
                <div>Time: {moment(selectedEvent.start).format("HH:mm")}</div>
                <div>Person: {selectedEvent.user}</div>
                <div>Status: {selectedEvent.status}</div>
                <div>Price: {selectedEvent.rate}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectBookings;
