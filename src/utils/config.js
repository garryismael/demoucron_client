const myConfig = {
  nodeHighlightBehavior: true,
  maxZoom: 3,
  minZoom: 1,
  node: {
    color: "lightgreen",
    size: 300,
    highlightStrokeColor: "blue",
    labelProperty: "id",
    symbolType: "circle",
  },
  link: {
    highlightColor: "lightblue",
    renderLabel: true,
    labelProperty: "source",
  },
};

export default myConfig;
