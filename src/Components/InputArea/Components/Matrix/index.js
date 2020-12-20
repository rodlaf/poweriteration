import React, { useEffect } from 'react';
import { useStateValue } from '../../../../state';
import DimSizer from './Components/DimSizer/index';
import { TR, Body, Caption, Table, Input } from './styles'

const Matrix = ({ id }) => {
	const [state, setState] = useStateValue();

	const storage = window.localStorage;
    useEffect(() => storage.setItem('mats', JSON.stringify(state.mats)));

    const setCell = (x, y, value) => {
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
                <Body>{Cells} </Body>
                <DimSizer id={id}/>
            </Table> 
		
	);
}

export default Matrix