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

    const rref = (M) => {

        var w_M = M[0].length;
        var h_M = M.length;
      
        const swapRows = (M, r1, r2) => {
            var temp = M[r1];
            M[r1] = M[r2];
            M[r2] = temp;
        }

        var lead = 0;
        var r;
        loop:
            for (r = 0; r < h_M; ++r) {
                if (w_M <= lead) {
                    break loop;
                }
                var i = r;
                while (M[i][lead] === 0) {
                    ++i;
                    if (h_M == i) {
                        i = r;
                        ++lead;
                        if (w_M = lead) {
                            break loop;
                        }
                    }
                }
                swapRows(M, i, r);
                if (M[r][lead] != 0) {
                    M[r].forEach((x, ind) => M[r][ind] = x / M[r][lead]);
                }
                var i;
                for (i = 0; i < h_M; ++i) {
                    if (i != r) {
                        M[i].forEach((x, ind) => M[i][ind] = x - (M[i][lead] * M[r][ind]))
                    }
                }
                ++lead;
            }
    }

    const doRREF = () => {

        var M = state.mats['A'].map(inner => inner.slice());
        rref(M);

        var str = `$$` 
            + String.raw`\mathrm{rref}`
            + latexOfMat(state.mats['A']) 
            + `=`
            + latexOfMat(M)
            + `$$`;

		setState({...state, display: [str, ...state.display]});
    }
    
    const Inverse = () => {
        var M = state.mats['A'].map(inner => inner.slice());

        var h_M = M.length;
        var w_M = M.length;

        M.forEach((_, ind) => {
            var toAdd = new Array(w_M).fill(0);
            toAdd[ind] = 1;
            M[ind] = M[ind].concat(toAdd)
        });

        rref(M);

        var str = `$$` 
            + String.raw`\mathrm{inverse}`
            + latexOfMat(state.mats['A']) 
            + `=`
            + latexOfMat(M)
            + `$$`;

		setState({...state, display: [str, ...state.display]});
    }

    const Rank = () => {

        var M = state.mats['A'].map(inner => inner.slice());

        rref(M);

        var h_M = M.length;
        var sol = 0;
        var r;
        for (r = 0; r < h_M; ++r) {
            if (M[r].reduce((acc, cum) => acc || cum)) {
                ++sol;
            }
        }

        var str = `$$` 
            + String.raw`\mathrm{rank}`
            + latexOfMat(state.mats['A']) 
            + `=`
            + sol
            + `$$`;

		setState({...state, display: [str, ...state.display]});
    }

    const clear = () => (
        setState({...state, display: []})
    );

	return (
        <Container>
            <Button onClick={() => Switch()}>switch</Button>
            <Button onClick={() => doRREF()}>rref</Button>
            <Button onClick={() => Rank()}>rank</Button>
            <Button onClick={() => Inverse()}>inv</Button>
            <Button onClick={() => Rank()}>det</Button>
            <Button onClick={() => Rank()}>eig</Button>
            <Button onClick={() => Rank()}>diag</Button>
            <Button onClick={() => Multiply()}>x</Button>
            <Button onClick={() => Add()}>+</Button>
            <Button onClick={() => Subtract()}>-</Button>
            <Button onClick={() => clear()}>clear</Button>
        </Container>
	);
}

export default Operations