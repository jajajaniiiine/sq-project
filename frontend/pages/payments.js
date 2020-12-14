import PleaseSignIn from "../components/PleaseSignIn";
import Payments from "../components/Payments";

const PaymentsPage = (props) => (
  <div>
    <PleaseSignIn>
      <Payments />
    </PleaseSignIn>
  </div>
);

export default PaymentsPage;
