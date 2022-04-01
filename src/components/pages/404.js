import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: 44 }}>
        Page doesn't exist!
      </p>
      <Link
        to="/"
        style={{
          display: " block",
          fontWeight: "bold",
          width: 200,
          fontSize: 20,
          textAlign: "center",
          margin: "30px auto",
          color: "#9F0013",
          border: "1px solid #9F0013 ",
        }}
      >
        Back to main page
      </Link>
    </div>
  );
};
export default Page404;
