//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos'); 
const listaCursos = document.querySelector('#lista-carrito tbody');
const varciarCarritoBtn = document.getElementById('vaciar-carrito');

//Eventos
cargarEventListeners();

function cargarEventListeners(){
    //"Agregar carrito"
    cursos.addEventListener('click',comprarCurso);  
    //Cuando se elimina un curso del carrito
    carrito.addEventListener('click',eliminarCurso);
    //Vaciar carrito
    varciarCarritoBtn.addEventListener('click',vaciarCarrito);
    //Al cargar el documento, mostrar el localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);


}



//Funciones
    function comprarCurso(e){
        e.preventDefault();
        //
        if(e.target.classList.contains('agregar-carrito')){
            const curso = e.target.parentElement.parentElement;
            //
            leerDatosCurso(curso);
        }
    }
    //Leer datos curso
    function leerDatosCurso(curso){
        const infoCurso={
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id')
        }
        insertarCarrito(infoCurso);
    }

//Mostrar cursos en el carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td> 
            <img src="${curso.imagen}"
        </td>
        <td> 
            ${curso.titulo}
        </td>
        <td> 
            ${curso.precio}
        </td>
        <td> 
            <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}
//elimina curso del carrito     
function eliminarCurso(e){
    e.preventDefault();
    //
    let curso,
        cursoId;

    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);
}
//Elimina todos los cursos del carrito
function vaciarCarrito() {
    //
    // listaCursos.innerHTML = '';
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    
    //Vaciar localStorage
    vaciarLocalStorage();
    
    return false;
}
//Almacena en el localStorage
function guardarCursoLocalStorage(curso){
    let cursos;
    //
    cursos = obtenerCursosLocalStorage();
    //
    cursos.push(curso);
    //
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function obtenerCursosLocalStorage(){
    let cursosLS;

    if(localStorage.getItem('cursos')=== null){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}
// Traer los cursos de localStorage
function leerLocalStorage(){
    let cursosLS;
    //
    cursosLS = obtenerCursosLocalStorage();
    //
    cursosLS.forEach(curso =>{
        //contruir el template
        const row = document.createElement('tr');
    row.innerHTML = `
        <td> 
            <img src="${curso.imagen}"
        </td>
        <td> 
            ${curso.titulo}
        </td>
        <td> 
            ${curso.precio}
        </td>
        <td> 
            <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
    `;
    listaCursos.appendChild(row);
    }); 

}
//Eliminar curso por ID en LS
function eliminarCursoLocalStorage(curso){
    let cursosLS;
    //
    cursosLS = obtenerCursosLocalStorage();
    //
    cursosLS.forEach(function(cursoLS,index){
        if(cursoLS.id === curso){
            cursosLS.splice(index , 1);
        }
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
    
}

 function vaciarLocalStorage(){
    localStorage.clear();
}