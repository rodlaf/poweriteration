import React from 'react';
import { useStateValue } from '../../../../../../state';
import { Label, Container, Button } from './styles';

const ColSizer = ({ id }) => {
    const [state, setState] = useStateValue();

    const addColumn= () => {
        let newMat = state.mats[id].map(inner => inner.slice());
        newMat.forEach(row => row.push(0));
		setState({...state, mats: {...state.mats, [id]: newMat}});
    }
    
    const removeColumn= () => {
        if (state.mats[id][0].length > 1) {
            let newMat = state.mats[id].map(inner => inner.slice());
            newMat.forEach(row => row.pop());
            setState({...state, mats: {...state.mats, [id]: newMat}});
        } 
	}
	return (
        <Container>
            <Label>Columns:</Label>
            <Button onClick={() => removeColumn()}>-</Button>
            <Label>/</Label>
            <Button onClick={() => addColumn()}>+</Button>
        </Container>
	);
}

export default ColSizer