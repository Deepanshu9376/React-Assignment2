import React from "react";
import { useEffect, useState, useRef } from "react";

const Create3 = () => {
  const [savedData, setsavedData] = useState({
    name: "",
    gender: "Male",
    email: "",
    contact: "",
    category: "General",
    technology: [],
    profilePicture: null,
  });

  const [dataUser, setDataUser] = useState([]);
  const [errors, setErrors] = useState({});
  const [displayModal, setdisplayModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsavedData({ ...savedData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setsavedData({ ...savedData, profilePicture: file });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const errorMessages = validateData(savedData);
    if (Object.keys(errorMessages).length === 0) {
      setdisplayModal(true);
      setErrors({});
    } else {
      setErrors(errorMessages);
    }
  };

  const validateData = (data) => {
    console.log(data);
    let errors = {};

    if (
      !data.name ||
      data.name.length <= 2 ||
      data.name.length > 30 ||
      !/^[a-zA-Z\s]+$/.test(data.name)
    ) {
      errors.name = "Name must contain at least 2 and at most 30 characters";
    }

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!data.contact || !/^\d{10}$/.test(data.contact)) {
      errors.contact = "Enter a valid 10-digit cell number";
    }
    if (data.technology.length === 0) {
      errors.technology = "Select at least one technology";
    }

    if (!data.profilePicture) {
      errors.profilePicture = "Upload the picture";
    } else if (
      !["image/jpeg", "image/jpg", "image/png"].includes(
        data.profilePicture.type
      )
    ) {
      errors.profilePicture = "Only JPEG, JPG, and PNG file types are allowed";
    }
    console.log(errors);
    return errors;
  };

  const handleTechChange = (e) => {
    const { name, checked } = e.target;
    const updatedTechnology = checked
      ? [...savedData.technology, name]
      : savedData.technology.filter((tech) => tech !== name);
    setsavedData({ ...savedData, technology: updatedTechnology });
  };

  const fileInputRef = useRef(null);

  const handelSubmit = () => {
    console.log(savedData);
    let FinalData = dataUser.push(savedData);
    console.log(FinalData);
    setDataUser([...dataUser, savedData]);
    console.log(dataUser);
    localStorage.setItem("usersData", JSON.stringify(dataUser));
    setdisplayModal(false);
    setsavedData({
      name: "",
      gender: "Male",
      email: "",
      contact: "",
      category: "General",
      technology: [],
      profilePicture: null,
      profilePictureBase: null,
    });
    fileInputRef.current.value = "";
  };

  const handelCancel = () => {
    setdisplayModal(false);
    setsavedData({
      name: "",
      gender: "Male",
      email: "",
      contact: "",
      category: "General",
      technology: [],
      profilePicture: null,
      profilePictureBase: null,
    });
  };

  useEffect(() => {
    let dat = JSON.parse(localStorage.getItem("usersData"));
    if (dat) {
      setDataUser(dat);
    }
  }, []);

  const PreviewModal = ({ savedData }) => {
    return (
      <div>
        <p>Name: {savedData.name}</p>
        <p>Gender: {savedData.gender}</p>
        <p>Email: {savedData.email}</p>
        <p>Contact: {savedData.contact}</p>
        <p>Category: {savedData.category}</p>
        <p>Technology: {savedData.technology.join(", ")}</p>
        <p>
          Profile Picture:{" "}
          {savedData.profilePicture ? savedData.profilePicture.name : "None"}
        </p>
      </div>
    );
  };

  return (
    <div className="container-fluid px-5 my-2 text-center ">
      <h1 className="text-center mb-3">Create User</h1>

      <section className="container-fluid px-5 my-5 ">
        <div className="container-fluid px-5 my-5">
          <form className="row g-3 border" onSubmit={(e) => handleOnSubmit(e)}>
            <div className="col-md-4 gx-5 my-4">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className={`form-control ${errors.name && "is-invalid"}`}
                id="name"
                name="name"
                placeholder="Enter name e.g. Deepanshu"
                value={savedData.name}
                onChange={(e) => handleChange(e)}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="col-md-4 gx-5 my-4">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                id="email"
                name="email"
                placeholder="Enter mail e.g. admin@example.com"
                value={savedData.email}
                onChange={(e) => handleChange(e)}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="col-md-4 gx-5 my-4">
              <label htmlFor="contact" className="form-label">
                Contact:
              </label>
              <input
                type="text"
                className={`form-control ${errors.contact && "is-invalid"}`}
                id="contact"
                name="contact"
                placeholder="Enter phone e.g. 6379945453"
                value={savedData.contact}
                onChange={(e) => handleChange(e)}
              />
              {errors.contact && (
                <div className="invalid-feedback">{errors.contact}</div>
              )}
            </div>

            <div className="col-md-4 gx-5 my-4">
              <label htmlFor="category" className="form-label">
                Category:
              </label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={savedData.category}
                onChange={(e) => handleChange(e)}
              >
                <option value="General">General</option>
                <option value="SC/ST">SC/ST</option>
                <option value="OBC">OBC</option>
              </select>
            </div>

            <div className="col-md-4 gx-5 my-4">
              <label>Gender:</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="Male"
                    name="gender"
                    value="Male"
                    checked={savedData.gender === "Male"}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="form-check-label" htmlFor="Male">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="Female"
                    name="gender"
                    value="Female"
                    checked={savedData.gender === "Female"}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="form-check-label" htmlFor="Female">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="Others"
                    name="gender"
                    value="Others"
                    checked={savedData.gender === "Others"}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="form-check-label" htmlFor="Others">
                    Others
                  </label>
                </div>
              </div>
            </div>

            <div className="col-md-4 gx-5 my-4">
              <label htmlFor="profilePicture" className="form-label">
                Profile Picture:
              </label>
              <input
                type="file"
                className={`form-control ${
                  errors.profilePicture && "is-invalid"
                }`}
                id="profilePicture"
                name="profilePicture"
                accept="image/jpeg, image/jpg, image/png"
                onChange={(e) => handleFileChange(e)}
                ref={fileInputRef}
              />
              {errors.profilePicture && (
                <div className="invalid-feedback">{errors.profilePicture}</div>
              )}
            </div>

            <div className="col-12 gx-5 my-4">
              <label className="mb-2">
                <strong>Technology:</strong> Please select at least one
                technology
              </label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="c"
                    name="C"
                    checked={savedData.technology.includes("C")}
                    onChange={(e) => handleTechChange(e)}
                  />
                  <label className="form-check-label" htmlFor="c">
                    C
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="c++"
                    name="C++"
                    checked={savedData.technology.includes("C++")}
                    onChange={(e) => handleTechChange(e)}
                  />
                  <label className="form-check-label" htmlFor="c++">
                    C++
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="c#"
                    name="C#"
                    checked={savedData.technology.includes("C#")}
                    onChange={(e) => handleTechChange(e)}
                  />
                  <label className="form-check-label" htmlFor="c#">
                    C#
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="java"
                    name="java"
                    checked={savedData.technology.includes("java")}
                    onChange={(e) => handleTechChange(e)}
                  />
                  <label className="form-check-label" htmlFor="java">
                    Java
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="javascript"
                    name="javascript"
                    checked={savedData.technology.includes("javascript")}
                    onChange={(e) => handleTechChange(e)}
                  />
                  <label className="form-check-label" htmlFor="javascript">
                    JavaScript
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="python"
                    name="python"
                    checked={savedData.technology.includes("python")}
                    onChange={(e) => handleTechChange(e)}
                  />
                  <label className="form-check-label" htmlFor="python">
                    Python
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="ruby"
                    name="ruby"
                    checked={savedData.technology.includes("ruby")}
                    onChange={(e) => handleTechChange(e)}
                  />
                  <label className="form-check-label" htmlFor="ruby">
                    Ruby
                  </label>
                </div>
              </div>
              {errors.technology && (
                <div className="invalid-feedback d-block">
                  {errors.technology}
                </div>
              )}
            </div>

            <div className="text-center col-12  my-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handleOnSubmit(e)}
              >
                Preview
              </button>
            </div>
          </form>
        </div>
      </section>

      <div
        className={`modal fade ${displayModal ? "show" : ""}`}
        style={{ display: displayModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Preview User</h5>
              <button
                type="button"
                className="btn-close"
                onClick={(e) => handelCancel(e)}
              ></button>
            </div>
            <div className="modal-body">
              <PreviewModal savedData={savedData} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handelSubmit(e)}
              >
                Confrim
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={(e) => handelCancel(e)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create3;
