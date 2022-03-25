const pathReducer = (state, action) => {
  let key, text, from, to, distance, arr, arr_link, chemins;
  switch (action.type) {
    case "INSERT_NODE_KEY":
      Object.assign(state, action.payload);
      return state;
    case "UPDATE_NODE_KEY":
      ({ key, text } = action.payload);
      const paths = state;
      state[key].text = text;
      /*
       * Modifier le text des noeuds qui ont des liens
       */
      for (const [k, v] of Object.entries(paths)) {
        for (const link_k of Object.keys(v)) {
          if (link_k !== "text" && paths[k][link_k].to === key) {
            if (state[k][link_k].text !== text) {
              state[k][link_k].text = text;
            }
          }
        }
      }
      return state;
    case "INSERT_LINK_KEY":
      ({ from, to, key } = action.payload);
      state[from][key] = {
        to,
        distance: "0",
        text: state[to].text,
      };
      return state;
    case "SET_DISTANCE":
      ({ key, from, distance } = action.payload);
      state[from][key].distance = distance;
      return state;

    case "REMOVE_NODE_KEY":
      ({ arr, arr_link } = action.payload);
      chemins = state;
      if (arr_link !== undefined) {
        for (const [key_chemin, val] of Object.entries(state)) {
          for (const item of arr_link) {
            if (String(item) in val) {
              delete state[key_chemin][item];
            }
          }
        }
      }
      for (const key of arr) {
        delete state[key];
      }
      return state;
    case "REMOVE_LINK_KEY":
      chemins = state;
      ({ arr } = action.payload);
      for (const [key_chemin, val] of Object.entries(chemins)) {
        for (const item of arr) {
          if (String(item) in val) {
            delete state[key_chemin][item];
          }
        }
      }
      return state;
    default:
      return state;
  }
};

export default pathReducer;
