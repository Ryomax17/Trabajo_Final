window.onload = agregarEmail;
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#btnGuardar').addEventListener('click', guardarDatos);
});


function guardarDatos() {
    let nombre = document.getElementById('txtNombre').value;
    let segundoNombre = document.getElementById('txtSegundoNombre').value;
    let apellido = document.getElementById('txtApellido').value;
    let segundoApellido = document.getElementById('txtSegundoApellido').value;
    let email = document.getElementById('txtEmail').value;
    let telefono = document.getElementById('txtTelefono').value;

    const datos = {
        nombre,
        segundoNombre,
        apellido,
        segundoApellido,
        email,
        telefono
    };

    localStorage.setItem('datosGuardados', JSON.stringify(datos));

    alert('Datos guardados en el localStorage');
}



// agregar el email al div 
function agregarEmail() {

    let usuarioChange = JSON.parse(localStorage.getItem("usuarioChange"));
    const divFormulario = document.getElementById('txtEmail');
    const nombreGuardado = usuarioChange.email
    divFormulario.value= nombreGuardado;
}
