//script para el index
<script
  src="https://widget.cloudinary.com/v2.0/global/all.js"
  type="text/javascript"
></script>;
//funcionalidad
<script src="image-cloudinary.js"></script>;
// inicio
("use strict");
const boton_foto = document.querySelector("#btn-foto");
const imagen = document.querySelector("#floatingInputImage");

let widget_cloudinary = cloudinary.createUploadWidget(
  {
    cloudName: "ddb69vp6o",
    uploadPreset: "not_waste",
  },
  (err, result) => {
    if (!err && result && result.event === "success") {
      console.log("Imagen subida con exito", result.info);
      imagen.value = result.info.secure_url;
    }
  }
);

boton_foto.addEventListener(
  "click",
  () => {
    widget_cloudinary.open();
  },
  false
);
