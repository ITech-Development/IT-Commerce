const indexStyles = {
  container: {
    maxWidth: "100%",
    padding: "0 20px",
    textAlign: "center",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#333",
    display: "flex",
    marginBottom: "10px",
    flexDirection: "column",
    padding: "20px",
  },
  subtitle: {
    paddingTop: "10px",
    fontSize: "16px",
    color: "#777",
  },
};

const smallScreenMediaQuery = "@media (max-width: 768px)";

indexStyles.container = {
  ...indexStyles.container,
  [smallScreenMediaQuery]: {
    padding: "0 10px",
  },
};

indexStyles.title = {
  ...indexStyles.title,
  [smallScreenMediaQuery]: {
    fontSize: "28px",
    marginBottom: "5px",
  },
};

indexStyles.subtitle = {
  ...indexStyles.subtitle,
  [smallScreenMediaQuery]: {
    fontSize: "16px",
  },
};

export default indexStyles;
