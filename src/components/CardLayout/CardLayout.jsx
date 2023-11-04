import { useEffect, useState } from "react";
import { Card, CardBody, CardLoader } from "..";
import { callApi, formatDate } from "../../helpers";
import "./CardLayout.css";

const CardLayout = ({ data, loadingComp, emailCard, setEmailCard }) => {
  const [state, setState] = useState({
    loading: false,
    error: "",
    data: [],
  });
  const [id, setId] = useState(null);

  const fetchEmail = async (id) => {
    setState({
      loading: true,
      error: "",
      data: {},
    });
    try {
      const data = await callApi({
        method: "GET",
        url: `https://flipkart-email-mock.now.sh/?id=${id}`,
      });
      setState({
        loading: false,
        error: "",
        data: data?.data || {},
      });
    } catch (err) {
      setState({
        loading: false,
        error: JSON.stringify(err),
        data: {},
      });
    }
  };

  useEffect(() => {
    if (!emailCard) {
      setId(null);
    }
  }, [emailCard]);

  const handleClick = (_, Id) => {
    setId(Id);
    setEmailCard((prev) => !prev);
    if (Id !== id) {
      setEmailCard(true);
    }
    fetchEmail(Id);
  };

  return (
    <div className={`card-layout ${emailCard ? "card-selected" : ""}`}>
      <div
        className={`card-wrapper ${emailCard ? "card-wrapper-selected" : ""}`}
      >
        {loadingComp &&
          Array(10)
            .fill(0)
            .map(() => <CardLoader />)}
        {!loadingComp && data?.length
          ? data.map((item) => (
              <Card
                item={item}
                id={id}
                avatar={
                  <div className="avatar">
                    {item?.from?.name?.substring(0, 1).toUpperCase()}
                  </div>
                }
                from={
                  <div>
                    From:{" "}
                    <strong
                      style={{ wordWrap: "break-word" }}
                    >{`${item?.from?.name} <${item?.from?.email}>`}</strong>
                  </div>
                }
                subject={
                  <div>
                    Subject:{" "}
                    <strong style={{ wordWrap: "break-word" }}>
                      {item?.subject}
                    </strong>
                  </div>
                }
                shortDesc={
                  item?.short_description ? (
                    <div className="card-short-description">
                      {emailCard
                        ? item?.short_description?.substring(0, 48) + "..."
                        : item?.short_description}
                    </div>
                  ) : null
                }
                date={<div>{item?.date ? formatDate(item?.date) : null}</div>}
                emailCard={emailCard}
                handleClick={handleClick}
              />
            ))
          : null}
      </div>
      {emailCard ? <CardBody data={data} state={state} id={id} /> : null}
    </div>
  );
};

export default CardLayout;
