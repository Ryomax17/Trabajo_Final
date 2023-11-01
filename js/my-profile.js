
window.onload = function () {
    agregarEmail();
    agregarDatosValue();
  };
  
  const valueLocal = JSON.parse(localStorage.getItem('datosGuardados')) || {
    nombre: '',
    segundoNombre: '',
    apellido: '',
    segundoApellido: '',
    email: '',
    telefono: ''
  };
  
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#btnGuardar').addEventListener('click', function () {
      guardarDatos();
      agregarDatosValue();
    });
  });
  
  function guardarDatos() {
    let nombre = document.getElementById('txtNombre').value;
    let apellido = document.getElementById('txtApellido').value;
    let btnAlert = document.getElementById('btnGuardar');

    if (nombre !=="" ||apellido !=="" ) {
      let segundoNombre = document.getElementById('txtSegundoNombre').value;
      let segundoApellido = document.getElementById('txtSegundoApellido').value;
      let email = document.getElementById('txtEmail').value;
      let telefono = document.getElementById('txtTelefono').value;
    
      valueLocal.nombre = nombre;
      valueLocal.segundoNombre = segundoNombre;
      valueLocal.apellido = apellido;
      valueLocal.segundoApellido = segundoApellido;
      valueLocal.email = email;
      valueLocal.telefono = telefono;
      localStorage.setItem('datosGuardados', JSON.stringify(valueLocal));
      alert("Datos guardados correctamente")
    }
    alert("Faltan datos")
  }
  
  function agregarDatosValue() {
    const sFistName = document.getElementById('txtSegundoNombre');
    sFistName.value = valueLocal.segundoNombre;
  
    const lastName = document.getElementById('txtApellido');
    lastName.value = valueLocal.apellido;
  
    const sLastName = document.getElementById('txtSegundoApellido');
    sLastName.value = valueLocal.segundoApellido;
  
    const txtTelNum = document.getElementById('txtTelefono');
    txtTelNum.value = valueLocal.telefono;
  
    const firstName = document.getElementById('txtNombre');
    firstName.value = valueLocal.nombre;
  }
  
  function agregarEmail() {
    const datosUsu = localStorage.getItem('usuarioChange');
    const divFormulario = document.getElementById('txtEmail');
    divFormulario.value = datosUsu.email;
  }
  
  function agregarEmail() {
    const datosUsu = JSON.parse(localStorage.getItem('usuarioChange'));
    if (datosUsu) {
      const divFormulario = document.getElementById('txtEmail');
      divFormulario.value = datosUsu.email;
    }
  }