import styled from 'styled-components'

export const Button = styled.button`
    margin-top: 1em;
    padding: 0.3em;
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

export const Label = styled.div`
    font-family: 'Courier New';
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0.5em;
`

export const Input = styled.input`
    display: flex;
    border: none;
    width: 2em;
    border: 1px solid #1d3557;
    font-size: 1.5em;
    font-family: 'Courier New';
    border-radius: .3em;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    background-color: #f1faee;
    color: #1d3557;
    &:hover {
        background-color: #a8dadc;
    }
`