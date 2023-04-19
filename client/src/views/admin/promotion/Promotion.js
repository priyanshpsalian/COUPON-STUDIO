import React from "react";
import { useState, useEffect } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import ComplexTable from "views/admin/default/components/promotionTable";

const Promotion = () => {
  const defaultValue = {
    year: 2023,
    month: 3,
    day: 11
  }
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [details, setDetails] = useState({
    promotionName: "",
    promotionType: "New Customer",
    onProductType: "Clothing",
    targetAudience: "Middle-Aged",
    couponLength: "",
    couponCodeType: "AlphaNumeric",
    couponCode: "",
    usage: {
      type: "Limited",
      limit: 1
    },
    minPurchase: 0,
    maxDiscount: 0,
    reward: {
      type: "Fixed Amount",
      amount: 0
    },
    expiryDate: {
      year: 2023,
      month: 3,
      day: 11
    }
  });
  const updateData = async (e) => {
    e.preventDefault();
    console.log(e);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    };
    const response = await fetch(
      `http://localhost:3000/productType/updateProgram/${iid}`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    getProducts()
  };
  const columnsDataComplex = [
    {
      Header: "Promotion Name",
      accessor: "name",
    },
    {
      Header: "Coupon Code",
      accessor: "date",
    },
    {
      Header: "Edit",
      accessor: "progress",
    },
    {
      Header: "Delete",
      accessor: "status",
    },
  ];
  const [disables, setdisables] = useState(false);
  const [iid, setId] = useState("");
  const [table, setTable] = useState([]);
  useEffect(() => {
    getProducts();
    // makeTable();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`http://localhost:3000/productType`);
    result = await result.json();
    const newData = result.map((item) => {
      // console.log(item);
      return {
        name: item.programName,
        date: item.couponCode,
        progress: item._id,
        status: item._id,
      };
    });
    // console.log(newData);
    setTable(newData);
    //   console.log(newData);
  };
  const Edit = async (e) => {
    console.log(e.target.value);
    //   console.log(details);
    let id = e.target.value;
    let result = await fetch(`http://localhost:3000/productType/get/${id}`);
    setId(id);
    result = await result.json();
    console.log(result.user.minPurchase);
    setDetails({
      // productURL: result.user.url,
      // receiverEmail: result.user.emailId,
      // maxAmount: result.user.amt,
      // couponLength: result.user.couponLength,
      // couponCodeType: result.user.couponCodeType,
      // couponCode: result.user.couponCode,

      promotionName: result.user.programName,
      couponType: result.user.promotionType,
      onProductType: result.user.onProductType,
      targetAudience: result.user.targetAudience,
      couponLength: result.user.couponLength,
      couponCodeType: result.user.couponCodeType,
      couponCode: result.user.couponCode,
      validity: result.user.expiryDate,
      minPurchase: result.user.minPurchase,
      maxDiscount: result.user.maxDiscount,
      usage: result.user.usage,
      reward: result.user.reward,
    });
    // setDetails(result.user);
    console.log(details, "result");
    setdisables(true);
      // getProducts();
  };
  const Delete = async (e) => {
    console.log(e.target);
    console.log(e.target.value);
    let id = e.target.value;
    // let result = await fetch(`http://localhost:3000/UserSpecific/get/${id}`);
    // result = await result.json();
    // setDetails(result.user);
    // console.log(details, "result");
    fetch(`http://localhost:3000/productType/${id}`, {
      method: "DELETE",
    }).then((data) => console.log(data, "deleted"));
    getProducts();
  };
  //9820134444
  const Numeric8 = ["24173515", "99482462", "45851713"]
  const Alphabetic8 = ["QLKRCBZQ", "AOOHFCWC", "XUBIACND"]
  const AlphaNumeric8 = ["LLU92K6J", "HPKH9R5U", "87C5FE1S"]
  const Numeric12 = ["325833045049", "282214860064", "526283432214"]
  const Alphabetic12 = ["NRAPGOLKRUAF", "KQNNXTQCZTEB", "EGGIMGUWVSHZ"]
  const AlphaNumeric12 = ["14OTU7AB611X", "LZVA27EQLI50", "RWL4FQM323E4"]
  const Numeric16 = ["1910945135043757", "4736961579371537", "9174686308257580"]
  const Alphabetic16 = ["WRKROUGATVOKAWVJ", "EMVIGDYOXDMWEIEY", "JMTFCZOJITZCAQIP"]
  const AlphaNumeric16 = ["TZZNDY246S64VUFC", "258P222233M4YZNM", "8C2C54W0IH2U72C1"]

  const randomGenerate = (type, length) => {
    if (type === "Numeric" && length <= 8) {
      return Numeric8[Math.floor(Math.random() * 3)]
    }
    else if (type === "Numeric" && length <= 12) {
      return Numeric12[Math.floor(Math.random() * 3)]
    }
    else if (type === "Numeric" && length <= 16) {
      return Numeric16[Math.floor(Math.random() * 3)]
    }

    if (type === "AlphaNumeric" && length <= 8) {
      return AlphaNumeric8[Math.floor(Math.random() * 3)]
    }
    else if (type === "AlphaNumeric" && length <= 12) {
      return AlphaNumeric12[Math.floor(Math.random() * 3)]
    }
    else if (type === "AlphaNumeric" && length <= 16) {
      return AlphaNumeric16[Math.floor(Math.random() * 3)]
    }

    if (type === "Alphabetic" && length <= 8) {
      return Alphabetic8[Math.floor(Math.random() * 3)]
    }
    else if (type === "Alphabetic" && length <= 12) {
      return Alphabetic12[Math.floor(Math.random() * 3)]
    }
    else if (type === "Alphabetic" && length <= 16) {
      return Alphabetic16[Math.floor(Math.random() * 3)]
    }
  }
  
  const generateCode = (type, length) => {
    let alphanum = "";
    if (type === "Numeric")
      alphanum = "0123456789"
    else if (type === "Alphabetic")
      alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    else if (type === "AlphaNumeric")
      alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789";

    var code = "";

    for (var i = 0; i < length; i++) {
      code += alphanum.charAt(Math.floor(Math.random() * alphanum.length));
    }
    console.log(code);
    return code;
    // if (generated.indexOf(code) === -1) {
    //   generated.push(code);
    // } else {
    //   generateCode(type, length);
    // }

  }
  // const Change = (e) => {
  //   console.log(e);
  //   console.log(details);
  //   setDetails(...details, e.target.name: e.target.value);

  // }
  const handleCoupon=async(e)=>{
    e.preventDefault();
    if (details.couponCodeType !== "Custom") {
      let code = await randomGenerate(
        details.couponCodeType,
        details.couponLength
      );
      console.log(code);
      setDetails({ ...details, couponCode: code }, () => console.log(details));
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    // if (details.couponCodeType !== "Custom") {
    //   let code = await randomGenerate(details.couponCodeType, details.couponLength)
    //   console.log(code);
    //   setDetails({ ...details, couponCode: code }, ()=>(console.log(details)));
    // }

    // console.log(details, "details");
    let result = await fetch("http://localhost:3000/productType", {
      method: "post",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
      console.log(result, "result");
      getProducts();
    // localStorage.setItem("admin", JSON.stringify(result));
    // navigate("/");
  }


  return (
    <div className="flex w-full flex-col gap-5">
      <form onSubmit={handleSubmit} action="" className="mt-5">
        <div className="mt-6 mb-8 grid grid-cols-1 md:grid-cols-2 md:gap-12 lg:grid-cols-2 xl:grid-cols-2">
          <div className="">
            <label
              htmlFor="id1"
              className={`mt-5 mb-5 ml-6 text-xl font-bold text-navy-700 dark:text-white`}
            >
              Promotion Name
            </label>
            <input
              value={details.promotionName}
              type="text"
              id="id1"
              onChange={(e) => {
                setDetails({ ...details, promotionName: e.target.value });
              }}
              placeholder="Enter the program name"
              className={`h-15 mb-5 mt-3 ml-3 flex w-full items-center justify-center rounded-xl border bg-formBg p-2 pl-4 text-lg outline-none`}
            />

            <div className="mb-6 w-full px-3 md:mb-0">
              <label
                htmlFor="progType"
                className={`mt-5 ml-3 text-xl font-bold text-navy-700 dark:text-white`}
              >
                Promotion Type
              </label>
              <div className="relative">
                <select
                  name="couponType"
                  value={details.promotionType}
                  onChange={(e) => {
                    let x = e.target.value;
                    setDetails({ ...details, promotionType: x });
                  }}
                  className="mt-3 mr-3 block w-full appearance-none rounded-xl border border-gray-200 bg-formBg py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-state"
                >
                  <option value="New Customer">New Customer</option>
                  <option value="Existing Customer">Existing Customer</option>
                  <option value="Returning Customer">Returning Customer</option>
                  <option value="General Promotion">General Promotion</option>
                  <option value="Loyalty Cards">Loyalty Cards</option>
                  <option value="Buy X get Y">Buy X get Y</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-7 mb-6 w-full px-3 md:mb-0">
              <label
                htmlFor="condRules"
                className={`mt-9 ml-3 text-xl font-bold text-navy-700 dark:text-white`}
              >
                Conditions Rules :
              </label>
              <br />
              <div className="mt-4">
                <label
                  htmlFor="minSpent"
                  className={`ml-3 text-lg font-bold text-navy-700 dark:text-white`}
                >
                  Minimum purchase &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </label>

                <input
                  type="text"
                  id="id1"
                  onChange={(e) => {
                    setDetails({ ...details, minPurchase: e.target.value });
                  }}
                  placeholder="Min purchase amount"
                  disabled={false}
                  className={`h-15 mt-3 rounded-xl border bg-formBg p-2 pl-5 text-lg outline-none`}
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="maxDis"
                  className={`mt-2 ml-3 text-lg font-bold text-navy-700 dark:text-white`}
                >
                  Maximum discount &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </label>

                <input
                  value={details.maxDiscount}
                  type="text"
                  id="id1"
                  onChange={(e) => {
                    setDetails({ ...details, maxDiscount: e.target.value });
                  }}
                  placeholder="Max applicable discount"
                  disabled={false}
                  className={`h-15 mt-3 rounded-xl border bg-formBg p-2 pl-5 text-lg outline-none`}
                />
              </div>
              <div className="mt-5">
                <label
                  htmlFor="prodType"
                  className={`mt-2 ml-3 text-lg font-bold text-navy-700 dark:text-white`}
                >
                  Select Product Category: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp;
                </label>

                <div className="relative mt-1">
                  <select
                    name="couponType"
                    value={details.onProductType}
                    onChange={(e) => {
                      let x = e.target.value;
                      setDetails({ ...details, onProductType: x });
                    }}
                    className="butborder mt-3 mr-3 block w-full appearance-none rounded-xl border-gray-200 bg-formBg py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-state"
                  >
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Furniture">Medicine</option>
                    <option value="Furniture">Healthcare</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-7 mb-6 w-full px-3 md:mb-0">
              <label
                htmlFor="condRules"
                className={`mt-6 ml-3 text-xl font-bold text-navy-700 dark:text-white`}
              >
                Reward :
              </label>
              <br />
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
                <div className="mr-4">
                  <div className="relative">
                    <select
                      onChange={(e) => {
                        let x = e.target.value;
                        setDetails({
                          ...details,
                          reward: { type: x, amount: details.reward.amount },
                        });
                      }}
                      className="mr-3 block w-full appearance-none rounded-xl border border-gray-200 bg-formBg py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-state"
                    >
                      <option value="Fixed Amount">Absolute</option>
                      <option value="Percentage">Percentage</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="">
                  <input
                    value={details.reward.amount}
                    type="text"
                    id="id1"
                    placeholder="Enter amount"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        reward: {
                          type: details.reward.type,
                          amount: e.target.value,
                        },
                      });
                    }}
                    disabled={false}
                    className={`h-15 flex w-full items-center justify-center rounded-xl border bg-formBg p-2 pl-5 text-lg outline-none`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 ml-3">
              <label
                htmlFor="targetAud"
                className={`mt-2 ml-3 text-lg font-bold text-navy-700 dark:text-white`}
              >
                Target Audience
              </label>

              {/* <input
              value={details.targetAudience}
              onChange={(e) => { setDetails({ ...details, targetAudience: e.target.value }) }}
              type="text"
              id="id1"
              placeholder="Target Audience"
              disabled={false}
              className={`flex items-center justify-center w-full mt-3 h-15 rounded-xl border p-2 text-lg outline-none pl-5 bg-formBg`}
            /> */}
              <div className="relative">
                <select
                  name="couponType"
                  value={details.targetAudience}
                  onChange={(e) => {
                    let x = e.target.value;
                    setDetails({ ...details, targetAudience: x });
                  }}
                  className="mt-3 mr-3 block w-full appearance-none rounded-xl border border-gray-200 bg-formBg py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-state"
                >
                  <option value="Middle-Aged">Middle-Aged</option>
                  <option value="Gen-Z">Gen-Z</option>
                  <option value="New Customers">New Customers</option>
                  <option value="Returning Customers">
                    Returning Customers
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="mb-6 w-full px-3 md:mb-0">
              <label
                htmlFor="progType"
                className={`mt-5 ml-3 text-xl font-bold text-navy-700 dark:text-white`}
              >
                Redemption Limit
              </label>
              <div className="mt-3 grid grid-cols-2">
                <div className="mr-4">
                  <div className="relative">
                    <select
                      value={details.usage.type}
                      onChange={(e) => {
                        let x = e.target.value;
                        e.target.value = "Unlimited"
                          ? setDetails({
                              ...details,
                              usage: { type: x, limit: -1 },
                            })
                          : setDetails({
                              ...details,
                              usage: { type: x, limit: details.usage.limit },
                            });
                      }}
                      className="mr-3 block w-full appearance-none rounded-xl border border-gray-200 bg-formBg py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-state"
                    >
                      <option value="Limited">Limited</option>
                      <option value="Unlimited">Unlimited</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="">
                  <input
                    value={details.usage.limit}
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        usage: {
                          type: details.usage.type,
                          limit: e.target.value,
                        },
                      });
                    }}
                    type="text"
                    id="id1"
                    placeholder="Enter usage limit"
                    disabled={details.usage.type === "unlimited" ? true : false}
                    className={`h-15 mb-5 flex w-full items-center justify-center rounded-xl border bg-formBg p-2 pl-5 text-lg outline-none`}
                  />
                </div>
              </div>

              <label
                htmlFor="validity"
                className={`mt-3 ml-3 block text-xl font-bold text-navy-700 dark:text-white`}
              >
                Validity
              </label>
            </div>

            <div className="flex justify-center">
              <div className="">
                <div className="display-none mt-3">
                  <Calendar
                    value={selectedDay}
                    colorPrimary="#422afb" // added this
                    onChange={(e) => {
                      console.log(e);
                      setDetails({
                        ...details,
                        expiryDate: {
                          year: e.year,
                          month: e.month,
                          day: e.day,
                        },
                      });
                      setSelectedDay({
                        year: e.year,
                        month: e.month,
                        day: e.day,
                      });
                    }}
                    shouldHighlightWeekends
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
              <div className="mt-5">
                <label
                  htmlFor="targetAud"
                  className={`mt-2 ml-3 text-lg font-bold text-navy-700 dark:text-white`}
                >
                  Length of Coupon
                </label>

                <input
                  value={details.couponLength}
                  onChange={(e) => {
                    setDetails({ ...details, couponLength: e.target.value });
                  }}
                  type="text"
                  id="id1"
                  placeholder="Enter Coupon Length"
                  disabled={false}
                  className={`h-15 mt-3 flex w-full items-center justify-center rounded-xl border bg-formBg p-2 pl-5 text-lg outline-none`}
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="targetAud"
                  className={`mt-2 ml-3 text-lg font-bold text-navy-700 dark:text-white`}
                >
                  Code type
                </label>

                <div className="relative mt-1">
                  <select
                    name="couponType"
                    value={details.couponCodeType}
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        couponCodeType: e.target.value,
                      });
                    }}
                    className="mt-3 mr-3 block w-full appearance-none rounded-xl border border-gray-200 bg-formBg py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-state"
                  >
                    <option value="AlphaNumeric">AlphaNumeric</option>
                    <option value="Numeric">Numeric</option>
                    <option value="Alphabetic">Alphabetic</option>
                    <option value="Custom">Custom</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
              <div className="flex justify-center">
                <button
                  onClick={handleCoupon}
                  class="text-blue h-[50px] w-full rounded-xl bg-ourTheme text-xl font-bold hover:bg-ourDarkTheme  hover:text-lightPrimary"
                >
                  Generate Coupon
                </button>
              </div>

              <input
                type="text"
                id="id1"
                value={details.couponCode}
                onChange={(e) => {
                  setDetails({ ...details, couponCode: e.target.value });
                }}
                placeholder="Enter Custom Code"
                disabled={details.couponCodeType !== "Custom" ? true : false}
                className={` h-15 flex w-full items-center justify-center rounded-xl border bg-formBg p-2 pl-5 text-lg outline-none`}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              class="text-blue h-[50px] w-full rounded-xl bg-ourTheme text-xl font-bold hover:bg-ourDarkTheme  hover:text-lightPrimary"
            >
              Create Coupon
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={updateData}
              class="text-blue h-[50px] w-full rounded-xl bg-ourTheme text-xl font-bold hover:bg-ourDarkTheme  hover:text-lightPrimary"
            >
              Update Coupon
            </button>
          </div>
        </div>
      </form>

      <div className="mt-6">
        <ComplexTable
          edit={Edit}
          delet={Delete}
          columnsData={columnsDataComplex}
          tableData={table}
        />
      </div>
    </div>
  );
};

export default Promotion;
