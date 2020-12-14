import Me from "../components/Me";
import User from "../components/User";

const MePage = ({ query }) => (
  <div>
    {/* {console.log(query)} */}
    <Me id={query.id} />
  </div>
);

// const MePage = (props) => <Me />;

export default MePage;
