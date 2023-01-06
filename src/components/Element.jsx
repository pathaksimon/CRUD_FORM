import * as React from "react";
import { Link } from "react-router-dom";

export default function Element(props) {
  const detail = props.details_button ? true : false;

  const listProperties = () => {
    return Object.keys(props.element).map((key) => {
      return (
        <>
          <p>
            <span className="is-capitalized is-rounded tag is-medium is-light">
              {key}
            </span>
            <span className=""> {props.element[key]}</span>
          </p>
        </>
      );
    });
  };
  return (
    //change the props.element.name to props.element.id to display the id instead of the name or other properties
    <React.Fragment>
      <div className="box">
        <h3>{props.element.name}</h3>
        {listProperties()}
        <hr />
        <div className="buttons">
          {detail ? (
            <Link
              className="button is-link is-light"
              to={props.home_url + "/" + props.detail_url + '/' + props.element.id}
            >
              Details 🔎
            </Link>
          ) : (
            <Link className="button is-light" to={props.home_url + '/' + props.detail_url}>
              Go Back 🔙
            </Link>
          )}
          <Link
            className="button is-light is-success"
            to={props.home_url + "/" + props.edit_url + "/" + props.element.id}
          >
            Edit ✏️
          </Link>
          <button
            className="button is-danger is-light"
            onClick={() =>
              props.deleteDataAPI(
                props.base_url + '/' + props.detail_url,
                props.element.id
              )
            }
          >
            Delete ❌
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
