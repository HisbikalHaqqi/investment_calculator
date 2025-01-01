"use client";
import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";
import { pricingData } from "@/stripe/pricingData";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { Table, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Divider, Typography, Link } from '@mui/material';
import { useState } from "react";
import FormDepresiasiMenurun from "./FormDepresiasiMenurun";
import FormDepresiasiSaldoMenurun from "./FormDepresiasiSaldoMenurun";
import {validatePersentase, formatNumberWithCommas,parseNumber} from "@/helper/formatCurrency";


const Pricing = () => {

  const [numSukuBunga, setNumSukuBunga] = useState<string>('0'); 
  const [numRows, setNumRows] = useState<number>(1); 
  const [pembelianAktivaTetap, setPembelianAktivaTetap] = useState<string>('0');
  const [kebutuhanModalKerja, setKebutuhanModalKerja] = useState<string>('0');
  const [numNilaiSisa, setNumNilaiSisa] = useState<string>('0'); 
  const [numPayback, setNumPayback] = useState<number>(1); 
  const [numRasio1, setNumRasio1] = useState<string>('0'); 
  const [numReinvestmentRate, setNumReinvestmentRate] = useState<string>('0'); 

  const [errorPembelianAktivaTetap, setErrorPembelianAktivaTetap] = useState<boolean>(false);
  const [errorKebutuhanModalKerja, setErrorKebutuhanModalKerja] = useState<boolean>(false);
  const [errorTahun, setErrorTahun] = useState<boolean>(false);
  const [errorSukuBunga, setErrorSukuBunga] = useState<boolean>(false);
  const [errorNilaiSisa, setErrorNilaiSisa] = useState<boolean>(false);
  const [errorPayback, setErrorPayback] = useState<boolean>(false);
  const [errorRasio1, setErrorRasio1] = useState<boolean>(false);
  const [errorReinvestmentRate, setErrorReinvestmentRate] = useState<boolean>(false);

  const [helperTextPembelianAktivaTetap, setHelperTextPembelianAktivaTetap] = useState<string>('');
  const [helperTextKebutuhanModalKerja, setHelperTextKebutuhanModalKerja] = useState<string>('');
  const [helperSukuBunga, setHelperSukuBunga] = useState<string>('');
  const [helperTahun, setHelperTahun] = useState<string>('');
  const [helperTextNumNilaiSisa, setHelperTextNumNilaiSisa] = useState<string>('');
  const [helperTextNumPayback, setHelperTextNumPayback] = useState<string>('');
  const [showFormNext, setFormNext] = useState<boolean>(false);
  const [helperTextNumRasio1, setHelperRasihelperTextNumRasio1] = useState<string>('');
  const [helperTextNumReinvestmentRate, setHelperTextNumReinvestmentRate] = useState<string>('');
  

  const handleSukuBungaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumSukuBunga(value);  
  };

  /* handling create table dynamic from inputan */
  const [rows, setRows]                 = useState<string[]>(Array(numRows).fill('')); 
  const handleTahunNumChange            = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newNumRows                    = parseInt(e.target.value, 10) || 0; 
    setNumRows(newNumRows);
  };
  /* handling create table dynamic from inputan */

  const handleBlurTahun = (newNumRows:number) => {
    if((newNumRows == 0) && (newNumRows >=20)){
      setErrorTahun(true)
      setHelperTahun("Nilai ekonomis tahun tidak valid")
    }else{
      setErrorTahun(false)
      setHelperTahun("")
    }
   
    setRows(Array(newNumRows).fill(''));
   
  }

  /* handling tab bar */
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  /* handling tab bar */

  const handleChangePembelianAktivaTetap = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatNumberWithCommas(value);
    setPembelianAktivaTetap(formattedValue);

    const numericValue = parseNumber(value);

    if (numericValue == 0) {
      setErrorPembelianAktivaTetap(true);
      setHelperTextPembelianAktivaTetap('Kolom harus diisi');
    }else{
      setErrorPembelianAktivaTetap(false);
      setHelperTextPembelianAktivaTetap('');
    }
  };

  const handleChangeKebutuhanModalKerja = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatNumberWithCommas(value);
    setKebutuhanModalKerja(formattedValue);

    const numericValue = parseNumber(value);

    if (numericValue <= 0 || isNaN(numericValue)) {
      setErrorKebutuhanModalKerja(true);
      setHelperTextKebutuhanModalKerja('Kolom harus diisi');
    }else{
      setErrorKebutuhanModalKerja(false);
      setHelperTextKebutuhanModalKerja('');
    }
  };

  const handleNilaiSisa = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatNumberWithCommas(value);
    setNumNilaiSisa(formattedValue);

    const numericValue = parseNumber(value);

    if (numericValue == 0) {
      setErrorNilaiSisa(true);
      setHelperTextNumNilaiSisa('Kolom harus diisi');
    }else{
      setErrorNilaiSisa(false);
      setHelperTextNumNilaiSisa('');
    }
  };

  const handleInputChange = (colIndex:number, value:string) => {
  
    const updatedRows = [...rows] 
    updatedRows[colIndex] = value

    updatedRows[colIndex] = formatNumberWithCommas(value)
    setRows(updatedRows)
  };

  const handlePayback= (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newNumPayback = parseInt(e.target.value, 10) || 0; 

    if( newNumPayback == 0){
      setErrorPayback(true)
      setHelperTextNumPayback("Tidak valid")
    }else{
      setErrorPayback(false)
      setHelperTextNumPayback("")
   
    }
    setNumPayback(newNumPayback);
   
  };

  const handleAnalisis = () => {

    const prediksiLaba   = JSON.stringify(rows)
    
    const analysisData: { [key: string]: string | number } = {
      pembelianAktivaTetap,
      kebutuhanModalKerja,
      numSukuBunga,
      numRows,
      prediksiLaba,
      numNilaiSisa,
      numPayback,
      numRasio1,
      numReinvestmentRate
    };

    for (const key in analysisData) {
      if (analysisData.hasOwnProperty(key)) {
        const value = analysisData[key];
        if (typeof value !== 'string') {
          localStorage.setItem(key, JSON.stringify(value));  
        } else {
          localStorage.setItem(key, value);
        }
      }
    }

    setFormNext(true)
  }

  const handleHapusAnalisis = () => {
    setNumRows(1)
    setPembelianAktivaTetap('0')
    setKebutuhanModalKerja('0')
    setKebutuhanModalKerja('0')
    setNumSukuBunga("")
    setNumRasio1('0')
    setNumReinvestmentRate('0')
    setRows(Array(numRows).fill('0'))
    setValue(0)
    setNumNilaiSisa('0')

    localStorage.clear();
    setFormNext(false)

   
  }

  const handleRasio1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumRasio1(value);
  };

  const handleReinvestmentRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumReinvestmentRate(value);
  };

  const handleValidationPresentase = (component:string,value:string) => {
    const validationResult = validatePersentase(value);
    switch(component) {
      case 'sukuBunga':
        if (validationResult === true) {
          setNumSukuBunga(value);  
          setErrorSukuBunga(false); 
          setHelperSukuBunga('');  
        } else {
          setErrorSukuBunga(true); 
          setHelperSukuBunga(validationResult as string);
        }
        break;
      case 'rasioARR':

        if (validationResult === true) {
          setNumRasio1(value);
          setErrorRasio1(false);
          setHelperRasihelperTextNumRasio1('');
        } else {
          setErrorRasio1(true);
          setHelperRasihelperTextNumRasio1(validationResult as string);
        }
        break;
      case 'reinvestmentRate':

        if (validationResult === true) {
          setNumReinvestmentRate(value);
          setErrorReinvestmentRate(false);
          setHelperTextNumReinvestmentRate('');
        } else {
          setErrorReinvestmentRate(true);
          setHelperTextNumReinvestmentRate(validationResult as string);
        }
        break;
    }
  }


  return (
    <section className="pb-8 pt-20 mb-5 dark:bg-dark lg:pb-[40px] lg:pt-[120px]">
    
      <div className="container">
        <div className="mb-5">
          <span className="absolute left-4 top-10 -z-[1]">
            <svg
              width="48"
              height="134"
              viewBox="0 0 48 134"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="45.6673"
                cy="132"
                r="1.66667"
                transform="rotate(180 45.6673 132)"
                fill="#13C296"
              />
              <circle
                cx="45.6673"
                cy="117.333"
                r="1.66667"
                transform="rotate(180 45.6673 117.333)"
                fill="#13C296"
              />
              <circle
                cx="45.6673"
                cy="102.667"
                r="1.66667"
                transform="rotate(180 45.6673 102.667)"
                fill="#13C296"
              />
              <circle
                cx="45.6673"
                cy="88.0001"
                r="1.66667"
                transform="rotate(180 45.6673 88.0001)"
                fill="#13C296"
              />
              <circle
                cx="45.6673"
                cy="73.3335"
                r="1.66667"
                transform="rotate(180 45.6673 73.3335)"
                fill="#13C296"
              />
              <circle
                cx="45.6673"
                cy="45.0001"
                r="1.66667"
                transform="rotate(180 45.6673 45.0001)"
                fill="#13C296"
              />
              <circle
                cx="45.6673"
                cy="16.0001"
                r="1.66667"
                transform="rotate(180 45.6673 16.0001)"
                fill="#13C296"
              />
              <circle
                cx="45.6673"
                cy="59.0001"
                r="1.66667"
                transform="rotate(180 45.6673 59.0001)"
                fill="#13C296"
              />
              <circle
                cx="45.6673"
                cy="30.6668"
                r="1.66667"
                transform="rotate(180 45.6673 30.6668)"
                fill="#13C296"
              />
              <circle
                cx="45.6673"
                cy="1.66683"
                r="1.66667"
                transform="rotate(180 45.6673 1.66683)"
                fill="#13C296"
              />
              <circle
                cx="31.0013"
                cy="132"
                r="1.66667"
                transform="rotate(180 31.0013 132)"
                fill="#13C296"
              />
              <circle
                cx="31.0013"
                cy="117.333"
                r="1.66667"
                transform="rotate(180 31.0013 117.333)"
                fill="#13C296"
              />
              <circle
                cx="31.0013"
                cy="102.667"
                r="1.66667"
                transform="rotate(180 31.0013 102.667)"
                fill="#13C296"
              />
              <circle
                cx="31.0013"
                cy="88.0001"
                r="1.66667"
                transform="rotate(180 31.0013 88.0001)"
                fill="#13C296"
              />
              <circle
                cx="31.0013"
                cy="73.3335"
                r="1.66667"
                transform="rotate(180 31.0013 73.3335)"
                fill="#13C296"
              />
              <circle
                cx="31.0013"
                cy="45.0001"
                r="1.66667"
                transform="rotate(180 31.0013 45.0001)"
                fill="#13C296"
              />
              <circle
                cx="31.0013"
                cy="16.0001"
                r="1.66667"
                transform="rotate(180 31.0013 16.0001)"
                fill="#13C296"
              />
              <circle
                cx="31.0013"
                cy="59.0001"
                r="1.66667"
                transform="rotate(180 31.0013 59.0001)"
                fill="#13C296"
              />
              <circle
                cx="31.0013"
                cy="30.6668"
                r="1.66667"
                transform="rotate(180 31.0013 30.6668)"
                fill="#13C296"
              />
              <circle
                cx="31.0013"
                cy="1.66683"
                r="1.66667"
                transform="rotate(180 31.0013 1.66683)"
                fill="#13C296"
              />
              <circle
                cx="16.3333"
                cy="132"
                r="1.66667"
                transform="rotate(180 16.3333 132)"
                fill="#13C296"
              />
              <circle
                cx="16.3333"
                cy="117.333"
                r="1.66667"
                transform="rotate(180 16.3333 117.333)"
                fill="#13C296"
              />
              <circle
                cx="16.3333"
                cy="102.667"
                r="1.66667"
                transform="rotate(180 16.3333 102.667)"
                fill="#13C296"
              />
              <circle
                cx="16.3333"
                cy="88.0001"
                r="1.66667"
                transform="rotate(180 16.3333 88.0001)"
                fill="#13C296"
              />
              <circle
                cx="16.3333"
                cy="73.3335"
                r="1.66667"
                transform="rotate(180 16.3333 73.3335)"
                fill="#13C296"
              />
              <circle
                cx="16.3333"
                cy="45.0001"
                r="1.66667"
                transform="rotate(180 16.3333 45.0001)"
                fill="#13C296"
              />
              <circle
                cx="16.3333"
                cy="16.0001"
                r="1.66667"
                transform="rotate(180 16.3333 16.0001)"
                fill="#13C296"
              />
              <circle
                cx="16.3333"
                cy="59.0001"
                r="1.66667"
                transform="rotate(180 16.3333 59.0001)"
                fill="#13C296"
              />
              <circle
                cx="16.3333"
                cy="30.6668"
                r="1.66667"
                transform="rotate(180 16.3333 30.6668)"
                fill="#13C296"
              />
              <circle
                cx="16.3333"
                cy="1.66683"
                r="1.66667"
                transform="rotate(180 16.3333 1.66683)"
                fill="#13C296"
              />
              <circle
                cx="1.66732"
                cy="132"
                r="1.66667"
                transform="rotate(180 1.66732 132)"
                fill="#13C296"
              />
              <circle
                cx="1.66732"
                cy="117.333"
                r="1.66667"
                transform="rotate(180 1.66732 117.333)"
                fill="#13C296"
              />
              <circle
                cx="1.66732"
                cy="102.667"
                r="1.66667"
                transform="rotate(180 1.66732 102.667)"
                fill="#13C296"
              />
              <circle
                cx="1.66732"
                cy="88.0001"
                r="1.66667"
                transform="rotate(180 1.66732 88.0001)"
                fill="#13C296"
              />
              <circle
                cx="1.66732"
                cy="73.3335"
                r="1.66667"
                transform="rotate(180 1.66732 73.3335)"
                fill="#13C296"
              />
              <circle
                cx="1.66732"
                cy="45.0001"
                r="1.66667"
                transform="rotate(180 1.66732 45.0001)"
                fill="#13C296"
              />
              <circle
                cx="1.66732"
                cy="16.0001"
                r="1.66667"
                transform="rotate(180 1.66732 16.0001)"
                fill="#13C296"
              />
              <circle
                cx="1.66732"
                cy="59.0001"
                r="1.66667"
                transform="rotate(180 1.66732 59.0001)"
                fill="#13C296"
              />
              <circle
                cx="1.66732"
                cy="30.6668"
                r="1.66667"
                transform="rotate(180 1.66732 30.6668)"
                fill="#13C296"
              />
              <circle
                cx="1.66732"
                cy="1.66683"
                r="1.66667"
                transform="rotate(180 1.66732 1.66683)"
                fill="#13C296"
              />
            </svg>
          </span>
        </div>

        <SectionTitle
          width="640px"
          center
            subtitle="Aplikasi"
            title="Kalkulator Kelayakan Sebuah Investasi "
            paragraph="Kalkulator ini digunakan untuk menghitung kelayakan investasi dengan paramater yang ditentukan oleh pengguna sendiri"
        />
      
        <div className="mt-5">
            <div
              className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14"
              data-wow-delay=".1s"
              >
              <h3 className="mb-8 text-2xl font-semibold text-dark dark:text-white md:text-[28px] md:leading-[1.42]">Data Finansial Investasi</h3>
                
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                    noValidate
                    autoComplete="off"
                  >
                      <TextField
                        id="outlined-helperText"
                        label="Pembelian Aktiva Tetap"
           
                        value={pembelianAktivaTetap}
                        onChange={handleChangePembelianAktivaTetap}
                        error={errorPembelianAktivaTetap}
                        helperText= {errorPembelianAktivaTetap ? helperTextPembelianAktivaTetap :''}
                        fullWidth
                      />

                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField
                      id="outlined-helperText"
                      label="Kebutuhan Modal Kerja"
                      value={kebutuhanModalKerja}
                      onChange={handleChangeKebutuhanModalKerja}
                      error={errorKebutuhanModalKerja}
                      helperText= {errorKebutuhanModalKerja ? helperTextKebutuhanModalKerja :''}
                    />
                  </Box>
                </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                    noValidate
                    autoComplete="off"
                  >
                      <TextField
                        id="outlined-helperText"
                        label="Usia Ekonomis (Tahun)"
                        value={numRows}
                        error={errorTahun}
                        onChange={handleTahunNumChange}
                        onBlur={() =>{handleBlurTahun(numRows)}}
                        helperText={errorTahun ? helperTahun : ''}
                      />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-helperText"
                      label="Tingkat Suku Bunga (0.0) (%)"
                      value={numSukuBunga}
                      onBlur={() => handleValidationPresentase('sukuBunga',numSukuBunga)}
                      onChange={handleSukuBungaChange}
                      helperText={errorSukuBunga ? helperSukuBunga : ''}
                      error={errorSukuBunga}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-helperText"
                      label="Nilai Sisa"
                      value={numNilaiSisa}
                      onChange={handleNilaiSisa}
                      helperText={errorNilaiSisa ? helperTextNumNilaiSisa : ''}
                      error={errorNilaiSisa}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-helperText"
                      label="Reinvestment Rate (0.0)(%)"
                      value={numReinvestmentRate}
                      onBlur={() => handleValidationPresentase('reinvestmentRate',numReinvestmentRate)}
                      onChange={handleReinvestmentRate}
                      helperText={errorReinvestmentRate ? helperTextNumReinvestmentRate : ''}
                      error={errorReinvestmentRate}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }}>
                  <Typography variant="h6">Syarat Kelayakan Investasi</Typography>
                </Grid>
             
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-helperText"
                      label="Syarat Payback (Tahun)"
                      value={numPayback}
                      onChange={handlePayback}
                      helperText={errorPayback ? helperTextNumPayback : ''}
                      error={errorPayback}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-helperText"
                      label="Rasio ARR (0.0)(%)"
                      value={numRasio1}
                      onChange={handleRasio1}
                      onBlur={() => handleValidationPresentase('rasioARR',numRasio1)}
                      helperText={errorRasio1 ? helperTextNumRasio1 : ''}
                      error={errorRasio1}
                    />
                  </Box>
                </Grid>
                
               
              </Grid>
            
            </div>
        </div>

        {
            numRows > 0  && 
            <div>
                <div className="mt-2">
                    <div
                      className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14"
                      data-wow-delay=".1s"
                      >
                        
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, sm: 12 }}>
                            <h3 className="mb-8 mt-5 text-2xl font-semibold text-dark dark:text-white md:text-[28px] md:leading-[1.42]">Prediksi Laba Setelah Pajak (EAT)</h3>
                        
                            <TableContainer 
                            className="mb-10"
                            component={Paper}>
                              <Table>
                                <TableHead>
                                
                                    {Array.from({ length: numRows }).map((_, colIndex) => (
                                      <TableRow key={colIndex}>
                                            <TableCell >
                                              Tahun Ke - {colIndex + 1}
                                            </TableCell>
                                            <TableCell >
                                              <TextField
                                                fullWidth
                                                value={rows[colIndex] || ''} 
                                                onChange={(e) =>  handleInputChange(colIndex, e.target.value)}
                                              />
                                            </TableCell>
                                      </TableRow>
                                    ))}
                                
                                </TableHead>
                              </Table>
                            </TableContainer>
                              <Stack direction="row" spacing={2}>
                                  
                                  <Button
                                      variant="contained" 
                                      endIcon={<SendIcon />}
                                      size="large"
                                      onClick={(e) => handleAnalisis()}
                                    >
                                      Analisis Data Investasi
                                  </Button>
                                  <Button
                                  className=""
                                      variant="outlined" 
                                      endIcon={<DeleteIcon />}
                                      size="large"
                                      onClick={(e) => handleHapusAnalisis()}
                                    >
                                    Hapus Data Investasi
                                  </Button>
                              
                                  
                              </Stack>
                          </Grid>
                        </Grid>
                  </div>
                </div>

              {
                showFormNext&&
           
                <div>
                  <div className="mt-2">
                      <SectionTitle
                            width="920px"
                            center
                            subtitle=""
                            title="Depresiasi"
                            paragraph="Depresiasi adalah proses pengurangan nilai suatu aset karena penggunaan, keausan, atau faktor lain seperti kemajuan teknologi. dibagi menjadi dua jenis perhitungan depresiasi"
                      />
                      <div className="mt-4"></div>
                
                      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <Tabs 
                          value={value} 
                          onChange={handleChange} 
            
                          variant="scrollable"
                          scrollButtons
                          allowScrollButtonsMobile
                          >
                          <Tab label="DEPRESIASI GARIS LURUS" />
                          <Tab label="DEPRESIASI SALDO MENURUN" />
                        </Tabs>
                        <Box sx={{ padding: 3 }}>
                          {value === 0 && (
                            <FormDepresiasiMenurun numRows={numRows} />
                          )}

                          {value === 1 && <FormDepresiasiSaldoMenurun numRows={numRows} />}
                        </Box>
                      </Box>
                  </div>
       

                  <SectionTitle
                      width="920px"
                      center
                      subtitle=""
                      title="Penentuan Kelayakan"
                      paragraph="Penentuan kelayakan dari sebuah investasi yang sudah diinput datanya dengan beberapa cara dalam analisis keuangan, terutama saat mengevaluasi proyek investasi."
                  />

                  <div className="mt-2"></div>
                  <div className="-mx-4 mt-8 flex flex-wrap justify-center">
                    {pricingData.map((product, i) => (
                      <PricingBox key={i} product={product} numRows={numRows} />
                    ))}     
                  </div>
                </div>
              }
            </div>
        }

      </div>
    </section>
  );

};

export default Pricing;

