import styled from 'styled-components'

export const Input = styled.input`
    display: flex;
    border: none;
    width: 2em;
    border: 1px solid #1d3557;
    font-size: 1.5em;
    font-family: 'Courier New';
    border-radius: .3em;
    text-align: center;
    background-color: #f1faee;
    color: #1d3557;
    &:hover {
        border: 1px solid #a8dadc;
        color: #a8dadc;
    }
`


export const Table = styled.table`
    margin: 0em 5em 0em 5em;
    display: grid;
    grid-column: ${props => props.id === 'A' ? 1 : 3};
    text-align: center;
    justify-content: center;
`

export const Caption = styled.caption`
    font-family: 'Courier New';
    color: #1d3557;
    font-size: 1.5em;
    margin: 0.5em;
    grid-column: 1 / 3;
    grid-row: 1;
`

export const TR = styled.tr`
`

export const Body = styled.tbody`
    padding: 2em;
    overflow: scroll;
    align-items: center;
    grid-column: 1 / 3;
    grid-row: 2;   
    margin-bottom: 1em;
    width: 20em;
    height: 15em;


`

