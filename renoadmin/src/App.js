// import FeaturedProject from "./Pages/PSM/FeaturedProject/featuredProject";
// import AllProjects from "./Pages/PSM/AllProjects/allProjects";
// import AllProducts from "./Pages/HSM/AllProducts/allProducts";
// import AllPromotionList from "./Pages/HSM/AllPromotionList/allPromotionList";
// import FeaturedProducts from "./Pages/HSM/FeaturedProducts/featuredProducts";
// import TranscationHistory from "./Pages/HSM/Transactionhistory/transactionhistory";
import Reviews from "./Pages/HSM/Reviews/reviews";

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
      {/* <AllProducts /> */}
      {/* <AllPromotionList /> */}
      {/* <FeaturedProducts /> */}
      {/* <TranscationHistory /> */}
      {/* <AllProjects /> */}
      <Reviews />
      {/* <FeaturedProject />,, */}
    </div>
  );
}

export default App;
