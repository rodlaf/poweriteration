import React from 'react';
import { useStateValue } from '../../../../state';
import { Container, Button, Label, Input } from './styles';


const Operations = () => {
    const [state, setState] = useStateValue();

    // Helper functions for display of solutions
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
        var output = String.raw`\left( \begin{array}{ccc}` 
                    + str + String.raw`\end{array} \right)`;
        return output;
    }

    // Regular matrix multiplication
    const product = (A, B) => {
        var P = [];

        var w_A = A[0].length;
        var h_A = A.length;
        var w_B = B[0].length;
        var h_B = B.length;

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
                    val += A[i][h] * B[h][j];
                }
                row.push(val);
            };
            P.push(row);
        }

        return P;
    }

    // Calculate the norm of a vector
    const norm = (v) => {
        var sum = 0;
        for (var i = 0; i < v.length; ++i) {
            sum += Math.pow(v[i][0], 2);
        }
        return Math.sqrt(sum);
    }


    const PowerIteration = () => {

        if (state.mats['A'].length !== state.mats['A'][0].length) {
            alert('Not a square matrix');
            return;
        }

        var num_sims = state.iterations === "" ? 10 : state.iterations;

        // Select a random vector
        var b_k = new Array(state.mats['A'].length);
        for (var i = 0; i < b_k.length; ++i) {
            var t = Array(1);
            t[0] = Math.random();
            b_k[i] = t;
        }

        // Do the following for num_sims iterations
        for (var k = 0; k < num_sims; ++k) {

            // Calculate product of A and b_k
            b_k = product(state.mats['A'], b_k);

            // Calculate norm
            var n = norm(b_k);

            // Renormalize vector
            for (var j = 0; j < b_k.length; ++j) {
                b_k[j][0] /= n;
            } 
        }

        // Display the result
        var str = `$$` 
        + latexOfMat([b_k])
        + `$$`;
        setState({...state, display: [str]});

        
    };

    const randomvals = () => {
        let newMat = state.mats['A'].map(inner => inner.slice());
        for (var i = 0; i < newMat.length; ++i) {
            for (var j = 0; j < newMat[0].length; ++j) {
                newMat[i][j] = Math.random();
            }
        }
        setState({...state, mats: {...state.mats, 'A': newMat}});
    }
    

	return (
        <Container>
            <Label>Iterations: </Label>
            <Input
                placeholder="10"
                onChange={event => setState({...state, iterations: event.target.value})} 
                type="text"
            />
            <Button onClick={() => randomvals()}>Fill randomly</Button>
            <Button onClick={() => PowerIteration()}>Calculate</Button>
        </Container>
	);
}

export default Operations