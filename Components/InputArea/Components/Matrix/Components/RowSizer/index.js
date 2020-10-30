import React from 'react';
import { useStateValue } from '../../../../../../state';
import { Label, Container, Button } from './styles';

const RowSizer = ({ id }) => {
    const [state, setState] = useStateValue();

    const addRow= () => {
        let newRow = [];
        var i;
        for (i = 0; i < state.mats[id][0].length; i++) {
            newRow.push(0);
        }
        let newMat = state.mats[id].map(inner => inner.slice());
        newMat.push(newRow);
		setState({...state, mats: {...state.mats, [id]: newMat}});
    }
    
    const removeRow= () => {
        if (state.mats[id].length > 1) {
            let newMat = state.mats[id].map(inner => inner.slice());
            newMat.pop();
            setState({...state, mats: {...state.mats, [id]: newMat}});
        }
	}

	return (
        <Container>
            <Label>Rows: </Label>
            <Button onClick={() => removeRow()}>-</Button>
            <Label>/</Label>
            <Button onClick={() => addRow()}>+</Button>
        </Container>
	);
}

export default RowSizer