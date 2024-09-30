import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../App"; // Assuming BACKEND_URL is correctly defined in App.js
import toast from "react-hot-toast";

const Properties = () => {
  const navigate = useNavigate();
  const [backendData, setBackendData] = useState([]);

  const clickProduct = (
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
  ) => {
    navigate("/productDetails", {
      state: {
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
      },
    });
  };

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/property/allProperty`);

      if (data?.success) {
        setBackendData(data?.data?.properties || []);
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div className="container">
      <div
        className="container-xxl row mt-5 custom-container"
        style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1370px" }}
      >
        <div className="mb-home__section__title">
          <div className="mb-home__section__title--text1 strip-orange">
            Popular Owner Properties
          </div>
        </div>

        {backendData.length > 0 ? (
          backendData.map((item) => (
            <div
              key={item._id}
              class="swiper-slide swiper-slide-active mt-4"
              role="group"
              aria-label="1 / 8"
              style={{
                // width: "340.2px",

                width: "326.2px",
              }}
            >
              <div class="mb-home__owner-prop__card card-shadow">
                <a
                  href="javascript:void(0);"
                  onClick={() =>
                    clickProduct(
                      item._id,
                      item.posted.at,
                      item.images[0]?.url,
                      item.images[1]?.url,
                      item.images[2]?.url,
                      item.images[3]?.url,
                      item.propertyType,
                      item.propertyCategory,
                      item.address,
                      item.price,
                      item.lookingTo,
                      item.areaUnit,
                      item.BHK,
                      item.landlord,
                      item.description,
                      item.rating,
                      item.mobileNo

                    )
                  }
                >
                  <div class="mb-home__owner-prop__card--graphic">
                    <img
                      class="swiper-lazy swiper-lazy-loaded"
                      src={item.images[0]?.url}
                      width="294"
                      height="156"
                      alt="swiper-lazy-loaded"
                    />

                    <span class="mb-home__owner-prop__card--pic-count">
                      {item.images.length}
                    </span>
                  </div>
                  <div class="mb-home__owner-prop__card--content">
                    <div class="mb-home__owner-prop__card--type">
                      {item.propertyType}
                    </div>
                    <div class="mb-home__owner-prop__card--price">
                      <span class="rupees">₹</span>
                      {item.price}
                      <span class="mb-home__owner-prop__card--size">
                        {item.areaUnit} sqft
                      </span>
                    </div>
                    <div class="mb-home__owner-prop__card--loc">
                      {item.address.street}, {item.address.city}, {item.address.state}
                    </div>
                    <div class="mb-home__owner-prop__card--status">
                      Ready to Move
                    </div>
                    <div class="mb-home__action">
                      <span class="mb-home__action--btn btn-red medium">
                        View Details
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No properties available</p>
        )}
      </div>
    </div>
  );
};

export default Properties;
