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