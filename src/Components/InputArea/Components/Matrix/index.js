import React, { useEffect } from 'react';
import { useStateValue } from '../../../../state';
import RowSizer from './Components/RowSizer/index';
import ColSizer from './Components/ColSizer/index';
import { TR, Body, Caption, Table, Input } from './styles'

const Matrix = ({ id }) => {
	const [state, setState] = useStateValue();

	const storage = window.localStorage;
    useEffect(() => storage.setItem('mats', JSON.stringify(state.mats)));

    const setCell = (x, y, value) => {
        if (value != "" && value != "-" && isNaN(value)) {
            alert("Please input real numbers only");
        }
        if (!value === "-") {
            value = parseInt(value);
        }
        let newMat = state.mats[id].map(inner => inner.slice());
        newMat[x][y] = value;
        setState({...state, mats: {...state.mats, [id]: newMat}});
	}

	const Cells = state.mats[id].map((row, i) =>
        <TR> {row.map((col, j) => 
                <th> <Input 
                        type= "text" 
                        value = {Number.isNaN(col) ? "" : col}
                        onChange={event => setCell(i, j, event.target.value)}
                        /> </th>
            )} </TR>
    );
    
	return (
            <Table id={id}>
                <Caption>{id}</Caption>
                <Body>{Cells} </Body>
                <RowSizer id={id}/>
                <ColSizer id={id}/> 
            </Table> 
		
	);
}

export default Matrix