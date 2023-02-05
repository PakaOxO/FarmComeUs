import React from "react";
import classes from "./style/ProductItem.module.scss";
import Card from "../common/Card";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  return (
    <li className={`${classes.productItem}`}>
      <Link to={`/product-detail`} state={{ productInfo: props.item }}>
        <Card className={`${classes.productCard}`}>
          <img src="https://via.placeholder.com/300" alt="productImg" />
          <div className={`${classes.productInfo}`}>
            <div className={`${classes.productName}`}>
              <div className={classes.text}>{props.product.productName}</div>
            </div>
            <div className={`${classes.priceInfo}`}>
              <span className={`${classes.discount}`}>
                {`${props.product.discount}%`}
              </span>
              <span>{`${props.product.price} / ${props.product.unit}상자`}</span>
            </div>
            <div className={`${classes.storeInfo}`}>
              <span className={`${classes.storeName}`}>
                {props.product.storeName}
              </span>
              <span> 스토어</span>
            </div>
          </div>
        </Card>
      </Link>
    </li>
  );
};

export default ProductItem;
