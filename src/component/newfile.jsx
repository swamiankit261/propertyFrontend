import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../App";
import "./owner.css";

const Owner = () => {
  const [formState, setFormState] = useState({
    postedAt: null,
    propertyType: null,
    lookingTo: null,
    propertyCategory: null,
    landlord: "",
    BHK: null,
    areaUnit: "",
    price: "",
    description: "",
    locality: {
      street: "",
      city: "",
      state: "",
      zipCode: null,
    },
    images: [],
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleValidation = () => {
    let isValid = true;
    const newError = {};

    const requiredFields = [
      "dealerType",
      "landlord",
      "propertyType",
      "lookingTo",
      "apartmentTypeId",
      "bhkTypeId",
      "builtUpArea",
      "cost",
      "description",
      "locality",
      "images",
    ];

    requiredFields.forEach((field) => {
      if (!formState[field] || (field === "images" && formState.images.length < 4)) {
        newError[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    });

    setError(newError);
    return isValid;
  };

  const handleListProperty = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.post(`${BACKEND_URL}/users/register`, formState, config);

        setFormState({
          dealerType: null,
          landlord: "",
          propertyType: null,
          lookingTo: null,
          apartmentTypeId: null,
          bhkTypeId: null,
          builtUpArea: "",
          cost: "",
          description: "",
          locality: "",
          images: [],
        });
        setError({});
      } catch (error) {
        console.error("Error listing property:", error);
      }
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormState((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...imageUrls],
    }));
  };

  const handleToggleChange = (field, value) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <div className="main-div" style={{ display: "flex", justifyContent: "center" }}>
      <section className="css-f3w6ha">
        <div className="css-v8jck">
          <div className="css-eiz9fm">
            <i className="icon icon-arrow-left css-bxeng9"></i>Add Property Details
          </div>
          <div className="css-1k4zm6e">
            <div className="css-1npsx2h">
              <div className="css-13t580j">
                <div className="form-cont">
                  <div className="field horizontal-free-scroll first-form-field">
                    <div className="group">
                      <div className="title no-bottom">Dealer Type</div>
                      <div className="rf-group radio-group category">
                        {["Owner", "Agent", "Builder"].map((type) => (
                          <div
                            key={type}
                            className={`rf-toggle radio toggle-tag pills ${formState.dealerType === type ? "toggle-active" : ""}`}
                            onClick={() => handleToggleChange("dealerType", type)}
                          >
                            <div className="toggle-label">{type}</div>
                          </div>
                        ))}
                      </div>
                      {error.dealerType && <p className="error-message">{error.dealerType}</p>}
                      <div className="title no-bottom">Property Type</div>
                      <div className="rf-group radio-group category">
                        {["Residential", "Commercial"].map((type) => (
                          <div
                            key={type}
                            className={`rf-toggle radio toggle-tag pills ${formState.propertyType === type ? "toggle-active" : ""}`}
                            onClick={() => handleToggleChange("propertyType", type)}
                          >
                            <div className="toggle-label">{type}</div>
                          </div>
                        ))}
                      </div>
                      {error.propertyType && <p className="error-message">{error.propertyType}</p>}
                      <div className="title no-bottom">Looking to</div>
                      <div className="rf-group radio-group service">
                        {["Rent", "Sell", "PG/Co-living"].map((type) => (
                          <div
                            key={type}
                            className={`rf-toggle radio toggle-tag pills ${formState.lookingTo === type ? "toggle-active" : ""}`}
                            onClick={() => handleToggleChange("lookingTo", type)}
                          >
                            <div className="toggle-label">{type}</div>
                          </div>
                        ))}
                      </div>
                      {error.lookingTo && <p className="error-message">{error.lookingTo}</p>}
                      <div className="title no-bottom">Property Category</div>
                      <div className="rf-group radio-group property_type_id">
                        {["Apartment", "Independent Floor", "Independent House", "Villa", "Plot", "Agricultural Land"].map((type) => (
                          <div
                            key={type}
                            className={`rf-toggle radio toggle-tag pills ${formState.apartmentTypeId === type ? "toggle-active" : ""}`}
                            onClick={() => handleToggleChange("apartmentTypeId", type)}
                          >
                            <div className="toggle-label">{type}</div>
                          </div>
                        ))}
                      </div>
                      {error.apartmentTypeId && <p className="error-message">{error.apartmentTypeId}</p>}
                      <div className="field">
                        <div className="css-1pt2cfh">
                          <div className="material-input dropdownContainer">
                            <input
                              type="text"
                              name="landlord"
                              value={formState.landlord}
                              onChange={handleChange}
                              className={formState.landlord ? "has-value" : ""}
                            />
                            <label className={formState.landlord ? "label hidden" : "label"}>Owner - Name</label>
                          </div>
                          {error.landlord && <p className="error-message">{error.landlord}</p>}
                        </div>
                      </div>
                      <div className="field">
                        <div className="css-1pt2cfh">
                          <div className="material-input dropdownContainer">
                            <input
                              type="text"
                              name="description"
                              value={formState.description}
                              onChange={handleChange}
                              className={formState.description ? "has-value" : ""}
                            />
                            <label className={formState.description ? "label hidden" : "label"}>Description</label>
                          </div>
                          {error.description && <p className="error-message">{error.description}</p>}
                        </div>
                      </div>
                      <div className="field">
                        <div className="css-1pt2cfh">
                          <div className="material-input dropdownContainer">
                            <input
                              type="text"
                              name="locality"
                              value={formState.locality}
                              onChange={handleChange}
                              className={formState.locality ? "has-value" : ""}
                            />
                            <label className={formState.locality ? "label hidden" : "label"}>Locality</label>
                          </div>
                          {error.locality && <p className="error-message">{error.locality}</p>}
                        </div>
                      </div>
                      <div className="field horizontal-free-scroll">
                        <div className="group">
                          <div className="title no-bottom">BHK</div>
                          <div className="rf-group radio-group apartment_type_id">
                            {["1 RK", "1 BHK", "2 BHK", "3 BHK", "3+ BHK"].map((type) => (
                              <div
                                key={type}
                                className={`rf-toggle radio toggle-tag pills ${formState.bhkTypeId === type ? "toggle-active" : ""}`}
                                onClick={() => handleToggleChange("bhkTypeId", type)}
                              >
                                <div className="toggle-label">{type}</div>
                              </div>
                            ))}
                          </div>
                          {error.bhkTypeId && <p className="error-message">{error.bhkTypeId}</p>}
                        </div>
                      </div>
                      <div className="field">
                        <div className="material-input dropdownContainer">
                          <input
                            type="text"
                            name="builtUpArea"
                            value={formState.builtUpArea}
                            onChange={handleChange}
                            className={formState.builtUpArea ? "has-value" : ""}
                          />
                          <label className={formState.builtUpArea ? "label hidden" : "label"}>Built Up Area</label>
                        </div>
                        {error.builtUpArea && <p className="error-message">{error.builtUpArea}</p>}
                      </div>
                      <div className="field">
                        <div className="material-input dropdownContainer">
                          <input
                            type="text"
                            name="cost"
                            value={formState.cost}
                            onChange={handleChange}
                            className={formState.cost ? "has-value" : ""}
                          />
                          <label className={formState.cost ? "label hidden" : "label"}>Cost</label>
                        </div>
                        {error.cost && <p className="error-message">{error.cost}</p>}
                      </div>

                      <div className="field">
                        <label className="custom-file-upload">
                          <input type="file" multiple onChange={handleFileChange} />
                          Upload Images
                        </label>
                        {error.images && <p className="error-message">{error.images}</p>}
                      </div>
                      <div className="field horizontal-free-scroll">
                        <div className="group">
                          <button className="list-property-btn" onClick={handleListProperty}>List Property</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form_image_container">
                    <img src="https://via.placeholder.com" alt="Placeholder" />
                  </div>
                </div>
              </div>
            </div>
            <div className="css-1xv5qu4"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Owner;


// const handleChange = (e) => {
//   const { name, value } = e.target;
//   if (name.includes(".")) {
//     const [mainField, subField] = name.split(".");
//     setFormState((prevState) => ({
//       ...prevState,
//       [mainField]: {
//         ...prevState[mainField],
//         [subField]: value,
//       },
//     }));
//   } else {
//     setFormState((prevState) => ({ ...prevState, [name]: value }));
//   }
// };
