import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./owner.css";
import axios from "axios";
import { BACKEND_URL } from "../App";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Owner = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    postedAt: null,
    propertyType: null,
    lookingTo: null,
    propertyCategory: null,
    landlord: "",
    BHK: null,
    areaUnit: null,
    price: null,
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: null,
    },
    images: [],
  });

  const [error, setError] = useState({});

  const handleValidation = () => {
    let isValid = true;
    const newError = {};

    const {
      postedAt, landlord, propertyType, lookingTo,
      propertyCategory, BHK, areaUnit, price,
      description, address, images
    } = formState;

    const requiredFields = {
      postedAt,
      landlord,
      propertyType,
      lookingTo,
      propertyCategory,
      BHK,
      areaUnit,
      price,
      description,
      localityStreet: address.street,
      localityCity: address.city,
      localityState: address.state,
      localityZipCode: address.zipCode,
      images,
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    Object.keys(requiredFields).forEach((field) => {
      if (!requiredFields[field] || (field === "images" && images.length < 4)) {
        newError[field] = `${capitalize(field.replace("locality", "Locality "))} is required!`;
        isValid = false;
      }
    });

    setError(newError);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address")) {
      const field = name.split(".")[1];
      setFormState((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [field]: value },
      }));
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleListProperty = async (e) => {
    e.preventDefault();
    console.log("formState", formState)
    if (handleValidation()) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("accessToken")}`
          }
        };
        toast.success(`Please wait for the registration to complete`)
        const { data } = await axios.post(`${BACKEND_URL}/property/registerProperty`, formState, config);
        if (data?.success) {
          toast.success(`${data.message}`)
          navigate("/Home")
          console.log("savedData", data)
        }

        setFormState({});
        setError({});
      } catch (error) {
        toast.error(`Error listing property: ${error.message}`)
        console.error("Error listing property:", error);
      }
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFormState((prevState) => ({
            ...prevState,
            images: [...prevState.images, reader.result]
          }))
        }
      }
      reader.readAsDataURL(file);
    })
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
                      <div className="title no-bottom">postedAt</div>
                      <div>
                        <div className="rf-group radio-group category">
                          {["Owner", "Agent", "Builder"].map((type) => (
                            <div
                              key={type}
                              className={`rf-toggle radio toggle-tag pills ${formState.postedAt === type ? "toggle-active" : ""}`}
                              onClick={() => handleToggleChange("postedAt", type)}
                            >
                              <div className="toggle-label">{type}</div>
                            </div>
                          ))}
                        </div>
                        {error.postedAt && <p className="error-message">{error.postedAt}</p>}
                        <div className="errorStyle"></div>
                      </div>

                      <div className="title no-bottom">Property Type</div>
                      <div>
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
                        <div className="errorStyle"></div>
                      </div>
                      <div className="title no-bottom">Looking to</div>
                      <div className="rf-group radio-group service">
                        {["Rent", "Sell", "PG/Co-living"].map((type) => (
                          <div
                            key={type}
                            className={`rf-toggle radio toggle-tag pills ${formState.lookingTo === type.toLowerCase() ? "toggle-active" : ""}`}
                            onClick={() => handleToggleChange("lookingTo", type.toLowerCase())}
                          >
                            <div className="toggle-label">{type}</div>
                          </div>
                        ))}
                      </div>
                      {error.lookingTo && <p className="error-message">{error.lookingTo}</p>}
                      <div className="errorStyle"></div>

                      <div className="title no-bottom">Property Category</div>
                      <div>
                        <div className="rf-group radio-group property_type_id">
                          {["Apartment", "Independent Floor", "Independent House", "Villa", "Plot", "Agricultural Land"].map((type) => (
                            <div
                              key={type}
                              className={`rf-toggle radio toggle-tag pills ${formState.propertyCategory === type ? "toggle-active" : ""}`}
                              onClick={() => handleToggleChange("propertyCategory", type)}
                            >
                              <div className="toggle-label">{type}</div>
                            </div>
                          ))}
                        </div>
                        {error.propertyCategory && <p className="error-message">{error.propertyCategory}</p>}
                        <div className="errorStyle"></div>
                      </div>
                    </div>
                  </div>
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

                  {/* Input fields for address */}
                  <div className="field">
                    <div className="css-1pt2cfh">
                      <div className="material-input dropdownContainer">
                        <input
                          type="text"
                          name="address.street"
                          value={formState.address.street}
                          onChange={handleChange}
                          className={formState.address.street ? "has-value" : ""}
                        />
                        <label className={formState.address.street ? "label hidden" : "label"}>Street</label>
                      </div>
                      {error.localityStreet && <p className="error-message">{error.localityStreet}</p>}
                    </div>

                    <div className="css-1pt2cfh">
                      <div className="material-input dropdownContainer">
                        <input
                          type="text"
                          name="address.city"
                          value={formState.address.city}
                          onChange={handleChange}
                          className={formState.address.city ? "has-value" : ""}
                        />
                        <label className={formState.address.city ? "label hidden" : "label"}>City</label>
                      </div>
                      {error.localityCity && <p className="error-message">{error.localityCity}</p>}
                    </div>

                    <div className="css-1pt2cfh">
                      <div className="material-input dropdownContainer">
                        <input
                          type="text"
                          name="address.state"
                          value={formState.address.state}
                          onChange={handleChange}
                          className={formState.address.state ? "has-value" : ""}
                        />
                        <label className={formState.address.state ? "label hidden" : "label"}>State</label>
                      </div>
                      {error.localityState && <p className="error-message">{error.localityState}</p>}
                    </div>

                    <div className="css-1pt2cfh">
                      <div className="material-input dropdownContainer">
                        <input
                          type="number"
                          name="address.zipCode"
                          value={formState.address.zipCode}
                          onChange={handleChange}
                          className={formState.address.zipCode ? "has-value" : ""}
                        />
                        <label className={formState.address.zipCode ? "label hidden" : "label"}>Zip Code</label>
                      </div>
                      {error.localityZipCode && <p className="error-message">{error.localityZipCode}</p>}
                    </div>
                  </div>

                  <div className="field horizontal-free-scroll">
                    <div className="group">
                      <div className="title no-bottom">BHK</div>
                      <div>
                        <div className="rf-group radio-group apartment_type_id">
                          {["1 RK", "1 BHK", "2 BHK", "3 BHK", "3+ BHK"].map((type) => (
                            <div
                              key={type}
                              className={`rf-toggle radio toggle-tag pills ${formState.BHK === type.replace(/\s/g, "") ? "toggle-active" : ""}`}
                              onClick={() => handleToggleChange("BHK", type.replace(/\s/g, ""))}
                            >
                              <div className="toggle-label">{type}</div>
                            </div>
                          ))}
                        </div>
                        {error.BHK && <p className="error-message">{error.BHK}</p>}
                        <div className="errorStyle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    {/* Input field for Built Up Area */}
                    <div className="material-input dropdownContainer">
                      <input
                        type="number"
                        name="areaUnit"
                        value={formState.areaUnit}
                        onChange={handleChange}
                        className={formState.areaUnit ? "has-value" : ""}
                      />
                      <label className={formState.areaUnit ? "label hidden" : "label"}>Built Up Area</label>
                    </div>
                    {error.areaUnit && <p className="error-message">{error.areaUnit}</p>}

                    {/* Input field for Price */}
                    <div className="material-input dropdownContainer">
                      <input
                        type="number"
                        name="price"
                        value={formState.price}
                        onChange={handleChange}
                        className={formState.price ? "has-value" : ""}
                      />
                      <label className={formState.price ? "label hidden" : "label"}>Price</label>
                    </div>
                    {error.price && <p className="error-message">{error.price}</p>}
                  </div>

                  <div className="addPhotos_addPhotosbox__QBIaz pageComponent" data-label="UPLOAD_PHOTOS_CLICK" id="photo-upload">
                    <img src="data:image/png;base64,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" alt="upload photos" style={{ width: "49px", height: "34px" }} />
                    <div className="addPhotos_textContainer__2iQJ8 caption_strong_medium">
                      <span className="addPhotos_addPhotosText__8GzHO caption_strong_medium">
                        + Add at least 4 photos
                      </span>
                      <br />
                      <span className="vert-align-middle">
                        Drag and drop your photos here
                      </span>
                    </div>
                    <div className="addPhotos_textContainer__2iQJ8 caption_strong_small">
                      Up to 4 photos • Max. size 10 MB • Formats: png, jpg, jpeg, gif, webp, heic, heif.
                    </div>
                    <div className="addPhotos_textContainer__2iQJ8 addPhotos_uploadButton__xS1yH caption_strong_medium">
                      <button type="button" className="pageComponent buttons_secondaryRegular__3R1_d buttons_semi__1it_o btn-image">
                        <span>Upload Photos Now</span>
                        <input
                          id="file-input"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          multiple
                        />
                      </button>
                    </div>
                  </div>
                  {error.images && <p className="error-message">{error.images}</p>}

                  <div className="image-preview">
                    {formState.images.map((image, index) => (
                      <img key={index} src={image} alt={`Uploaded ${index + 1}`} />
                    ))}
                  </div>
                </div>
                <div className="css-bylwsl">
                  <button className="selfupload-cta-button css-1olr0sc" onClick={handleListProperty}>
                    List Property
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Owner;
