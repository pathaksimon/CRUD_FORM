import * as React from "react";
import Element from "../components/Element.jsx";
import { useParams, useNavigate } from "react-router-dom";

export default function ElementDetail(props) {
  const { element_id } = useParams();
  const navigate = useNavigate();
  const [element, setElement] = React.useState({});

  React.useEffect(() => {
    setElement(() => props.findElement(props.data, element_id));
  }, [props.data, element_id]);

  const deleteRedirect = (base_url, id) => {
    props.deleteDataAPI(base_url, id);
    navigate(props.detail_url);
  };

  return (
    <React.Fragment>
      <h2 className="mt-4">{props.title}</h2>
      {element ? (
        <Element
          key={element.id}
          base_url={props.base_url}
          detail_url={props.detail_url}
          edit_url={props.edit_url}
          details_button={false}
          element={element}
          deleteDataAPI={deleteRedirect}
        />
      ) : (
        <progress className="progress is-large is-primary" max="100"></progress>
      )}
    </React.Fragment>
  );
}
