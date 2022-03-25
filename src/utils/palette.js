import * as go from "gojs";

function createPalette() {
    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html
    const $ = go.GraphObject.make;
  
    // initialize main Diagram
    const myDiagram = $(go.Diagram, {
      "undoManager.isEnabled": true,
    });
  
    myDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      { locationSpot: go.Spot.Center },
      new go.Binding("location", "location", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(
        go.Shape,
        "Circle",
        {
          fill: "white",
          stroke: "gray",
          strokeWidth: 2,
          portId: "",
          fromLinkable: true,
          toLinkable: true,
          fromLinkableDuplicates: true,
          toLinkableDuplicates: true,
          fromLinkableSelfNode: true,
          toLinkableSelfNode: true,
        },
        new go.Binding("stroke", "color"),
        new go.Binding("figure")
      ),
      $(
        go.TextBlock,
        {
          margin: new go.Margin(5, 5, 3, 5),
          font: "10pt sans-serif",
          minSize: new go.Size(16, 16),
          maxSize: new go.Size(120, NaN),
          textAlign: "center",
          editable: true,
        },
        new go.Binding("text").makeTwoWay()
      )
    );
  
    // initialize Palette
    const myPalette = $(go.Palette, {
      nodeTemplate: myDiagram.nodeTemplate,
      contentAlignment: go.Spot.Center,
      layout: $(go.GridLayout, {
        wrappingColumn: 1,
        cellSize: new go.Size(2, 2),
      }),
    });
  
    // now add the initial contents of the Palette
    myPalette.model.nodeDataArray = [
      { text: "Point", color: "blue", figure: "Circle" }
    ];
    return myPalette;
  }

  export default createPalette;