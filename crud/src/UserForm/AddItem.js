import React, { useEffect } from "react";
import "./AddItem.css";
import MainLayout from "../Layout__/MainLayout";
import { useState } from "react";
import { apiUrl } from "../Constrains/URL";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "./Form";
import {
  phoneRegex,
  fnRegex,
  emailRegex,
} from "../Validation/Regex";
import "./FormMQ.css";

const AddItem = ({logIdn}) => {
  const [validEmail, setEmail] = useState({
    email: "",
    value: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const loginId = location.state?.loginId;

  const currentDate = new Date();
  const hours =
    currentDate.getHours() < 10
      ? `0${currentDate.getHours()}`
      : `${currentDate.getHours()}`;
  const minutes =
    currentDate.getMinutes() < 10
      ? `0${currentDate.getMinutes()}`
      : `${currentDate.getMinutes()}`;
  const seconds =
    currentDate.getSeconds() < 10
      ? `0${currentDate.getSeconds()}`
      : `${currentDate.getSeconds()}`;

  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  if (day < 10) day = `0${day}`;
  if (month < 10) month = `0${month}`;

  const currentDate1 = `${year}-${month}-${day}`;
  const currentTime = `${hours}-${minutes}-${seconds}`;

  const [formData, setFormData] = useState({
    email: "",
    fn: "",
    ln: "",
    dob: "",
    phone: "",
    address: "",
  });
  const [Error, setError] = useState([]);
  const [apiData, setApiData] = useState([]);

  const data = location.state;

  useEffect(() => {
    const callApiData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setApiData(response.data);
      } catch (error) {
        console.log("Error fetching API data:", error);
      }
    };
    callApiData();
  }, []);
  console.log(location.state?.loginId,"locatttt")
  useEffect(() => {
    if ((location.state.single || location.state.singleData)) {
      const array = location.state;
      console.log(location.state.single,location.state,"daaaaa")
      setFormData({
        email: array.single ? array?.single?.email : array?.singleData?.singleData?.email,
        fn: array.single ? array?.single?.fn : array?.singleData?.singleData?.fn,
        ln: array.single ? array?.single?.ln : array?.singleData?.singleData?.ln,
        dob: array.single ? array?.single?.dob : array?.singleData?.singleData?.dob,
        phone: array.single ? array?.single?.phone : array?.singleData?.singleData?.phone,
        address: array.single ? array?.single?.address : array?.singleData?.singleData?.address,
      });
    }
  }, []);
  console.log(loginId,'loginId');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "nv");
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "email") {
      console.log("comming....");
      if (value === "") {
        Error.email = "Email is Required";
      } else if (!emailRegex.test(value)) {
        Error.email = "Please Enter a Valid Email";
      } else {
        setError((prevState) => {
          const updateData = prevState ? { ...prevState } : {};
          updateData[name] = "";
          return updateData;
        });
      }
    } else {
      setError((prevState) => {
        const updateData = prevState ? { ...prevState } : {};
        updateData[name] = "";
        return updateData;
      });
    }
  };
  let emptyRequirement, allreadyExist, validOrNot;
  const submitAllData = (event) => {
    event.preventDefault();
    let error = {};

    emptyRequirement = true;
    allreadyExist = true;
    validOrNot = true;
    if (formData.email === "") {
      error.email = "Email is Required";
      emptyRequirement = false;
    } else if (!emailRegex.test(formData.email)) {
      error.email = "Please Enter a Valid Email";
      validOrNot = false;
    }
    if (formData.fn === "") {
      error.fn = "First Name is Required";
      emptyRequirement = false;
    } else if (!fnRegex.test(formData.fn)) {
      error.fn = "Please Enter a Valid First Name";
      validOrNot = false;
    }

    if (formData.ln === "") {
      error.ln = "Last Name is Required";
      emptyRequirement = false;
    } else if (!fnRegex.test(formData.ln)) {
      error.ln = "Please Enter a Valid Last Name";
      validOrNot = false;
    }

    if (formData.phone === "") {
      error.phone = "Phone Number is Required";
      emptyRequirement = false;
    } else if (formData.phone.length !== 10) {
      error.phone = "Please Enter a 10 Digit Number";
      validOrNot = false;
    } else if (!phoneRegex.test(formData.phone)) {
      error.phone = "Please Enter a Valid Phone Number";
      validOrNot = false;
    }

    if (formData.address === "") {
      error.address = "Address is Required";
      emptyRequirement = false;
    } else if (formData.address.length > 50) {
      error.address = "Character Limit is 50 only";
      validOrNot = false;
    }

    setError(error);

    if (emptyRequirement && validOrNot && allreadyExist) {
      if (!data.single && !data.singleData) {
        setAllValue();
      } else {
        const id = (data?.single) ? data?.single?.id : data?.singleData.singleData.id
        console.log(id,"id")
        editUserDetails(id);
      }
    }
  };
  const getSingleData = async (email) => {
    const response = await axios.get(`${apiUrl}/identify/${email}`);
    console.log(response.data,"rs")
    navigate("/single", { state: { singleData: response.data, loginId: loginId } })
     return response.data
  }
  const setAllValue = async () => {
    await axios.post(apiUrl, {
      email: formData.email,
      fn: formData.fn,
      ln: formData.ln,
      dob: formData.dob,
      phone: formData.phone,
      address: formData.address,
    });
    !logIdn ? getSingleData(formData.email) : navigate("/display")
    console.log(`${apiUrl}/${formData.email}`)
  
    console.log("Added");
    
  };
  console.log(data, "first");
  const getEditSingleData = async (email) => {
    const response = await axios.get(`${apiUrl}/identify/${email}`);
    console.log(response.data,"editrs")
    navigate("/single", { state: { singleData: response.data, loginId: loginId } })
     return response.data
  }
  const editUserDetails = async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, {
        email: formData.email,
        fn: formData.fn,
        ln: formData.ln,
        dob: formData.dob,
        address: formData.address,
        phone: formData.phone,
      });
      console.log(response.data, "errorrrrrrr");
      if (response.data === false) {
        console.log(response.data, "=---error");
        setError((prevState) => ({
          ...prevState,
          email: "Email is Already Exists",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          email: "",
        }));
      }
      if(loginId){
        navigate("/display",{state:{logIdn:loginId}})
      }
      else{
        getEditSingleData(formData.email)
      }
      loginId ? navigate("/display",{state:{logIdn:loginId}}) : navigate("/single",{state:{logIdn:loginId}});
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  function clearAllData() {
    setFormData({
      email: "",
      fn: "",
      ln: "",
      dob: "",
      address: "",
      phone: "",
    });
  }
  function Cancel() {
    logIdn ? navigate("/display",{state:{loginId:loginId}}) : navigate("/",{state:{loginId:loginId}})
  }
  console.log(Error, "error");
  return (
    <main className="main">
      <MainLayout>
        <Form
          formData={formData}
          Cancel={Cancel}
          clearAllData={clearAllData}
          submitAllData={submitAllData}
          handleInputChange={handleInputChange}
          Error={Error}
          currentDate1={currentDate1}
          data={data}
          setError={setError}
        />
      </MainLayout>
    </main>
  );
};

export default AddItem;
