import "../loader/loader.css";
const ApiLoader = (props) => {
  const { isLoading } = props;
  return isLoading && <div class="lo-wrap"></div>;
};

export default ApiLoader;
