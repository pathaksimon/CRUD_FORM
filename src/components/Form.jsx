import * as React from "react";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Form(props) {
  const navigate = useNavigate();
  const element = props.element;
  const schema = yup
    .object({
      name: yup.string().required(),
      description: yup.string().required(),
      element_type: yup.mixed().oneOf(["A", "B", "C", "D"]),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...element,
    },
    element,
  });

  React.useEffect(() => {
    reset(element);
  }, [props, reset, element]);

  const onSubmit = (data) => {
    console.log(data);
    if (props.element_id) {
      console.log("Updating:");
      console.log(
        "to " + props.base_url + '/' + props.detail_url + "/" + props.element_id
      );
      props.updateDataAPI(
        props.base_url + '/' + props.detail_url,
        data,
        props.element_id,
        "PUT"
      );
    } else {
      console.log("Posting:");
      console.log(
        "to " + props.base_url + '/' + props.detail_url + "/" + props.element_id
      );
      props.updateDataAPI(props.base_url + '/' + props.detail_url, data, "", "POST");
    }
    navigate(props.home_url + '/' + props.detail_url);
  };
  //console.log(errors);
  return (
    <React.Fragment>
      <div className="box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <div className="control">
              <input
                className="input"
                placeholder="name"
                {...register("name")}
              />
            </div>
            <p className="help is-danger">{errors.name?.message}</p>
          </div>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                type="text"
                placeholder="description"
                {...register("description")}
              />
            </div>
            <p className="help is-danger">{errors.description?.message}</p>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="type"
                {...register("element_type")}
              />
            </div>
            <p className="help is-danger">{errors.element_type?.message}</p>
          </div>
          <div className="buttons">
            <Link to={props.detail_url} className="button is-light">
              Go Back 🔙
            </Link>
            <button className="button is-link" type="submit">
              Submit 📤
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
