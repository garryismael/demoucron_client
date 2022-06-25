import { useState } from 'react';

const Form = (props) => {
	const [debuts, setDebuts] = useState([]);
	const [ends, setEnds] = useState([]);
  
	const submit = (e) => {
		e.preventDefault();
		props.onClick();
	};
	return (
		<form
			onSubmit={submit}
			method='GET'
			className='mr-2 flex flex-row gap-1 justify-end'
		>
			<select>
      <option value=''>Debut</option>
				{debuts.map((debut) => (
					<option key={debut.key} value={debut.key}>
						{debut.text}
					</option>
				))}
			</select>
			<select>
      <option value=''>Fin</option>
				{ends.map((end) => (
					<option key={end.key} value={end.key}>
						{end.text}
					</option>
				))}
			</select>
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
