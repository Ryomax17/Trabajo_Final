
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

  document.querySelector('#btnGuardar').addEventListener('click', function (e) {
    e.preventDefault();
    if (validateInputsProfile()) {
      guardarDatos();
      agregarDatosValue();
      mostrarMensajeGuardado();
    }
  });
});



  
  function guardarDatos() {
    const datosUsu = JSON.parse(localStorage.getItem('usuarioChange'));
    let nombre = document.getElementById('txtNombre').value;
    let apellido = document.getElementById('txtApellido').value;
    let telefono=document.getElementById("txtTelefono").value;

    
    if (nombre === "" || apellido === "" || telefono==="") {
      preventDefault();
      validateInputsprofile();
    } else {
      datosUsu.segundoNombre = document.getElementById('txtSegundoNombre').value;
      datosUsu.segundoApellido = document.getElementById('txtSegundoApellido').value;
      datosUsu.telefono = document.getElementById('txtTelefono').value;
    
      localStorage.setItem('usuarioChange', JSON.stringify(datosUsu));
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






  function validateInputsProfile() {
    let formprof = document.getElementById("profileForm");
    let cartelguardado= document.getElementById("cartelguardado");

    let txtNombre = document.getElementById("txtNombre");
    let txtNombrec = txtNombre.value.trim();
    let txtApellido = document.getElementById("txtApellido");
    let txtApellidoc = txtApellido.value.trim();
    let txtTelefono = document.getElementById("txtTelefono");
    let txtTelefonoc = txtTelefono.value.trim();

  
    if (txtNombrec === "") {
      txtNombre.classList.add("is-invalid");
      return false;
    } else {
      txtNombre.classList.remove("is-invalid");
    }
  
    if (txtApellidoc === "") {
      txtApellido.classList.add("is-invalid");
      return false;
    } else {
      txtApellido.classList.remove("is-invalid");
    }

    if (txtTelefonoc === "") {
      txtTelefono.classList.add("is-invalid");
      return false;
    } else {
      txtTelefono.classList.remove("is-invalid");
    }

    cartelguardado.style.display = "block";
    formprof.classList.add("was-validated");
    return true;
  }
