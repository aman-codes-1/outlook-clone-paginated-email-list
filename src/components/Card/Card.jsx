import "./Card.css";

const Card = ({
  avatar,
  from,
  subject,
  shortDesc,
  date,
  favoriteBtn,
  handleClickCard,
  mainClass,
  selectedClass,
  readClass,
}) => {
  return (
    <div
      className={`${mainClass} ${selectedClass} ${readClass}`}
      onClick={handleClickCard}
    >
      <div className="card-container">
        <div className="left-container">{avatar}</div>
        <div className="right-container">
          {from}
          {subject}
          {shortDesc}
          <div className="card-footer">
            {date}
            {favoriteBtn}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
