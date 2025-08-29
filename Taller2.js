
function findMax(lista) {
    let max = lista[0]; 
    for (let i = 1; i < lista.length; i++) {
        if (lista[i] > max) {
            max = lista[i];
        }
    }
    return max;
}


function includes(lista, numero) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] === numero) {
            return true;
        }
    }
    return false;
}


function sum(lista) {
    let total = 0;
    for (let i = 0; i < lista.length; i++) {
        total += lista[i];
    }
    return total;
}

function missingNumbers(lista) {
    let min = lista[0];
    let max = lista[0];
    for (let i = 1; i < lista.length; i++) {
        if (lista[i] < min) {
            min = lista[i];
        }
        if (lista[i] > max) {
            max = lista[i];
        }
    }

    let faltantes = [];
    for (let num = min; num <= max; num++) {
        let existe = false;
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] === num) {
                existe = true;
                break;
            }
        }
        if (!existe) {
            faltantes.push(num);
        }
    }
    return faltantes;
}


console.log(findMax([3, 17, -1, 4, -19])); 
console.log(includes([3, 17, -1, 4, -19], 2));
console.log(includes([3, 17, -1, 4, -19], 4));
console.log(sum([3, 17, -1, 4, -19])); 
console.log(missingNumbers([7, 2, 4, 6, 3, 9]));