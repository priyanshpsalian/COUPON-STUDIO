import React, { useEffect, useState } from "react";
import ComplexTable from "views/admin/default/components/customerSpecificCouponTable";
import ColumnsTable from "../tables/components/ColumnsTable";
import tableDataColumns from "../../../views/admin/tables/variables/tableDataColumns.json"
import {
  columnsDataColumns,
} from "../tables/variables/columnsData.js";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const CustomCard = (props) => {

  const [display, setDisplay] = useState("block");

  const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   getProducts();
  //   // makeTable();
  // }, []);
  const { couponCode, date, category, minPurchase, discount, discountType, maxDiscount, redemptions } = props;
  // const getProducts = async () => {
  //   let result = await fetch(`http://localhost:3000/company`);
  //   result = await result.json();
  //   const newData = result.map((item) => {
  //     return {
  //       name: item.companyName,
  //       date: item.companySite,
  //       progress: item.companyUniqueId,
  //     };
  //   });
  //   setProducts(newData);
  // };

  const handleSubmit = async () => {
    const data= {
        couponCode,
        date,
        category, 
        minPurchase, 
        discount, 
        discountType, 
        maxDiscount, 
        redemptions
      }
    let result = await fetch("http://localhost:3000/productType/dy", {
      method: "post",
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    setDisplay("none");

  }

  return (
    <div className="collapse" style={{display:display, marginTop:"25px"}}>
      <Card className="w-full p-6">
        <CardHeader className="relative h-56">
          {/* <img
          src="/img/blog.jpg"
          alt="img-blur-shadow"
          className="h-full w-full"
        /> */}
          <div className="mt-4 mb-7 flex justify-between">
            <div className="">
              <div className="ml-10 text-2xl font-bold text-blueSecondary">
                {couponCode}{" "}
              </div>
              <div className="text-md ml-10 mt-2 text-red-600">
                Created on: {date}
              </div>
            </div>

            <div className="pr-10 pt-2">
              <button
                // type="submit"
                onClick={handleSubmit}
                // disabled={disables}
                class="h-[50px] w-[100px] rounded-xl bg-ourTheme text-xl font-bold text-[#000000] hover:bg-ourDarkTheme  hover:text-lightPrimary"
              >
                ADD
              </button>
            </div>
          </div>

          <Typography variant="h5" className="ml-10 mb-2 text-lg">
            <div className="grid grid-cols-3">
              <div className="w-4/5 rounded-md bg-yellow-400 p-2 pl-4">
                Category: {category}
              </div>
              <div className="">
                ₹&nbsp;&nbsp;&nbsp; Discount Type: {discountType}
              </div>
              <div className="">%&nbsp;&nbsp;&nbsp; Discount: {discount}</div>
            </div>
            <div className="mt-5 grid grid-cols-3">
              <div className="">
                ₹&nbsp;&nbsp;&nbsp; Minimum Purcahse: {minPurchase}{" "}
              </div>
              <div className="">
                ₹&nbsp;&nbsp;&nbsp; Maximum Discount: {maxDiscount}{" "}
              </div>
              <div className="">
                ~&nbsp;&nbsp;&nbsp; Maximum redemptions: {redemptions}
              </div>
            </div>
          </Typography>
          <Typography className="ml-10 mt-1"></Typography>
        </CardHeader>
        {/* <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="small">$899/night</Typography>
          <Typography variant="small" color="gray" className="flex gap-1">
            <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
            Barcelona, Spain
          </Typography>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default CustomCard;
