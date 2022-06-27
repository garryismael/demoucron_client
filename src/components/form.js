import { useState } from 'react';
import SelectField from './select';

const Form = ({ onClick, nodes }) => {
	const [choice, setChoice] = useState('min');
	const [start, setStart] = useState('');
	const [arrival, setArrival] = useState('');

	const choices = { 'min': { text: 'Min' }, 'max': { text: 'Max' } };

	const submit = (e) => {
		e.preventDefault();
		onClick({ choice, start, arrival });
	};

	const onSelectChoice = (e) => {
		setChoice(e.target.value);
	};

	const onSelectStart = (e) => {
		setStart(e.target.value);
	};

	const onSelectArrival = (e) => {
		setArrival(e.target.value);
	};

	const selects = [
		{
			name: 'Choice',
			label: 'Choice',
			onSelect: onSelectChoice,
			nodes: choices,
		},
		{
			name: 'depart',
			label: 'Départ',
			onSelect: onSelectStart,
			nodes,
		},
		{
			name: 'arrive',
			label: 'Arrivée',
			onSelect: onSelectArrival,
			nodes,
		},
	];
	return (
		<form
			onSubmit={submit}
			method='GET'
			className='mr-2 flex flex-row gap-1 justify-end'
		>
			{selects.map((value) => (
				<SelectField
					key={value.name}
					name={value.name}
					label={value.label}
					nodes={value.nodes}
					onSelect={value.onSelect}
				/>
			))}
			<button
				className='ui-button bg-blue-500 text-white pl-5 pr-5 pt-1 pb-1'
				type='submit'
			>
				Change
			</button>
		</form>
	);
};
export default Form;
