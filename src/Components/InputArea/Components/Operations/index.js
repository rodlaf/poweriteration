import React from 'react';
import { useStateValue } from '../../../../state';
import { Container, Button } from './styles';

const Operations = () => {
    const [state, setState] = useStateValue();

    const latexOfMat = (mat) => {
        var str = ``;
        mat.forEach(row => {
            row.forEach(
                elt => str += (elt + `&`)
            );
            str = str.slice(0, -1);
            str += String.raw`\\`; 
        })
        str = str.slice(0, -2);
        return String.raw`\left( \begin{array}{ccc}` + str + String.raw`\end{array} \right)`;
    }

    const Switch = () => {
        let tempMatA = state.mats['A'].map(inner => inner.slice());
        let tempMatB = state.mats['B'].map(inner => inner.slice());
        setState({...state, mats: {B: tempMatA, A: tempMatB}});
    }


    const Multiply = () => {
        var P = [];

        var w_A = state.mats['A'][0].length;
        var h_A = state.mats['A'].length;
        var w_B = state.mats['B'][0].length;
        var h_B = state.mats['B'].length;

        if (w_A !== h_B) {
            alert('Not compatible for multiplication');
            return;
        }
        
        var i;
        for (i = 0; i < h_A; i++) {
            var row = [];
            var j;
            for (j = 0; j < w_B; j++) {
                var val = 0;
                var h;
                for (h = 0; h < w_A; h++) {
                    val += state.mats['A'][i][h] * state.mats['B'][h][j];
                }
                row.push(val);
            };
            P.push(row);
        }

        var str = `$$` 
            + latexOfMat(state.mats['A']) 
            + String.raw`\cdot` 
            + latexOfMat(state.mats['B']) 
            + `=`
            + latexOfMat(P) 
        + `$$`;

		setState({...state, display: [str, ...state.display]});
    }

    const Subtract = () => {
        var P = [];

        var w_A = state.mats['A'][0].length;
        var h_A = state.mats['A'].length;
        var w_B = state.mats['B'][0].length;
        var h_B = state.mats['B'].length;

        if (w_A !== w_B || h_A !== h_B) {
            alert('Not compatible for subtraction');
            return;
        }
        
        var i;
        for (i = 0; i < h_A; i++) {
            var row = [];
            var j;
            for (j = 0; j < w_A; j++) {
                row.push(state.mats['A'][i][j] - state.mats['B'][i][j]);
            };
            P.push(row);
        }

        var str = `$$` 
            + latexOfMat(state.mats['A']) 
            + String.raw`-` 
            + latexOfMat(state.mats['B']) 
            + `=`
            + latexOfMat(P) 
        + `$$`;

		setState({...state, display: [str, ...state.display]});
    }

    const Add = () => {
        var P = [];

        var w_A = state.mats['A'][0].length;
        var h_A = state.mats['A'].length;
        var w_B = state.mats['B'][0].length;
        var h_B = state.mats['B'].length;

        if (w_A !== w_B || h_A !== h_B) {
            alert('Not compatible for addition');
            return;
        }
        
        var i;
        for (i = 0; i < h_A; i++) {
            var row = [];
            var j;
            for (j = 0; j < w_A; j++) {
                row.push(state.mats['A'][i][j] + state.mats['B'][i][j]);
            };
            P.push(row);
        }

        var str = `$$` 
            + latexOfMat(state.mats['A']) 
            + String.raw`+` 
            + latexOfMat(state.mats['B']) 
            + `=`
            + latexOfMat(P) 
        + `$$`;

		setState({...state, display: [str, ...state.display]});
    }

    const Rank = () => {
        var P = [];

        var w_A = state.mats['A'][0].length;
        var h_A = state.mats['A'].length;
        var w_B = state.mats['B'][0].length;
        var h_B = state.mats['B'].length;

        if (w_A !== w_B || h_A !== h_B) {
            alert('Not compatible for subtraction');
            return;
        }
        
        var i;
        for (i = 0; i < h_A; i++) {
            var row = [];
            var j;
            for (j = 0; j < w_A; j++) {
                row.push(state.mats['A'][i][j] + state.mats['B'][i][j]);
            };
            P.push(row);
        }

        var str = `$$` 
            + latexOfMat(state.mats['A']) 
            + String.raw`+` 
            + latexOfMat(state.mats['B']) 
            + `=`
            + latexOfMat(P) 
        + `$$`;

		setState({...state, display: [str, ...state.display]});
    }

    const clear = () => (
        setState({...state, display: []})
    );

	return (
        <Container>
            <Button onClick={() => Switch()}>Switch</Button>
            <Button onClick={() => Rank()}>Rank</Button>
            <Button onClick={() => Rank()}>Inverse</Button>
            <Button onClick={() => Rank()}>Determinant</Button>
            <Button onClick={() => Rank()}>Eigenvalues</Button>
            <Button onClick={() => Rank()}>Eigenvectors</Button>
            <Button onClick={() => Rank()}>Transpose</Button>
            <Button onClick={() => Rank()}>Diagonal</Button>
            <Button onClick={() => Multiply()}>x</Button>
            <Button onClick={() => Add()}>+</Button>
            <Button onClick={() => Subtract()}>-</Button>
            <Button onClick={() => clear()}>Clear</Button>
        </Container>
	);
}

export default Operations