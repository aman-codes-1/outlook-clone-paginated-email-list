import { formatDate } from "../../helpers";
import "./Card.css";

const Card = ({ item, id, emailCard, handleClick }) => {
  return (
    <div
      className={`card ${item?.id === id ? "card-read" : ""}`}
      onClick={(_) => handleClick(_, item?.id)}
    >
      <div className="card-container">
        <div className="left-container">
          <div className="avatar">
            {item?.from?.name?.substring(0, 1).toUpperCase()}
          </div>
        </div>
        <div className="right-container">
          <div>
            From:{" "}
            <strong
              style={{ wordWrap: "break-word" }}
            >{`${item?.from?.name} <${item?.from?.email}>`}</strong>
          </div>
          <div>
            Subject:{" "}
            <strong style={{ wordWrap: "break-word" }}>{item?.subject}</strong>
          </div>
          {item?.short_description ? (
            <div className="card-short-description">
              {emailCard ? item?.short_description?.substring(0, 48) + "..." : item?.short_description}
            </div>
          ) : null}
          <div>{item?.date ? formatDate(item?.date) : null}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
