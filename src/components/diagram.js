import { ReactDiagram } from "gojs-react";
import myConfig from "../utils/config";
import initDiagram from "../utils/diagram";

const Diagram = ({ update }) => {
  return (
    <div className="w-5/6">
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="gojs-component"
        onModelChange={update}
        skipsDiagramUpdate={true}
        config={myConfig}
      />
    </div>
  );
};

export default Diagram;
