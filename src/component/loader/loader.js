import "./loader.css";
const ApiLoader = (props) => {
  const { isLoading } = props;
  return isLoading && <div className="lo-wrap"></div>;
};

export default ApiLoader;
