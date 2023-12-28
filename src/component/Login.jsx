

import { useNavigate } from 'react-router-dom';
import information from '../assets/BG/information.svg';
import logo from '../assets/icons/Logo.svg';
import next from '../assets/icons/Next.svg';
import { useState,  } from 'react';
import * as XLSX from 'xlsx';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    invoiceNumber: '',
  });

  // const [allUserLoginData, setAllUserLoginData] = useState([]);
  

  const handleNameChange = (e) => {
    const { value } = e.target;
    console.log('Name Changed:', value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      name: value,
    }));
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      phoneNumber: value,
    }));
  };

  const handleInvoiceNumberChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      invoiceNumber: value,
    }));
  };

  // const handleNextButton = () => {
  //   setAllUserLoginData((prevData) => [
  //     ...prevData,
  //     {
  //       name: formData.name,
  //       phoneNumber: formData.phoneNumber,
  //       invoiceNumber: formData.invoiceNumber,
  //     },
  //   ]);

    

  //   // Navigate to the next page
  //   // navigate('/wheel');
  // };

  const handleNextButton = () => {
    const userData = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      invoiceNumber: formData.invoiceNumber,
    };

    // Save the user data in localStorage
    const allUserLoginData = JSON.parse(localStorage.getItem('allUserLoginData')) || [];
    localStorage.setItem('allUserLoginData', JSON.stringify([...allUserLoginData, userData]));

    // Navigate to the next page
    navigate('/wheel');
  };

  // useEffect(() => {
  //   if (allUserLoginData.length > 0) {
  //     navigate('/wheel');
  //   }
  // }, [allUserLoginData, navigate]);


  // const exportToExcel = () => {
  //   const ws = XLSX.utils.json_to_sheet(allUserLoginData);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'UserLoginData');
  //   XLSX.writeFile(wb, 'UserLoginData.xlsx');
  // };

  const exportAllUserData = () => {
    const allUserLoginData = JSON.parse(localStorage.getItem('allUserLoginData')) || [];

    const ws = XLSX.utils.json_to_sheet(allUserLoginData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AllUserLoginData');
    XLSX.writeFile(wb, 'AllUserLoginData.xlsx');
  };

  return (
    <div id="login" style={{ position: 'relative' }}>
      <div
        style={{
          position: 'relative',
          minWidth: '700px',
          minHeight: '800px',
          margin: 'auto',
        }}
      >
        <img
          src={information}
          alt="frame"
          className="mb-10"
          style={{ width: '100%' }}
        />

        <div
          id="login-container"
          style={{
            position: 'absolute',
            top: '44%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            width: '550px',
            height: '495px',
            maxWidth: '500px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div className="flex flex-row">
            <label
              style={{ width: '40%', fontSize: '30px', fontWeight: 'bold' }}
            >
              Name
            </label>
            <input
              value={formData.name}
              onChange={handleNameChange}
              style={{ width: '70%', fontSize: '30px' }}
            />
          </div>

          <div className="flex flex-row">
            <label
              style={{ width: '40%', fontSize: '30px', fontWeight: 'bold' }}
            >
              Phone Number
            </label>
            <input
              value={formData.phoneNumber}
              onChange={handlePhoneNumberChange}
              style={{ width: '70%', fontSize: '30px' }}
            />
          </div>
          <div
            style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}
          ></div>

          <div className="flex flex-row">
            <label
              style={{ width: '40%', fontSize: '30px', fontWeight: 'bold' }}
            >
              Invoice Number
            </label>
            <input
              value={formData.invoiceNumber}
              onChange={handleInvoiceNumberChange}
              style={{ width: '70%', fontSize: '30px' }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-around">
        <img
          src={logo}
          alt="logo"
          style={{ width: '100%', maxWidth: '100px', marginRight: '100px' }}
        />
        <img
          src={next}
          alt="next"
          className="mb-5 ml-40"
          style={{ width: '100%', maxWidth: '100px', marginRight: '100px' }}
          onClick={handleNextButton}
        />
      </div>

      {/* Export button */}
      <button style={{ color: 'red' }} onClick={exportAllUserData}>
        Export to Excel
      </button>
    </div>
  );
};

export default Login;
