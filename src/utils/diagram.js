import * as go from "gojs";
/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram = $(go.Diagram, {
    "undoManager.isEnabled": true, // must be set to allow for model change listening
    'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
    "clickCreatingTool.archetypeNodeData": {
      text: "Point",
      color: "lightblue",
    },
    model: new go.GraphLinksModel({
      linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    "Auto", // the Shape will go around the TextBlock
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    $(
      go.Shape,
      "Circle",
      {
        name: "SHAPE",
        fill: "white",
        stroke: "gray",
        strokeWidth: 2,
        portId: "",
        fromLinkable: true,
        toLinkable: true,
        fromLinkableDuplicates: false,
        toLinkableDuplicates: false,
        fromLinkableSelfNode: false,
        toLinkableSelfNode: false,
      },

      // Shape.fill is bound to Node.data.color
      new go.Binding("fill", "color")
    ),
    $(
      go.TextBlock,
      { margin: 8, editable: true }, // some room around the text
      new go.Binding("text").makeTwoWay()
    )
  );

  diagram.linkTemplate = $(
    go.Link,
    {
      routing: go.Link.Link,
      corner: 5,
      relinkableFrom: true,
      relinkableTo: true,
      reshapable: true,
      resegmentable: true,
      textEditable: true,
    },
    $(go.Shape),
    $(go.Shape, { toArrow: "Standard" }),
    $(
      go.Panel,
      "Auto",
      { _isLinkLabel: true }, // marks this Panel as being a draggable label
      $(go.Shape, { fill: "white" }),
      $(
        go.TextBlock,
        "0",
        { margin: 3, editable: true },
        new go.Binding("text", "color").makeTwoWay()
      ),
      // remember any modified segment properties in the link data object
      new go.Binding("segmentIndex").makeTwoWay()
    )
  );
  return diagram;
}

export default initDiagram;
