import BaseLayout from "../components/BaseLayout";
import StaffPickLeft from "../components/StaffPickLeft";
import StaffPickRight from "../components/StaffPickRight";

function StaffPickPage() {
  return (
    <>
      <BaseLayout
        componentLeft={() => <StaffPickLeft />}
        componentRight={() => <StaffPickRight />}
      />
    </>
  );
}

export default StaffPickPage;
