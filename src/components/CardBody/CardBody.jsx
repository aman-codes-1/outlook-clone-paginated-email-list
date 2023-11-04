import { Loader } from "../Loader";
import { formatDate } from "../../helpers";
import "./CardBody.css";

const CardBody = ({ data, state, id }) => {
  const userData = data?.length ? data?.find((item) => item?.id === id) : {};

  return (
    <div className="card-body">
      <div className="card-body-container">
        <div className="left-container">
          <div className="avatar">
            {userData?.from?.name?.substring(0, 1).toUpperCase()}
          </div>
        </div>
        <div className="right-container">
          <div className="card-body-header">
            <h1 style={{ margin: 0 }}>{userData?.from?.name}</h1>
            <button
              style={{
                cursor: "pointer",
                padding: "3px 16px",
                borderRadius: "20px",
                background: "#E55065",
                color: "#FFFFFF",
                fontWeight: "bold",
                border: "none",
                marginLeft: "auto",
              }}
            >
              Mark as favorite
            </button>
          </div>
          <div>{userData?.date ? formatDate(userData?.date) : null}</div>
          {state?.loading ? (
            <Loader />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: state?.data?.body }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardBody;
