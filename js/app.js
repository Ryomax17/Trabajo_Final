const express = require("express");
const jsonwebtoken = require("jsonwebtoken")

const app = express();

const puerto = 3000;

const SECRET_KEY ="clave secreta"

app.use(express.json());


app.listen(puerto, () => {
    console.log("servidor funcionado")
})


app.get("/", (req, res) => {
  // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
  res.send("<h1>Bienvenid@ al servidor</h1>");
});


app.post("/login", (req, res) => {
  const {email , password} = req.body;
  if ((email=== "julieta@gmail.com") && (password=== "123456") ){
    const token = jsonwebtoken.sign({email} , SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});

const cart = require("../emercado-api/user_cart/25801.json")

app.use("/cart", (req, res, next) => {
  try {
    const decoded = jsonwebtoken.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.get("/cart", (req, res) => {
    res.json(cart)
})


