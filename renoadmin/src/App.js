// import Configuration from "./Pages/Configuration_Screen/Configuration";

// import Dashboard from "./Pages/DashBoard_Screen/Dashboard";
// import Table from "./UI/CommonTable/Table";
import AllPages from "./Pages/Content_Management/AllPages/allPages";
// import CreaterNewPage from "./Pages/Content_Management/CreateNewPage/createNewPage";
// import AllMembers from "./Pages/CRM/AllMembers/allmembers";
// import PRM from "./Pages/PRM/prm";
// import AddNewRole from "./Pages/PRM/addNewRole";
// import SuspendedUser from "./Pages/User_Management/Suspended_User/suspendedUser";
// import AllUsers from "./Pages/User_Management/All_Users/all_user";

const columns = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Age",
    accessor: "age",
  },
  {
    header: "Gender",
    accessor: "gender",
  },
  {
    header: "S.No",
    accessor: "number",
  },
];

const data = [
  {
    name: "John Smith",
    age: 32,
    gender: "Male",
    number: 1,
  },
  {
    name: "Jane Doe",
    age: 28,
    gender: "Female",
    number: 2,
  },
  {
    name: "Bob Johnson",
    age: 45,
    gender: "Male",
    number: 3,
  },
  {
    name: "Emily Wilson",
    age: 37,
    gender: "Female",
    number: 4,
  },
];

const buttonText = "Add Tax Details";

// Number of Pages to be display on a single page.
const pageSize = 3;

function App() {
  return (
    <div className="App">
      {/* <Configuration /> */}
      {/* <Dashboard /> */}
      {/* <Table
        columns={columns}
        buttonText={buttonText}
        data={data}
        pageSize={pageSize}
      /> */}
      <AllPages />
      {/* <CreaterNewPage /> */}
      {/* <AllMembers /> */}
      {/* <PRM /> */}
      {/* <AddNewRole /> */}
      {/* <SuspendedUser /> */}
      {/* <AllUsers /> */}
    </div>
  );
}

export default App;
