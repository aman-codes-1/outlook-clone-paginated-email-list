import "./Card.css";

const Card = ({
  item,
  id,
  avatar,
  from,
  subject,
  shortDesc,
  date,
  handleClick,
}) => {
  return (
    <div
      className={`card ${item && id && item?.id === id ? "card-read" : ""}`}
      onClick={(_) => handleClick(_, item?.id)}
    >
      <div className="card-container">
        <div className="left-container">
          {avatar}
        </div>
        <div className="right-container">
          {from}
          {subject}
          {shortDesc}
          {date}
        </div>
      </div>
    </div>
  );
};

export default Card;
