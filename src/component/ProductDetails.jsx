import React, { useState } from "react";
import "./productDetailslint.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;
  const {
    _id,
    postedAt,
    image,
    image1,
    image2,
    image3,
    propertyType,
    propertyCategory,
    address,
    price,
    lookingTo,
    areaUnit,
    BHK,
    landlord,
    description,
    rating,
    mobileNo
  } = state || {}; // Add a default empty object to prevent errors

  const [defaultImage, setDefaultImage] = useState(image);

  const handleClickImage = (img) => {
    setDefaultImage(img);
  };

  const off = () => {
    return Math.trunc(price);
  };

  return (
    <div>
      <div className="container-main">
        <div className="container-main-div">
          <div className="single-product">
            <div className="row-div">
              <div className="col-6-div">
                <div className="product-image">
                  <div className="product-image-main">
                    <img src={defaultImage} alt="Product" id="product-main-image" />
                  </div>
                  <div className="product-image-slider">
                    {[image, image1, image2, image3].map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        onClick={() => handleClickImage(img)}
                        alt={`Product thumbnail ${index + 1}`}
                        className="image-list"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-6-div">
                <ProductDetailsTable
                  areaUnit={areaUnit}
                  BHK={BHK}
                  price={price}
                  address={address}
                  propertyType={propertyType}
                  propertyCategory={propertyCategory}
                  description={description}
                  lookingTo={lookingTo}
                  landlord={landlord}
                  postedAt={postedAt}
                  rating={rating}
                  mobileNo={mobileNo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetailsTable = ({
  areaUnit,
  BHK,
  price,
  address,
  propertyType,
  propertyCategory,
  description,
  lookingTo,
  landlord,
  postedAt,
  rating,
  mobileNo
}) => (
  <table id="FactTableComponent" className="component__factTable generic__listNone">
    <tbody>
      <tr>
        <td style={{ height: "135px" }}>
          <DetailHead icon="pd__iconPd component__areaIcon" title="Area" />
          <DetailContent>
            Plot area <span id="superArea_span">{areaUnit}</span>
            <br />
            <span style={{ fontSize: "15px", color: "#999" }}>
              ({`${areaUnit * 0.092903} sq.m.`})
            </span>
            {/* <br />
            Built Up area: <span id="builtupArea_span">1600</span>{" "}
            <span id="builtupAreaLabel">sq.ft.</span>{" "}
            <span style={{ fontSize: "10px", color: "#999" }} id="displayBuiltupArea_span">
              (148.64 sq.m.)
            </span>
            <br />
            Carpet area: <span id="carpetArea_span">1450</span>{" "}
            <span id="builtupAreaLabel">sq.ft.</span>{" "}
            <span style={{ fontSize: "10px", color: "#999" }} id="displayBuiltupArea_span">
              (134.71 sq.m.)
            </span>
            &nbsp;&nbsp; */}
            <a
              className="component__unitDropdown component__unit [object Object]"
              style={{ left: "101px" }}
            >
              <span>sq.ft.</span>
              <i className="component__blueArrow pd__iconPd"></i>
            </a>
          </DetailContent>
        </td>
        <td style={{ height: "135px" }}>
          <DetailHead icon="pd__iconPd component__configIcon" title="Configuration" />
          <DetailContent>
            <span id="bedRoomNum">{BHK} </span>
          </DetailContent>
        </td>
      </tr>
      <tr>
        <td style={{ height: "96px" }}>
          <DetailHead icon="pd__iconPd component__priceIcon" title="Price" />
          <DetailContent>
            ₹ <span id="pdPrice2">{price} </span>
            <span>+ Govt Charges &amp; Tax</span> <br />@ 3,103 per sq.ft. <small>(Negotiable)</small>
          </DetailContent>
        </td>
        <td style={{ height: "96px" }}>
          <DetailHead icon="pd__iconPd component__addressIcon" title="Address" />
          <DetailContent>
            {address?.street}, {address?.city}, {address?.state}
            <br />
            {address?.zipCode}
          </DetailContent>
        </td>
      </tr>
      <tr>
        <td style={{ height: "77px" }}>
          <DetailHead icon="pd__iconPd component__floorIcon" title="PropertyType" />
          <DetailContent>
            <span id="floorNumLabel">{propertyType}</span>
          </DetailContent>
        </td>
        <td style={{ height: "77px" }}>
          <DetailHead icon="pd__iconPd component__directionIcon" title="PropertyCategory" />
          <DetailContent>
            <span id="facingLabel">{propertyCategory}</span>
          </DetailContent>
        </td>
      </tr>
      <tr>
        <td style={{ height: "77px" }}>
          <DetailHead icon="pd__iconPd component__overlookingIcon" title="Description" />
          <DetailContent>
            <span id="overlooking">{description}</span>
          </DetailContent>
        </td>
        <td style={{ height: "77px" }}>
          <DetailHead icon="pd__iconPd component__possessionIcon" title="Property Age" />
          <DetailContent>
            <span id="agePossessionLbl">{lookingTo}</span>
          </DetailContent>
        </td>
        <td style={{ height: "77px" }}>
          <DetailHead icon="pd__iconPd component__possessionIcon" title="Landlord" />
          <DetailContent>
            <span id="agePossessionLbl">{landlord}</span>
          </DetailContent>
        </td>
        <td style={{ height: "77px" }}>
          <DetailHead icon="pd__iconPd component__floorIcon" title="PostedAt" />
          <DetailContent>
            <span id="floorNumLabel">{postedAt}</span>
          </DetailContent>
        </td>
      </tr>
      <tr>
        <td style={{ height: "77px" }}>
          <DetailHead icon="pd__iconPd component__overlookingIcon" title="Mobile" />
          <DetailContent>
            <span id="overlooking">{mobileNo}</span>
          </DetailContent>
        </td>


      </tr>
      <tr>
        <td style={{ height: "77px" }}>
          {/* <DetailHead icon="pd__iconPd component__overlookingIcon" title="Score" /> */}
          <DetailContent>
            <div >
              <label>Score</label>
              <input className="ms-2" type="text" style={{ width: "50px", borderRadius: "5px" }} disabled readOnly value={`${Math.trunc(Math.random() * 10)}/10`} />
            </div>
          </DetailContent>
        </td>
      </tr>

    </tbody>
  </table>
);

const DetailHead = ({ icon, title }) => (
  <div className="component__tableHead">
    <i className={icon}></i>{title}
  </div>
);

const DetailContent = ({ children }) => (
  <div className="component__details component__details2">
    {children}
  </div>
);


ProductDetailsTable.propTypes = {
  areaUnit: PropTypes.number.isRequired,
  BHK: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  address: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
  }).isRequired,
  propertyType: PropTypes.string.isRequired,
  propertyCategory: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  lookingTo: PropTypes.string.isRequired,
  landlord: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
};

DetailHead.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

DetailContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductDetails;
