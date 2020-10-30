import React from 'react';
import Matrix from './Components/Matrix/index'
import Operations from './Components/Operations/index'
import { Container } from './styles';


const InputArea = () => (
    <Container>
        <Matrix id={"A"}/>
        <Operations> </ Operations>
        <Matrix id={"B"}/>
    </Container>
)

export default InputArea