// import Configuration from "./Pages/Configuration_Screen/Configuration";

import Dashboard from "./Pages/DashBoard_Screen/Dashboard";
// import Table from "./UI/CommonTable/Table";

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
      <Dashboard />
      {/* <Table
        columns={columns}
        buttonText={buttonText}
        data={data}
        pageSize={pageSize}
      /> */}
    </div>
  );
}

export default App;
