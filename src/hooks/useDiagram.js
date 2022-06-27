import { useReducer, useState } from "react";
import pathReducer from "../reducer/chemin";

const useDiagram = () => {
    
    const [paths, dispatchPath] = useReducer(pathReducer, {});
	const [nodes, setNodes] = useState([]);
	
	const update = (e) => {
		const keys = Object.keys(e);
		if (keys.find((v) => v === 'insertedNodeKeys')) {
			const { key, text } = e['modifiedNodeData'][0];
			dispatchPath({
				type: 'INSERT_NODE_KEY',
				payload: {
					[key]: {
						text,
					},
				},
			});
			setNodes((val) => val.concat({ key, text }));
		} else if (keys.find((v) => v === 'modifiedNodeData')) {
			const { key, text } = e['modifiedNodeData'][0];
			dispatchPath({
				type: 'UPDATE_NODE_KEY',
				payload: {
					key,
					text,
				},
			});
			setNodes((val) => {
				return val.map((n) => {
					if (n.key === key) {
						n.text = text;
					}
					return n;
				});
			});
		} else if (keys.find((v) => v === 'insertedLinkKeys')) {
			const { key, from, to } = e['modifiedLinkData'][0];
			dispatchPath({
				type: 'INSERT_LINK_KEY',
				payload: {
					from,
					to,
					key,
				},
			});
		} else if (keys.find((v) => v === 'modifiedLinkData')) {
			const { key, from, color } = e['modifiedLinkData'][0];
			dispatchPath({
				type: 'SET_DISTANCE',
				payload: {
					key,
					from,
					distance: color,
				},
			});
		} else if (keys.find((v) => v === 'removedNodeKeys')) {
			const arr = e['removedNodeKeys'];
			const arr_link = e['removedLinkKeys'];
			dispatchPath({
				type: 'REMOVE_NODE_KEY',
				payload: {
					arr,
					arr_link,
				},
			});
			setNodes((val) => val.filter((n) => !arr.includes(n.key)));
		} else if (keys.find((v) => v === 'removedLinkKeys')) {
			const arr = e['removedLinkKeys'];
			dispatchPath({
				type: 'REMOVE_LINK_KEY',
				payload: {
					arr,
				},
			});
		} else {
			console.log(e);
		}
	};
    return [paths, nodes, update]
};

export default useDiagram;
