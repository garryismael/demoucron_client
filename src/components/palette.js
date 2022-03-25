import { ReactDiagram } from "gojs-react";
import initPalette from "../utils/palette";

const Palette = () => {
  return (
    <div className="col-2">
      <ReactDiagram
        initDiagram={initPalette}
        divClassName="gojs-component"
        nodeDataArray={[
          { key: 0, text: "Circle", color: "lightblue", loc: "0 0" },
        ]}
      />
    </div>
  );
};

export default Palette;
