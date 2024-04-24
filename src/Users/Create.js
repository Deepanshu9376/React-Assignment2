import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import View from "./View";

const Create = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    image: "",
    gender: "",
    category: "",
    technologies: "",
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Save cards to localStorage whenever it changes
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const [dataForm,setDataForm]=useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setDataForm(JSON.parse(storedData));
    }
  }, []);
  

  const onSubmit = (formData) => {
    // setFormData(formData);
    setShowModal(true);
  };

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleClose() {
    setShowModal(false);
    if (!formData) reset();
  }

  function handleSave(e) {
    e.preventDefault();
    if(!formData){

    }
    else{
      const technologiesArray = formData.technologies
      .split(",")
      .map((tech) => tech.trim());
    setFormData((prevFormData) => ({
      ...prevFormData,
      technologies: technologiesArray,
    }));
      setDataForm([...dataForm,formData]);
      setFormData("");
    }
    const newCard = { id: Date.now(), ...formData }; // Assign a unique ID to each card
    setCards(prevCards => [...prevCards, newCard]);
    console.log("form data submitted",formData)
    // localStorage.setItem("formData", JSON.stringify(formData));
  }
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(dataForm));
  }, [dataForm]);


  const validateFile = (value) => {
    if (!value[0]) return true;
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = value[0].name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };

  return (
    <>
      <div className="container-fluid px-5 my-2 text-center">
        <h1>Create</h1>
      </div>
      <section className="container-fluid px-5 my-5 ">
        <div className="container-fluid px-5 my-5">
          <form onSubmit={handleSubmit(onSubmit)} className="row g-3 border">
            <div className="col-md-4 gx-5 my-4">
              <label className="col-form-label ">Name:</label>
              <input
                {...register("name", {
                  required: true,
                  pattern: /^[a-zA-Z\s]+$/,
                  maxLength: 30,
                  minLength: 2,
                })}
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter name e.g. Deepanshu"
                aria-describedby="textHelpInline"
                value={formData.name}
                onChange={handleOnChange}
                name="name"
              />
              {errors.name && (
                <span className="invalid-feedback">This field is required</span>
              )}
            </div>
            <div className="col-md-4 gx-5 my-4">
              <label className="col-form-label">Contact:</label>
              <input
                {...register("contact", {
                  required:true,
                  pattern: /^\d{10}$/,
                })}
                type="tel"
                name="contact"
                className={`form-control ${errors.contact ? "is-invalid" : ""}`}
                placeholder="Enter phone e.g. 6379945453"
                value={formData.contact}
                onChange={handleOnChange}
              />
              {errors.phone && (
                <span className="invalid-feedback">
                  Please enter a valid phone number
                </span>
              )}
            </div>
            <div className="col-md-4 gx-5 my-4">
              <label className="col-form-label">Email:</label>
              <input
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter mail e.g. admin@example.com"
                value={formData.email}
                onChange={handleOnChange}
                name="email"
              />
              {errors.email && (
                <span className="invalid-feedback">
                  Please enter a valid email address
                </span>
              )}
            </div>
            <div className="col-md-4 gx-5 my-4">
              <label className="col-form-label">Upload Image:</label>
              <input
                value={formData.image}
                name="image"
                type="file"
                {...register("image", {
                  required: true,
                  validate: validateFile,
                })}
                className={`form-control-file ${
                  errors.image ? "is-invalid" : ""
                }`}
                onChange={handleOnChange}
                accept=".jpg, .jpeg, .png"
              />
              {errors.image && errors.image.type === "validate" && (
                <span className="invalid-feedback">
                  Please upload an image with .jpg, .jpeg, or .png extension
                </span>
              )}
              {errors.image && errors.image.type !== "validate" && (
                <span className="invalid-feedback">This field is required</span>
              )}
            </div>
            <div className="col-md-4 gx-5 my-4">
              <label className="col-form-label">Gender:</label>
              <div
                value={formData.gender}
                onChange={handleOnChange}
                name="gender"
              >
                <input
                  type="radio"
                  value="male"
                  {...register("gender", { required: true })}
                  className="me-1"
                />
                <label className="mr-3 ml-1">Male</label>
                <input
                  type="radio"
                  value="female"
                  {...register("gender", { required: true })}
                  className="ms-4 me-1"
                />
                <label>Female</label>
                <input
                  type="radio"
                  value="others"
                  {...register("gender", { required: true })}
                  className="ms-4 me-1"
                />
                <label>Others</label>
              </div>
              {errors.gender && (
                <span className="invalid-feedback d-block">
                  Please select a gender
                </span>
              )}
            </div>
            <div className="col-md-4 gx-5 my-4">
              <label className="col-form-label">Category:</label>
              <select
                {...register("category", { required: true })}
                className={`form-control ${
                  errors.category ? "is-invalid" : ""
                }`}
                value={formData.categ}
                onChange={handleOnChange}
                name="category"
              >
                <option value="general">General</option>
                <option value="sc/st">SC/ST</option>
                <option value="others">Others</option>
              </select>
              {errors.category && (
                <span className="invalid-feedback">
                  Please select a category
                </span>
              )}
            </div>
            <div className="col-12 gx-5 my-4">
            <label className="col-form-label">Technologies:</label>
              <div>
                <input
                  type="checkbox"
                  value="c"
                  {...register("technologies")}
                  className="ms-3 me-1"
                  onChange={handleOnChange}
                />
                <label className="mr-3 ml-1">C</label>
                <input
                  type="checkbox"
                  value="c++"
                  {...register("technologies")}
                  className="ms-3 me-1"
                  onChange={handleOnChange}
                />
                <label className="mr-3 ml-1">C++</label>
                <input
                  type="checkbox"
                  value="java"
                  {...register("technologies")}
                  className="ms-3 me-1"
                  onChange={handleOnChange}
                />
               <label className="mr-3 ml-1">C#</label>
                <input
                  type="checkbox"
                  value="C#"
                  {...register("technologies")}
                  className="ms-3 me-1"
                  onChange={handleOnChange}
                />
               <label className="mr-3 ml-1">JavaScript</label>
                <input
                  type="checkbox"
                  value="Javascript"
                  {...register("technologies")}
                  className="ms-3 me-1"
                  onChange={handleOnChange}
                />
                <label className="mr-3 ml-1">Python</label>
                <input
                  type="checkbox"
                  value="Python"
                  {...register("technologies")}
                  className="ms-3 me-1"
                  onChange={handleOnChange}
                />
                <label className="mr-3 ml-1">TypeScript</label>
                <input
                  type="checkbox"
                  value="TypeScript"
                  {...register("technologies")}
                  className="ms-3 me-1"
                  onChange={handleOnChange}
                />
                <label className="mr-3 ml-1">Java</label>
                <input
                  type="checkbox"
                  value="java"
                  {...register("technologies")}
                  className="ms-3 me-1"
                  onChange={handleOnChange}
                />
               <label className="mr-3 ml-1">Ruby</label>
                <input
                  type="checkbox"
                  value="ruby"
                  {...register("technologies")}
                  className="ms-3 me-1"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="text-center col-12  my-2">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit(onSubmit)}
              >
                Preview
              </button>
            </div>
          </form>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {formData && (
                <ul>
                  <li>
                    <strong>Name:</strong> {formData.name}
                  </li>
                  <li>
                    <strong>Phone Number:</strong> {formData.contact}
                  </li>
                  <li>
                    <strong>Email:</strong> {formData.email}
                  </li>
                  <li>
                    <strong>Uploaded Image:</strong> {formData.image}
                  </li>
                  <li>
                    <strong>Gender:</strong> {formData.gender}
                  </li>
                  <li>
                    <strong>Category:</strong> {formData.category}
                  </li>
                  <li>
                    <strong>Technologies:</strong> {formData.technologies}
                  </li>
                </ul>
              )}
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Confirm
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </section>
    </>
  );
};

export default Create;