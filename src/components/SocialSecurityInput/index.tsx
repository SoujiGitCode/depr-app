import React, { useState, useEffect } from 'react';
import { TextField, IconButton, InputAdornment } from "@mui/material";


const SocialSecurityInput = ({ formik, name = 'social_security', setSocialSecurityArray, socialSecurityArray, id = 'social_security' }) => {

  const [realSSN, setRealSSN] = useState('');

  const [displaySSN, setDisplaySSN] = useState('');


  useEffect(() => {
    if (formik.values[name]) {
      setRealSSN(formik.values[name]);
    }
  }, [formik.values[name]]);


  useEffect(() => {
    const maskedValue = maskAndFormatSSN(realSSN);
    setDisplaySSN(maskedValue);
    formik.setFieldValue(name, realSSN, true);
  }, [realSSN]);



  const maskAndFormatSSN = (ssn) => {

    let masked = ssn.slice(0, 5).replace(/\d/g, 'X') + ssn.slice(5);

    if (masked.length > 3) masked = masked.slice(0, 3) + '-' + masked.slice(3);
    if (masked.length > 6) masked = masked.slice(0, 6) + '-' + masked.slice(6);
    return masked;
  };


  const handleChange = (e) => {
    const { value: currentValue } = e.target;

    let inputWithoutHyphens = currentValue.replace(/-/g, '');


    if (displaySSN.length > 10 && inputWithoutHyphens.length > realSSN.length) {
      console.log("Límite alcanzado. Solo se permite borrar.");

      inputWithoutHyphens = realSSN;
    }




    if (inputWithoutHyphens.length > realSSN.length) {

      const newDigit = inputWithoutHyphens.charAt(inputWithoutHyphens.length - 1);
      console.log("Nuevo dígito ingresado:", newDigit);


      if (newDigit.match(/\d/)) {
        if (realSSN.length < 9) setRealSSN(realSSN + newDigit);
      }

    } else if (inputWithoutHyphens.length < realSSN.length) {

      console.log("Se ha borrado un dígito");
      setRealSSN(inputWithoutHyphens);
    }


    const maskedValue = maskAndFormatSSN(inputWithoutHyphens);
    if (realSSN.length < 9) setDisplaySSN(maskedValue);
    setDisplaySSN(maskedValue);
  };



  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      setRealSSN((prev) => prev.slice(0, -1));
    }

    if (!e.key.match(/[0-9]/) && e.key.length === 1) {
      console.log('new val')
      e.preventDefault();
    }
  };


  useEffect(() => {
    setSocialSecurityArray(realSSN.split(''));
    setDisplaySSN(maskAndFormatSSN(realSSN));
  }, [realSSN]);

  return (
    <>
      <TextField
        id='social_security'
        name='social_security'
        value={displaySSN}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="XXX-XX-XXXX"
        onBlur={formik.handleBlur}
        error={formik.touched.social_security && Boolean(formik.errors.social_security)}
        helperText={formik.touched.social_security && typeof formik.errors.social_security === 'string' ? formik.errors.social_security : undefined}
      />
    </>

  );
};

export default SocialSecurityInput;
