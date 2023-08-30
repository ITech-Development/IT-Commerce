export const url = "https://indoteknikserver-732012365989.herokuapp.com/";

export const setHeaders = () => {
  const headers = {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  };

  return headers;
};
