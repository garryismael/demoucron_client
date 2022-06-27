const SelectField = ({ name, label, nodes, onSelect }) => {
	return (
		<select name={name} defaultValue='' className="w-32 p-1" onChange={onSelect}>
			<option disabled value=''>
				{label}
			</option>
			{Object.keys(nodes).map((key) => (
				<option key={key} value={key}>
					{nodes[key].text}
				</option>
			))}
		</select>
	);
};

export default SelectField;
