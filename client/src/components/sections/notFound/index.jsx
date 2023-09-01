const NotFound = () => {
  return (
    <div
      className="notfound"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  );
};

export default NotFound;
