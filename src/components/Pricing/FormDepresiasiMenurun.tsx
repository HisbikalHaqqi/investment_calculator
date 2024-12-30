import { TableContainer, Paper, Table, TableRow, TableCell, TableBody, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React from 'react'
import {formatNumberWithCommas} from "@/helper/formatCurrency";

function FormDepresiasiMenurun({ numRows }: { numRows: number }) {
  const headerPenyusutanGarisLurus = [
    "Debet Penyusutan",
    "Kredit AKM Penyusutan",
    "Total AKM Penyusutan",
    "Nilai Buku Aktiva"
  ]

  const storedValue             = localStorage.getItem('prediksiLaba');
  const pembelianAktivaTetap    = localStorage.getItem('pembelianAktivaTetap');
  const numNilaiSisa            = localStorage.getItem('numNilaiSisa');
  const numUmurTahunan          = localStorage.getItem('numRows');

  const dataArray               = storedValue ? JSON.parse(storedValue) : [];
  const pembelianAktivaTetapNum = pembelianAktivaTetap ? parseInt(pembelianAktivaTetap.replace(/,/g, '')) : 0;
  const numNilaiSisaNum         = numNilaiSisa ?  parseInt(numNilaiSisa.replace(/,/g, '')) : 0;
  const numUmurTahunanNum       = numUmurTahunan ? parseInt(numUmurTahunan.replace(/,/g, '')): 0;

  const hitungDepresiasiTahunan = () => {
    if (pembelianAktivaTetapNum && numNilaiSisaNum && numUmurTahunanNum) {
      const nilaiDepresiasi = (pembelianAktivaTetapNum - numNilaiSisaNum) / numUmurTahunanNum
      return nilaiDepresiasi
    } else {
      return 0
    }
  };


  return (
    <div
    className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14"
    data-wow-delay=".1s"
    >
      <h3 className="mb-8 mt-5 text-2xl font-semibold text-dark dark:text-white md:text-[28px] md:leading-[1.42]">Metode Penyusutan Garis Lurus</h3>
      
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {Array.from({ length: 1 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
          
                    {dataArray.map((item:string, index: number) => (
                      <div key={index}>
                        <TableCell>Tahun Ke - {index+1}</TableCell>
                        <TableCell key={index}>
                          <TextField
                            disabled
                            id="outlined-disabled"
                            label="Prediksi Laba"
                            fullWidth
                            value={item}
                         
                          />
                        </TableCell>
                        {headerPenyusutanGarisLurus.map((title, colIndex) => (
                          <TableCell key={colIndex}>
                            {title === 'Debet Penyusutan' ? (
                              <TextField
                                disabled
                                id="outlined-disabled"
                                label={title}
                                fullWidth
                                value={formatNumberWithCommas(hitungDepresiasiTahunan().toString())}
                              />
                            ) : title === 'Kredit AKM Penyusutan' ? (
                              <TextField
                                disabled
                                id="outlined-disabled"
                                label={title}
                                fullWidth
                                value={formatNumberWithCommas(hitungDepresiasiTahunan().toString())}
                              />
                            ) : title === 'Total AKM Penyusutan' ? (
                              <TextField
                                disabled
                                id="outlined-disabled"
                                label={title}
                                fullWidth
                                value={formatNumberWithCommas((Number(hitungDepresiasiTahunan()) * (index +1)).toString())} 
                              />
                            ) : title === 'Nilai Buku Aktiva' ? (
                              <TextField
                                disabled
                                id="outlined-disabled"
                                label={title}
                                fullWidth
                                value={formatNumberWithCommas(((pembelianAktivaTetapNum) - (Number(hitungDepresiasiTahunan()) * (index +1))).toString())} 
                              />
                            ) : (
                              <TextField disabled id="outlined-disabled" label={title} fullWidth />
                            )}
                          </TableCell>
                        ))}
                      </div>
                      
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default FormDepresiasiMenurun
