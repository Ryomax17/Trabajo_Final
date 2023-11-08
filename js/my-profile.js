
window.onload = function () {
  addEmail();
  addDataValue();
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
      exportData();
      addDataValue();
    }
  });
});

function exportData() {
  const userData = JSON.parse(localStorage.getItem('loggedUser'));
  let name = document.getElementById('txtNombre').value;
  let lastname = document.getElementById('txtApellido').value;
  let phoneNumber = document.getElementById("txtTelefono").value;


  if (name === "" || lastname === "" || phoneNumber === "") {
    preventDefault();
    validateInputsprofile();
  } else {
    userData.name = name;
    userData.lastname = lastname;
    userData.phoneNumber = phoneNumber;
    userData.secondName = document.getElementById('txtSegundoNombre').value;
    userData.secondLastname = document.getElementById('txtSegundoApellido').value;

    localStorage.setItem('loggedUser', JSON.stringify(userData));
  }
}

function addDataValue() {
  const userData = JSON.parse(localStorage.getItem('loggedUser'));
  console.log(userData);

  const firstName = document.getElementById('txtNombre');
  firstName.value = userData.name || "";

  const secondName = document.getElementById('txtSegundoNombre');
  secondName.value = userData.secondName || "";

  const lastname = document.getElementById('txtApellido');
  lastname.value = userData.lastname || "";

  const secondLastname = document.getElementById('txtSegundoApellido');
  secondLastname.value = userData.secondLastname || "";

  const txtTelNum = document.getElementById('txtTelefono');
  txtTelNum.value = userData.phoneNumber || "";

}

function addEmail() {
  const userData = JSON.parse(localStorage.getItem('loggedUser'));
  if (userData) {
    const divFormulario = document.getElementById('txtEmail');
    divFormulario.value = userData.email;
  }
}

function validateInputsProfile() {
  let formprof = document.getElementById("profileForm");
  let cartelguardado = document.getElementById("cartelguardado");

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
