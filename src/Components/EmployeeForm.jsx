import React from "react";
import styles from "./EmployeeForm.module.css";

export const EmployeeForm = () => {
  const [mainData, setmainData] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const [formData, setFormData] = React.useState({
    name: "",
    age: "",
    address: "",
    salary: "",
    department: "",
    gender: "",
    married: false,
  });

  const handlechange = (e) => {
    const { id, value, type, checked } = e.target;
    // console.log(e);
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const getData = () => {
    fetch(`http://localhost:3004/Employees`)
      .then((res) => res.json())
      .then((res) => {
        setmainData(res);
      });
  };

  const handleAdd = (e) => {
    e.preventDefault();


    const mainjson = JSON.stringify(formData);

    fetch(`http://localhost:3004/Employees`, {
      method: "POST",
      body: mainjson,
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      getData();
    });
  };

  const { name, age, address, department, married, gender, salary } = formData;

  return (
    <>
      <form className={styles.form} onSubmit={handleAdd}>
        <input
          type="text"
          id="name"
          placeholder="Name"
          onChange={handlechange}
          value={name}
        />
        <input
          type="text"
          id="age"
          placeholder="Age"
          onChange={handlechange}
          value={age}
        />
        <input
          type="text"
          id="address"
          placeholder="Address"
          onChange={handlechange}
          value={address}
        />

        <label>
          Married
          <input
            id="married"
            type="checkbox"
            onChange={handlechange}
            checked={married}
          />
        </label>

        <label>
          <select id="gender" onChange={handlechange} value={gender}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </label>

        <label>
          <select id="department" onChange={handlechange} value={department}>
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
        </label>

        <input
          type="text"
          placeholder="Salary"
          id="salary"
          onChange={handlechange}
          value={salary}
        />

        <input type="submit"  />
      </form>

      <div>
        {mainData.map((items, id) => {
          return (
            <div className={styles.box} key={id}>
              <h4>Name: {items.name}</h4>
              <h4>Age: {items.age}</h4>
              <h4>Address: {items.address}</h4>
              <h4>
                Marital Status: {items.married ? "Married" : "Not Married"}
              </h4>
              <h4>Gender: {items.gender}</h4>
              <h4>Department: {items.department}</h4>
              <h4>Salary: {items.salary}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
};
