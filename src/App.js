import './App.css';
import Diagram from './components/diagram';
import Palette from './components/palette';
import pathReducer from './reducer/chemin';
import nodeReducer from './reducer/node';
import Form from './components/form';
import { useReducer } from 'react';
import changeDiagram from './utils/action';

const App = () => {
	const [paths, dispatchPath] = useReducer(pathReducer, {});
  const [nodes, dispatchNodes] = useReducer(nodeReducer, {});
	const update = (e) => {
		changeDiagram(e, dispatchPath, dispatchNodes);
	};
  const showPath = () => {
    console.log(paths);
  }
	return (
		<>
			<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-2 rounded relative">Error</div>
			<Form onClick={showPath} selects={nodes}/>
			<div className='flex'>
				<Palette />
				<Diagram update={update} />
			</div>
		</>
	);
};

export default App;
