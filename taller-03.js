function desglosarString(str, escoger) {
    vocales = [...'aeiouAEIOU'];
    consonantes = [...'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ'];
    const letras = [...str];


    if (escoger === 'vocales') {
        return `Cantidad Vocales: ${letras.filter(letra => vocales.includes(letra)).length}`;
    }

    if (escoger === 'consonantes') {
        return `Cantidad consonantes: ${letras.filter(letra => consonantes.includes(letra)).length}`;
    }
}
console.log(desglosarString("Murcielagos", "vocales"));
console.log(desglosarString("Murcielagos", "consonantes"));

function twoSum(numeros, target){
    
    const i = numeros.findIndex((num) => {
        const match = target - num;
        return numeros.includes(match) && numeros.indexOf(match) !== numeros.indexOf(num);
    })
    const j = numeros.indexOf(target-numeros[i]);

    return ([i,j]);
}
console.log(twoSum([5,6,7,4,2,7], 9));



function conversionRomana(string) {
  const numerosRomanos = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };

  return [...string].reduce((acc, curr, i, arr) => {
    const act = numerosRomanos[curr];
    const sigt = numerosRomanos[arr[i + 1]];

    let suma = 0;
    if (sigt && act < sigt) {
      suma = -act;   // resta
    } else {
      suma = act;    // suma
    }

    return acc + suma;  // acumulamos sobre el total
  }, 0);
}
console.log(conversionRomana("V"));      // 3
