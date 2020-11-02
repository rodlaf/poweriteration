import React from 'react';
import { useStateValue } from '../../../../state';
import { Container, Button } from './styles';


const Operations = () => {
    const [state, setState] = useStateValue();

    const cleanMat = (A) => {
        var rows = A.length;
        var columns = A[0].length;

        var i;
        for (i = 0; i < rows; ++i) {
            var j;
            for (j = 0; j < columns; ++j) {
                A[i][j] = parseFloat(parseFloat(A[i][j]).toFixed(8));
            }
        }
    }

    const latexOfMat = (mat) => {
        cleanMat(mat);
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
        } else {
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

    const rref = (A) => {
        var rows = A.length;
        var columns = A[0].length;
        
        var lead = 0;
        for (var k = 0; k < rows; k++) {
            if (columns <= lead) return;
            
            var i = k;
            while (A[i][lead] === 0) {
                i++;
                if (rows === i) {
                    i = k;
                    lead++;
                    if (columns === lead) return;
                }
            }
            var irow = A[i], krow = A[k];
            A[i] = krow;
            A[k] = irow;
             
            var val = A[k][lead];
            for (var j = 0; j < columns; j++) {
                A[k][j] /= val;
            }
             
            for (var i = 0; i < rows; i++) {
                if (i === k) continue;
                val = A[i][lead];
                for (var j = 0; j < columns; j++) {
                    A[i][j] -= val * A[k][j];
                }
            }
            lead++;
        }
        return A;
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

        function arraysEqual(a, b) {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length !== b.length) return false;
            for (var i = 0; i < a.length; ++i) {
              if (a[i] !== b[i]) return false;
            }
            return true;
          }
        
        var isInv = M.reduce((acc, cur, idx) => {
            var toAdd = new Array(w_M).fill(0);
            toAdd[idx] = 1;
            return acc && (arraysEqual(cur.slice(0,w_M), toAdd));
        }, true);

        if (!isInv || state.mats['A'].length != state.mats['A'][0].length) {
            alert("Not invertible")
        } else {
            M.forEach((_, ind) => {
                M[ind] = M[ind].slice(w_M);
            });
    
            var str = `$$` 
                + String.raw`\mathrm{inverse}`
                + latexOfMat(state.mats['A']) 
                + `=`
                + latexOfMat(M)
                + `$$`;
    
            setState({...state, display: [str, ...state.display]});
        }


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

    const det = (M) => 
        M.length == 1 ? M[0][0] :
        M.length == 2 ? M[0][0] * M[1][1] - M[0][1] * M[1][0] :
        M[0].reduce((r,e,i) => 
            r + (-1) ** (i+2) * e * det(M.slice(1).map(c => 
            c.filter((_,j) => i != j))), 0)

    const Determinant = () => {

        if (state.mats['A'].length != state.mats['A'][0].length) {
            alert("Not a square matrix");
        } else {
            var str = `$$` 
            + String.raw`\mathrm{det}`
            + latexOfMat(state.mats['A']) 
            + `=`
            + det(state.mats['A'])
            + `$$`;

            setState({...state, display: [str, ...state.display]});
        }

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
            <Button onClick={() => Determinant()}>det</Button>
            <Button onClick={() => Multiply()}>x</Button>
            <Button onClick={() => Add()}>+</Button>
            <Button onClick={() => Subtract()}>-</Button>
            <Button onClick={() => clear()}>clear</Button>
        </Container>
	);
}

export default Operations