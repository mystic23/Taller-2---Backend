const datos = require("./datos.json");


function puntoUno(estudiantes, extracurricular) {
  return (estudiantes ?? [])
    .filter(est =>
      (est.info_extra_curriculares ?? [])
        .some(extra => extra.nombre === extracurricular)
    )
    .map(est => est.info_personal?.correo)
    .filter(Boolean);
}
//AUUX
const semestreActual = (est) =>
  (est?.info_matricula ?? [])
    .map(c => c?.semestre ?? 0)
    .reduce((max, s) => (s > max ? s : max), 0);

const notaFinalCurso = (curso) =>
  (curso?.notas ?? [])
    .reduce((acc, n) => acc + (Number(n?.nota) || 0) * (Number(n?.peso) || 0), 0);

const promedioAlumno = (est) => {
  const cursos = est?.info_matricula ?? [];
  if (cursos.length === 0) return 0;
  const suma = cursos.map(notaFinalCurso).reduce((a, b) => a + b, 0);
  return suma / cursos.length;
};


function puntoDos(estudiantes, semestre) {
  const candidatos = (estudiantes ?? [])
    .filter(e => semestreActual(e) === semestre)
    .map(e => ({ e, prom: promedioAlumno(e) }));

  if (candidatos.length === 0) return null;

  const mejor = candidatos.reduce((best, cur) => (cur.prom > best.prom ? cur : best));
  const nombre = mejor.e?.info_personal?.nombre ?? "";
  const apellido = mejor.e?.info_personal?.apellido ?? "";
  return `${nombre} ${apellido}`.trim();
}

//estructura, DEBO HACER ALOG CON LA FECHA PA LA EDAD
// ```js
// {
//   "gender": "M",
//   "titulo": "Sr.",
//   "nombreCompleto" : "Luis Molina",
//   "primerNombre": "Luis",
//   "primerApellido": "Molina",
//   "altura": 182,
//   "edad": 19,
//   "nacimiento": "2004-10-14",
//   "correo": "lmolina@uninorte.edu.co",
//   "usuario": "lmolina"
// },
// ```
//AUX
const edadDesdeFecha = (isoStr) => {
  const hoy = new Date();
  const n = new Date(isoStr);
  if (isNaN(n.getTime())) return null;
  let edad = hoy.getFullYear() - n.getFullYear();
  const m = hoy.getMonth() - n.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < n.getDate())) edad--;
  return edad;
};

function puntoTres(estudiantes) {
  return (estudiantes ?? [])
    .filter(e => semestreActual(e) === 1)
    .map(e => {
      const info = e.info_personal ?? {};
      const nombre = info.nombre ?? "";
      const apellido = info.apellido ?? "";
      const primerNombre = nombre.split(" ")[0] ?? "";
      const primerApellido = apellido.split(" ")[0] ?? "";
      return {
        gender: info.gender ?? "", titulo: info.gender === "M" ? "Sr." : info.gender === "F" ? "Sra." : "",
        nombreCompleto: `${nombre} ${apellido}`.trim(),
        primerNombre,primerApellido,
        altura: Math.round((info.altura ?? 0) * 100),
        edad: edadDesdeFecha(info.nacimiento),
        nacimiento: info.nacimiento ?? "",
        correo: info.correo ?? "",usuario: (info.correo ?? "").split("@")[0] ?? ""
      };
    });
}

function puntoCuatro(estudiantes) {
  const candidatos = (estudiantes ?? [])
    .filter(e =>
      (e.info_extra_curriculares ?? [])
        .some(extra => extra.nombre === "Baloncesto")
    )
    .map(e => ({ e, altura: Math.round((e?.info_personal?.altura ?? 0) * 100) }));  
  if (candidatos.length === 0) return null;
  const masAlto = candidatos.reduce((tallest, cur) => (cur.altura > tallest.altura ? cur : tallest));
  const nombre = masAlto.e?.info_personal?.nombre ?? "";
  const apellido = masAlto.e?.info_personal?.apellido ?? "";

    return {
    nombreCompleto: `${nombre} ${apellido}`.trim(),
    altura: masAlto.altura/100
  };  
} 


console.log(puntoUno(datos, "INNOVA"));
console.log(puntoDos(datos, 5));
console.log(puntoTres(datos));
console.log(puntoCuatro(datos));

