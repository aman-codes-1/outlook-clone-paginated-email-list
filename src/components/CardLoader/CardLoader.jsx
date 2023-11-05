import { Skeleton } from "@mui/material";
import { Card } from "..";

const CardLoader = () => {
  return (
    <Card
      avatar={<Skeleton variant="circular" width="42px" height="42px" />}
      from={<Skeleton width={280} />}
      subject={<Skeleton width={150} />}
      shortDesc={
        <div className="card-short-description">
          <Skeleton animation="wave" width={500} />
        </div>
      }
      date={<Skeleton animation="wave" width={150} />}
      mainClass="card-loading"
    />
  );
};

export default CardLoader;
