import ErrorPage from "../components/global/ErrorPage";

const FallbackErr = ({ error, isNavbar = false }) => {
  return (
    <ErrorPage
      btnAction={{
        onClick: () => {
          window?.location?.reload();
        },
        text: "Refresh",
      }}
      subTitle={error}
      title={`Error ${isNavbar ? "in navbar" : ""}`}
    />
  );
};
export default FallbackErr;
