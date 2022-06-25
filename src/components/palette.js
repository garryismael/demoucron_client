import { ReactDiagram } from "gojs-react";
import initPalette from "../utils/palette";

const Palette = () => {
  return (
    <div className="w-1/6">
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
