import './App.css';
import Diagram from './components/diagram';
import Palette from './components/palette';
import useDiagram from './hooks/useDiagram';
import Form from './components/form';

const App = () => {
	const [paths, nodes, update] = useDiagram();

	const showPath = ({ choice, start, arrival }) => {
		console.log(paths);
	};
	return (
		<>
			<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-2 rounded relative'>
				Error
			</div>
			<Form onClick={showPath} nodes={nodes} />
			<div className='flex'>
				<Palette />
				<Diagram update={update} />
			</div>
		</>
	);
};

export default App;
