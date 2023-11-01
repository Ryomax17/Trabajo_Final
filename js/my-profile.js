
window.onload = function () {
    agregarEmail();
    agregarDatosValue();
  };
  
document.addEventListener('DOMContentLoaded', function () {
  const imageInput = document.getElementById('imageInput');
  const profileImage = document.getElementById('profileImage');
  const storedImageUrl = localStorage.getItem('userProfileImage');

  if (storedImageUrl) {
    profileImage.src = storedImageUrl;
  }

  imageInput.addEventListener('change', function (event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = function (e) {
        profileImage.src = e.target.result;
        localStorage.setItem('userProfileImage', e.target.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  });

  document.querySelector('#btnGuardar').addEventListener('click', function () {
     guardarDatos();
    agregarDatosValue();
   });
});
  
  function guardarDatos() {
    const datosUsu = JSON.parse(localStorage.getItem('usuarioChange'));
    let nombre = document.getElementById('txtNombre').value;
    let apellido = document.getElementById('txtApellido').value;

    if (nombre === "" || apellido === "") {
      alert('Faltan datos');
    } else {
      datosUsu.segundoNombre = document.getElementById('txtSegundoNombre').value;
      datosUsu.segundoApellido = document.getElementById('txtSegundoApellido').value;
      datosUsu.telefono = document.getElementById('txtTelefono').value;
    
      localStorage.setItem('usuarioChange', JSON.stringify(datosUsu));
      alert('Datos guardados'); 
    }
  }
  
  function agregarDatosValue() {
    const datosUsu = JSON.parse(localStorage.getItem('usuarioChange'));
    console.log(datosUsu);
    
    const sFistName = document.getElementById('txtSegundoNombre');
    sFistName.value = datosUsu.segundoNombre || "";
  
    const lastName = document.getElementById('txtApellido');
    lastName.value = datosUsu.apellido || "";
  
    const sLastName = document.getElementById('txtSegundoApellido');
    sLastName.value = datosUsu.segundoApellido || "";
  
    const txtTelNum = document.getElementById('txtTelefono');
    txtTelNum.value = datosUsu.telefono || "";
  
    const firstName = document.getElementById('txtNombre');
    firstName.value = datosUsu.nombre || "";
  }
  
  function agregarEmail() {
    const datosUsu = JSON.parse(localStorage.getItem('usuarioChange'));
    if (datosUsu) {
      const divFormulario = document.getElementById('txtEmail');
      divFormulario.value = datosUsu.email;
    }
  }