import styled from 'styled-components'

export const Button = styled.button`
margin: 0.1em;
border: none;
font-size: 1em;
width: 2em;
border-radius: 3em;
text-align: center;
color: #1d3557;
background-color: #f1faee;
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
    flex-direction: row;
    align-items: center;
    justify-content: center;
    grid-column: 2;
    grid-row: 3;  
    margin-bottom: 1em;
`

export const Label = styled.div`
    font-family: 'Courier New';
`
