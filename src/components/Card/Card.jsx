import { useState } from "react";
import { EmailCard } from "../EmailCard";
import { callApi, formatDate } from "../../helpers";
import "./Card.css";

const Card = ({ data }) => {
  const [state, setState] = useState({
    loading: false,
    error: "",
    data: [],
  });
  const [emailCard, setEmailCard] = useState(false);
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

  const handleClick = (_, id) => {
    setId(id);
    setEmailCard(true);
    fetchEmail(id);
  };

  return (
    <div className={`card ${emailCard ? "card-selected" : ""}`}>
      <div className={`card-wrapper ${emailCard ? "card-wrapper-selected" : ""}`}>
        {data?.length
          ? data.map((item) => (
              <div
                className={`card-container ${item?.read ? "card-read" : ""}`}
                onClick={(_) => handleClick(_, item?.id)}
              >
                <div className="left-container">
                  <div className="avatar">
                    {item?.from?.name?.substring(0, 1).toUpperCase()}
                  </div>
                </div>
                <div className="right-container">
                  <div>
                    From:{" "}
                    <strong>{`${item?.from?.name} <${item?.from?.email}>`}</strong>
                  </div>
                  <div>
                    Subject: <strong>{item?.subject}</strong>
                  </div>
                  {item?.short_description ? (
                    <div className="email-body">{item?.short_description}</div>
                  ) : null}
                  <div>{item?.date ? formatDate(item?.date) : null}</div>
                </div>
              </div>
            ))
          : null}
      </div>
      {emailCard ? (
        <div className="email-card">
          <EmailCard data={data} state={state} id={id} />
        </div>
      ) : null}
    </div>
  );
};

export default Card;
