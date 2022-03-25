import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Diagram from "./components/diagram";
import Palette from "./components/palette";
import Error from "./components/errors";
import React from "react";
import pathReducer from "./reducer/chemin";
import Form from "./components/form";

const App = () => {
  const [paths, dispatchPath] = React.useReducer(pathReducer, {});
  const update = (e) => {
    const keys = Object.keys(e);
    if (keys.find((v) => v === "insertedNodeKeys")) {
      const { key, text } = e["modifiedNodeData"][0];
      dispatchPath({
        type: "INSERT_NODE_KEY",
        payload: {
          [key]: {
            text,
          },
        },
      });
    } else if (keys.find((v) => v === "modifiedNodeData")) {
      const { key, text } = e["modifiedNodeData"][0];
      dispatchPath({
        type: "UPDATE_NODE_KEY",
        payload: {
          key,
          text,
        },
      });
    } else if (keys.find((v) => v === "insertedLinkKeys")) {
      const { key, from, to } = e["modifiedLinkData"][0];
      dispatchPath({
        type: "INSERT_LINK_KEY",
        payload: {
          from,
          to,
          key,
        },
      });
    } else if (keys.find((v) => v === "modifiedLinkData")) {
      const { key, from, color } = e["modifiedLinkData"][0];
      dispatchPath({
        type: "SET_DISTANCE",
        payload: {
          key,
          from,
          distance: color,
        },
      });
    } else if (keys.find((v) => v === "removedNodeKeys")) {
      const arr = e["removedNodeKeys"];
      const arr_link = e["removedLinkKeys"];
      dispatchPath({
        type: "REMOVE_NODE_KEY",
        payload: {
          arr,
          arr_link,
        },
      });
    } else if (keys.find((v) => v === "removedLinkKeys")) {
      const arr = e["removedLinkKeys"];
      dispatchPath({
        type: "REMOVE_LINK_KEY",
        payload: {
          arr,
        },
      });
    } else {
      console.log(e);
    }
  };
  const display = () => {
    // const matrice_carre = Object.keys(chemins).length;
    // const matrice = Array(matrice_carre).fill(Array(matrice_carre).fill(0));
    console.log(paths);
  };

  return (
    <div>
      <Error />
      <Form />
      <div className="row">
        <Palette />
        <Diagram update={update} />
      </div>
      <div className="row button">
        <button
          type="button"
          className="col btn btn-success p-3"
          onClick={display}
        >
          Chemin
        </button>
        <button type="button" className="col btn btn-danger p-3 left">
          Effacer
        </button>
      </div>
    </div>
  );
};

export default App;
