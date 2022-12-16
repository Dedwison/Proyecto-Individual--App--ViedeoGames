import { useState } from "react";
import categories from "./categories";
import { v4 as uuidv4 } from "uuid";
import { validate } from "./auxiliary";
import { useDispatch } from "react-redux";
import { postCustomer, postSeller } from "../../redux/actions";
import { Image } from "cloudinary-react";

function Register(props) {
  console.log(props);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    supplier: false,
    image: props.picture,
    email: props.email.toLowerCase(),
    name: props.name.toLowerCase(),
    namesupplier: "",
    imageSupplier: "",
    phone: "",
    adress: "",
    cuit: "",
    category: "",
  });
  const [imagenLoading, setImagenLoading] = useState(false);

  const [error, setError] = useState({});

  const changeState = function (e) {
    if (e.target.name !== "supplier") {
      e.preventDefault();
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
      console.log(error);
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.checked,
      });
      setError({
        ...error,
        namesupplier: "Name is required",
      });
      if (e.target.checked === false) {
      }
    }
  };

  const option_categories = () => {
    return (
      categories &&
      categories.map((category) => (
        <option key={uuidv4()} value={category}>
          {category}
        </option>
      ))
    );
  };

  const registerSupplier = () => {
    const name = input.namesupplier;
    const image = input.imageSupplier;
    const { phone, email, adress, cuit, category } = input;
    if (!Object.keys(error).length) {
      console.log({ phone, email, adress, cuit, image, category, name });
      dispatch(
        postSeller({
          phone,
          email,
          adress,
          cuit,
          image,
          category,
          name,
          city: [],
        })
      );
    } else {
      alert(
        "There are incomplete or invalid fields. Please review your form, all fields are required.Not Waste."
      );
    }
  };

  const registerCustomer = () => {
    const { name, email } = input;
    console.log({ name, email });
    dispatch(postCustomer({ name, email }));
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "notWaste");
    setImagenLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v2.0/ddb69vp6o/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(res);
    setInput.imageSupplier(file.secure_url);
    console.log(file.secure_url);
    setImagenLoading(false);
  };

  return (
    <>
      <form className="form-check form-switch my-3 mx-5">
        <div class="text-center">
          <img
            src={props.picture}
            class="rounded"
            alt={props.name}
            width="100px"
          />
        </div>

        <div className="input-group has-validation my-3 mx-5">
          <input
            className="form-check-input me-3"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            name="supplier"
            onClick={(e) => changeState(e)}
          />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            I'm a supplier
          </label>
        </div>

        <div className="input-group has-validation">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            fill="currentColor"
            className="bi bi-mailbox"
            viewBox="0 0 16 16"
          >
            <path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />
            <path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />
          </svg>
          <div className="form-floating is-invalid">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="floatingInputName"
              value={props.email}
            />
            <label htmlFor="floatingInputGroup2">Email</label>
          </div>
        </div>

        {!input.supplier ? (
          <>
            <div className="input-group has-validation">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="green"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
              <div className="form-floating is-invalid">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="floatingInputName"
                  placeholder="Name"
                  value={props.name}
                />
                <label htmlFor="floatingInputGroup2">Name</label>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary"
                type="submit"
                value="registerCustomer"
                onClick={(event) => {
                  registerCustomer(event);
                }}
              >
                Confirm
              </button>
            </div>{" "}
          </>
        ) : (
          <>
            <h5>
              Please upload the information requested in order to be a Not Waste
              supplier
            </h5>
            <Image cloudName="ddb69vp6o" publicId="" style={{ width: 200 }} />
            <div className="input-group has-validation">
              <div className="form-floating is-invalid">
                <input
                  type="file"
                  name="imageSupplier"
                  onChange={uploadImage}
                />
                {imagenLoading ? (
                  <h3>Cargando imagen...</h3>
                ) : (
                  <img src={input.imageSupplier} style={{ width: "200px" }} />
                )}
                {/* <input
                  type="text"
                  className={
                    !error.imageSupplier
                      ? "form-control ms-2"
                      : "form-control is-invalid ms-2"
                  }
                  id="floatingInputImage"
                  placeholder="Image"
                  name="imageSupplier"
                  required
                  onChange={(e) => changeState(e)}
                /> 
                <label for="floatingInputGroup2">Image of your store</label>*/}
                {error.imageSupplier && (
                  <div className="invalid-feedback">{error.imageSupplier}</div>
                )}
              </div>
            </div>

            <div className="input-group has-validation">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                fill="currentColor"
                class="bi bi-emoji-heart-eyes"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434z" />
              </svg>
              <div className="form-floating is-invalid">
                <input
                  type="text"
                  className={
                    !error.namesupplier
                      ? "form-control ms-2"
                      : "form-control is-invalid ms-2"
                  }
                  id="floatingInputName"
                  placeholder="Name"
                  name="namesupplier"
                  required
                  onChange={(e) => changeState(e)}
                />
                <label for="floatingInputGroup2">Name of your store</label>
                {error.namesupplier && (
                  <div className="invalid-feedback">{error.namesupplier}</div>
                )}
              </div>
            </div>

            <div className="input-group has-validation">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-phone"
                viewBox="0 0 16 16"
              >
                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
              <div className="form-floating is-invalid">
                <input
                  type="tel"
                  className={
                    !error.phone
                      ? "form-control ms-2"
                      : "form-control is-invalid ms-2"
                  }
                  id="floatingInputNumber phone"
                  placeholder="phone"
                  name="phone"
                  required
                  onChange={(e) => changeState(e)}
                />
                <label for="floatingInputGroup2">Number phone</label>
              </div>
              {error.phone && (
                <div className="invalid-feedback">{error.phone}</div>
              )}
            </div>

            <div className="input-group has-validation">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                fill="currentColor"
                class="bi bi-building"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
                />
                <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
              </svg>
              <div className="form-floating is-invalid">
                <input
                  type="text"
                  className={
                    !error.adress
                      ? "form-control ms-2"
                      : "form-control is-invalid ms-2"
                  }
                  id="floatingInputName"
                  placeholder="adress"
                  name="adress"
                  required
                  onChange={(e) => changeState(e)}
                />
                <label for="floatingInputGroup2">Adress</label>
                {error.adress && (
                  <div className="invalid-feedback">{error.adress}</div>
                )}
              </div>
            </div>

            <div className="input-group has-validation">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                fill="currentColor"
                class="bi bi-bank"
                viewBox="0 0 16 16"
              >
                <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89L8 0ZM3.777 3h8.447L8 1 3.777 3ZM2 6v7h1V6H2Zm2 0v7h2.5V6H4Zm3.5 0v7h1V6h-1Zm2 0v7H12V6H9.5ZM13 6v7h1V6h-1Zm2-1V4H1v1h14Zm-.39 9H1.39l-.25 1h13.72l-.25-1Z" />
              </svg>
              <div className="form-floating is-invalid">
                <input
                  type="tel"
                  className={
                    !error.cuit
                      ? "form-control ms-2"
                      : "form-control is-invalid ms-2"
                  }
                  id="floatingInputNumber phone"
                  placeholder="cuit"
                  name="cuit"
                  required
                  onChange={(e) => changeState(e)}
                />
                <label for="floatingInputGroup2">CUIT</label>
              </div>
              {error.cuit && (
                <div className="invalid-feedback">{error.cuit}</div>
              )}
              {error.category && (
                <div className="invalid-feedback">{error.category}</div>
              )}
            </div>

            <div>
              <select
                className="form-select form-select-lg mb-3"
                name="category"
                aria-label=".form-select-lg example"
                onChange={(e) => changeState(e)}
                value={input.category}
              >
                <option value="">Select a category</option>
                {option_categories()}
              </select>
            </div>

            <div className="col-12">
              <button
                className="btn btn-primary"
                type="submit"
                value="register"
                onClick={(event) => {
                  registerSupplier(event);
                }}
              >
                Register
              </button>
            </div>
          </>
        )}
      </form>
      {/* {console.log(VerifyProfile("Miguel@gmail.com"))} */}
      <script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        type="text/javascript"
      ></script>
    </>
  );
}

export default Register;
