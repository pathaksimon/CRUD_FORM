import * as React from "react";
import Element from "../components/Element";
import { Link } from "react-router-dom";

export default function ElementList(props) {
  const getData = () => {
    props.getDataAPI(props.base_url + '/' + props.detail_url);
  };
  React.useEffect(() => {
    getData();
  }, []);

  function renderDataElements() {
    return props.data.map((element) => {
      return (
        <Element
          key={element.id}
          base_url={props.base_url}
          home_url={props.home_url}
          detail_url={props.detail_url}
          edit_url={props.edit_url}
          details_button={true}
          element={element}
          deleteDataAPI={props.deleteDataAPI}
        />
      );
    });
  }

  return (
    <React.Fragment>
      <h2 className="mt-4">{props.title}</h2>
      <div className="buttons">
        <Link to={props.home_url + '/' + props.add_url} className="button is-light is-success">
          Add Element ➕
        </Link>
      </div>
      {props.loading ? (
        <h1>
          <progress
            className="progress is-large is-primary"
            max="100"
          ></progress>
        </h1>
      ) : (
        renderDataElements()
      )}
    </React.Fragment>
  );
}
