import './App.css';
import Diagram from './components/diagram';
import Palette from './components/palette';
import useDiagram from './hooks/useDiagram';
import Form from './components/form';
import Matrice from './utils/matrice';
import axios from 'axios';

const URI = 'http://127.0.0.1:8000';

const App = () => {
	const [paths, nodes, update] = useDiagram();

	const showPath = async ({ choice, start, arrival }) => {
		const default_value = choice === 'min' ? null : 0;
		const m = new Matrice(paths, String(start), String(arrival), default_value);
		const url = `${URI}/${choice}`;
		const response = await axios.post(url, {
			matrice: m.matrice,
		});
		console.log(response.data);
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
