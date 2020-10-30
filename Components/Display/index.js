import React from 'react';
import { useStateValue } from '../../state';
import { Container, Item } from './styles';

const Display = () => {
    const [state, setState] = useStateValue();

    var Latex = require('react-latex');

    const DisplayItems = state.display.map(str =>
        <Item>
            <Latex displayMode={true}>{str}</Latex>
        </Item>
        
    );

    return (
        <Container>{DisplayItems}</Container>
	);
}

export default Display