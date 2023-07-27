export const url = "http://localhost:3100/";

export const setHeaders = () => {
  const headers = {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  };

  return headers;
};
