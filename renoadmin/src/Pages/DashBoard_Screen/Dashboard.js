import React from "react";
import Card from "./Component/Card";
import { Book, Dollar, Headset, Users } from "./Assets";
import Chart from "./Component/Chart";
import TopHeader from "../../UI/TopHeader/TopHeader";

const Dashboard = () => {
  const head = "Dashboard";
  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 mt-32 w-[80%] relative">
        <div className="flex flex-wrap justify-between mt-5 mx-4 sm:justify-start text-white">
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4  px-2 mb-4">
            <Card
              title={"350K"}
              subtitle={"Total Revenue from Home Service"}
              icon={Dollar}
              color={"bg-[#4EA2EF]"}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4  px-2 mb-4">
            <Card
              title={"1.5K"}
              subtitle={"Reward Points Redeemed"}
              icon={Book}
              color={"bg-[#19398B]"}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4  px-2 mb-4">
            <Card
              title={"1.2K"}
              subtitle={"Top Products/Services"}
              icon={Headset}
              color={"bg-[#E9B84A]"}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4 px-2 mb-4">
            <Card
              title={"50K"}
              subtitle={"New Users"}
              icon={Users}
              color={"bg-[#FFA843]"}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row pl-7 pr-7 mb-5 gap-5">
          <Chart
            heading="Total Active Users"
            fields={[
              {
                name: "Today's active users",
                value: 60,
              },
              {
                name: "Yesterday's active users",
                value: 25,
              },
              {
                name: "Tomorrow's active users",
                value: 10,
              },
              {
                name: "Last Month's active users",
                value: 10,
              },
            ]}
          />
          <Chart
            heading="Total Active bookings"
            fields={[
              {
                name: "Today's active bookings",
                value: 60,
              },
              {
                name: "Yesterday's active bookings",
                value: 25,
              },
              {
                name: "Tomorrow's active bookings",
                value: 10,
              },
              {
                name: "Last Month's active bookings",
                value: 10,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
