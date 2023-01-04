import * as React from "react";
import Form from "../components/Form";

export default function ElementEdit(props) {
  const [element, setElement] = React.useState({});

  React.useEffect(() => {
    console.log("rendering");
  }, [props]);

  function renderDataForm() {
    return (
      <Form
        base_url={props.base_url}
        detail_url={props.detail_url}
        updateDataAPI={props.updateDataAPI}
      />
    );
  }

  return (
    <React.Fragment>
      <h2 className="mt-4">{props.title}</h2>
      {renderDataForm()}
    </React.Fragment>
  );
}
