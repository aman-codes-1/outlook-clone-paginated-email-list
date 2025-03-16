import axios from "axios";

export const callApi = async ({
  method = "",
  url = "",
  data = {},
  headers = {},
  baseURL = "",
  signal = undefined,
  responseType = "",
}) => {
  const options = {
    method,
    url,
    data,
    baseURL,
    headers,
    responseType,
    ...(signal ? { signal } : {}),
  };
  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const formatDate = (dateValue) => {
  const date = new Date(dateValue);
  return date.toLocaleString([], { dateStyle: 'short', timeStyle: 'short', hour12: true }).replace(/,/g, "").trim();
};
