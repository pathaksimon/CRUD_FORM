import React from "react";

import { Route, Routes } from "react-router-dom";
import ElementsList from "./pages/ElementsList";
import ElementDetail from "./pages/ElementDetail";
import ElementEdit from "./pages/ElementEdit";
import ElementAdd from "./pages/ElementAdd";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const app_title = "React CRUD Client";
  const list_title = "Elements List";
  const detail_title = "Element Detail";
  const edit_title = "Edit Element";
  const add_title = "Add Element";
  const base_url = "http://127.0.0.1:8000/api";

  const home_url = "/";
  const list_url = "/elements";
  const detail_url = "/:element_id";
  const edit_url = "/edit";
  const add_url = "/add";

  const [elements, setElements] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    //NOTE: React in Strict Mode (when developing and not in deployment) calls this twice!
    getDataAPI(base_url + list_url);
  }, [base_url, list_url]);

  const getDataAPI = (url) => {
    setLoading(true);
    console.log("Fetching data from: " + url);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          console.log("Response: " + response);
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully fetched data from: " + url);
        setElements(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteDataAPI = (url, id) => {
    setLoading(true);
    fetch(url + "/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw Error(response.statusText);
        } else {
          setElements((prevElements) => {
            const newElements = prevElements.filter((item) => item.id !== id);
            console.log("Deleted element with id " + id);
            setLoading(false);
            return newElements;
          });
        }
        //return response.json();
      })
      .then((data) => data)
      .catch((err) => console.log(err.message));
  };

  const updateDataAPI = (url, data_dict, id = "", method) => {
    const is_post = method === "POST";
    setLoading(true);
    console.log(
      "Fetching data from: " + url + "/" + id + " with method: " + method
    );
    fetch(url + "/" + id, {
      method: method,
      body: JSON.stringify({
        ...data_dict,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Obtained Response: " + response);
          console.log("While trying to update/post data: " + data_dict);
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (is_post) {
          setElements((prevElements) => {
            const newElements = [...prevElements, data];
            console.log(
              "Created element with id " + data.id + " with name: " + data.name
            );
            setLoading(false);
            return newElements;
          });
        } else {
          setElements((prevElements) => {
            const newElements = prevElements.map((item) => {
              if (item.id !== id) {
                return item;
              } else {
                return data;
              }
            });
            console.log(
              "Updated element with id " + id + " with name: " + data.name
            );
            setLoading(false);
            return newElements;
          });
        }
      })
      .catch((err) => console.log(err.message));
  };

  const findElement = (data, id) => {
    console.log("Searching for element with id: " + id);
    const el = data.filter((element) => element.id === parseInt(id))[0];
    if (el) {
      console.log("Found element:\n");
      console.log(el);
      return el;
    } else {
      console.log("Element not found!");
      return false;
    }
  };

  return (
    <React.Fragment>
      <Routes>
        <Route path={home_url} element={<SharedLayout app_title={app_title} />}>
          <Route
            index
            element={<Home base_url={base_url} list_url={list_url} />}
          />
          <Route
            path={list_url}
            element={
              <ElementsList
                title={list_title}
                data={elements}
                getDataAPI={getDataAPI}
                deleteDataAPI={deleteDataAPI}
                base_url={base_url}
                detail_url={list_url}
                edit_url={edit_url}
                add_url={add_url}
                loading={loading}
              />
            }
          />
          <Route
            path={list_url + detail_url}
            element={
              <ElementDetail
                title={detail_title}
                data={elements}
                findElement={findElement}
                deleteDataAPI={deleteDataAPI}
                base_url={base_url}
                detail_url={list_url}
                edit_url={edit_url}
              />
            }
          />
          <Route
            path={edit_url + detail_url}
            element={
              <ElementEdit
                title={edit_title}
                data={elements}
                findElement={findElement}
                updateDataAPI={updateDataAPI}
                base_url={base_url}
                detail_url={list_url}
              />
            }
          />
          <Route
            path={add_url}
            element={
              <ElementAdd
                title={add_title}
                updateDataAPI={updateDataAPI}
                base_url={base_url}
                detail_url={list_url}
              />
            }
          />
          <Route path="*" element={<NotFound home_url={home_url} />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
