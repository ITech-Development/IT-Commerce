// export const url = "http://localhost:5000/api";
export const url = "http://localhost:3100/";

// export const setHeaders = () => {
//   const headers = {
//     headers: {
//       "x-auth-token": localStorage.getItem("token"),
//     },
//   };

//   return headers;
// };

export const setHeaders = () => {
  const headers = {
    headers: {
      "access_token": localStorage.getItem("access_token"),
    },
  };

  return headers;
};
