import { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardLoader } from "..";
import { callApi, formatDate } from "../../helpers";
import "./CardLayout.css";
import { DataContext } from "../../contexts";

const CardLayout = () => {
  const [state, setState] = useState({
    loading: false,
    error: "",
    data: [],
  });
  const [id, setId] = useState(null);
  const {
    data,
    dataFilters,
    emailCard,
    filter,
    loadingComp,
    emails,
    setEmailCard,
    setEmails,
    setDataFilters,
    setFilter,
  } = useContext(DataContext);

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

  const handleClickCard = (_, Id) => {
    if (filter === "Unread") {
      setFilter("Read");
      const copyDataFilters = [...dataFilters];
      copyDataFilters.forEach((el, i) => {
        if (i === 2) {
          el.selected = true;
          el.data = [
            copyDataFilters[1].data?.filter((el) => el?.id === Id)?.[0],
            ...el.data,
          ];
        } else {
          el.selected = false;
        }
      });
      setDataFilters(copyDataFilters);
    }
    setId(Id);
    setEmailCard((prev) => !prev);
    if (Id !== id) {
      setEmailCard(true);
    }
    if (!emails.some((el) => el?.id === Id)) {
      setEmails((prev) => [
        ...prev,
        {
          favorite: false,
          id: Id,
        },
      ]);
    }
    fetchEmail(Id);
  };

  const handleFavorite = (e, Id) => {
    e?.stopPropagation();
    const arrCopy = [...emails];
    const idx = arrCopy.findIndex((el) => el?.id === Id);
    arrCopy[idx].favorite = !arrCopy[idx].favorite;
    if (arrCopy[idx].favorite === true && filter === "Read") {
      setFilter("Favorites");
      const copyDataFilters = [...dataFilters];
      copyDataFilters.forEach((el, i) => {
        if (i === 3) {
          el.selected = true;
          el.data = [
            ...new Set([
              copyDataFilters[2].data?.filter((el) => el?.id === Id)?.[0],
              ...el.data,
            ]),
          ];
        } else {
          el.selected = false;
        }
      });
      setDataFilters(copyDataFilters);
    } else if (arrCopy[idx].favorite === false && filter === "Favorites") {
      setFilter("Favorites");
      const copyDataFilters = [...dataFilters];
      copyDataFilters[3].data = copyDataFilters[3].data.filter(
        (el) => el?.id !== Id
      );
      setDataFilters(copyDataFilters);
    }
    setEmails(arrCopy);
  };

  const renderValue = (Id) => {
    const idx = emails.findIndex((el) => el?.id === Id);
    return emails?.[idx]?.favorite ? "Unfavorite" : "Favorite";
  };

  return (
    <div className={`card-layout ${emailCard ? "card-clicked" : ""}`}>
      <div
        className={`card-wrapper ${emailCard ? "card-wrapper-clicked" : ""}`}
      >
        {loadingComp &&
          Array(10)
            .fill(0)
            .map(() => <CardLoader />)}
        {!loadingComp && data?.length
          ? data.map((item) => (
              <Card
                avatar={
                  <div className="card-avatar">
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
                date={item?.date ? formatDate(item?.date) : null}
                favoriteBtn={
                  emails?.length && emails.some((el) => el?.id === item?.id) ? (
                    <div
                      className="favorite-btn"
                      onClick={(_) => handleFavorite(_, item?.id)}
                    >
                      {renderValue(item?.id)}
                    </div>
                  ) : null
                }
                emailCard={emailCard}
                handleClickCard={(_) => handleClickCard(_, item?.id)}
                mainClass="card"
                selectedClass={
                  item && id && item?.id === id ? "card-selected" : ""
                }
                readClass={
                  emails?.length && emails.some((el) => el?.id === item?.id)
                    ? "card-read"
                    : ""
                }
              />
            ))
          : null}
      </div>
      {emailCard ? (
        <CardBody
          data={data}
          state={state}
          id={id}
          emails={emails}
          handleFavorite={handleFavorite}
        />
      ) : null}
    </div>
  );
};

export default CardLayout;
