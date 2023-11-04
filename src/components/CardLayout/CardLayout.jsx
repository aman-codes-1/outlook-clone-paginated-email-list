import { useEffect, useState } from "react";
import { Card, CardBody } from "..";
import { callApi } from "../../helpers";
import "./CardLayout.css";
import { Alert } from "@mui/material";

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
    <>
      {loadingComp ? (
        <Alert sx={{ mr: "25px" }} severity="warning" variant="standard">
          Loading...
        </Alert>
      ) : null}
      <div className={`card-layout ${emailCard ? "card-selected" : ""}`}>
        <div
          className={`card-wrapper ${emailCard ? "card-wrapper-selected" : ""}`}
        >
          {data?.length
            ? data.map((item) => (
                <Card
                  item={item}
                  id={id}
                  emailCard={emailCard}
                  handleClick={handleClick}
                />
              ))
            : null}
        </div>
        {emailCard ? <CardBody data={data} state={state} id={id} /> : null}
      </div>
    </>
  );
};

export default CardLayout;
