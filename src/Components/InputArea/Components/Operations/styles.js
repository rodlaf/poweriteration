import styled from 'styled-components'

export const Button = styled.button`
    margin: 0.3m;
    padding: 0.3em;
    width: 6em;
    border: none;
    font-size: 1em;
    border-radius: 3em;
    text-align: center;
    color: #a8dadc;
    background-color: #1d3557;
    font-family: 'Courier New';
    &:hover {
        background-color: #457b9d;
        color: #a8dadc;
    }
    &:active {
        background-color: #a8dadc;
        color: #457b9d;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 20em;
    flex-basis: 0;
    flex: 1 1 0px;
    align-self: center;
    grid-column: 2;
`
