import { formatNumberWithCommas, strCurrencyToInt } from '@/helper/formatCurrency';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TextField, TableBody } from '@mui/material'
import React from 'react'

const headerTable = [
  "Laba Setelah Pajak",
  "Penyusutan",
  "Aliran Kas Masuk",
]

function TableAliranKasMasuk({numRows}:{numRows: number}) {
  
  const headerPenyusutanGarisLurus = [
    "Debet Penyusutan",
    "Aliran Kas Masuk"
  ]

  const storedValue             = localStorage.getItem('prediksiLaba')
  const pembelianAktivaTetap    = localStorage.getItem('pembelianAktivaTetap')
  const numNilaiSisa            = localStorage.getItem('numNilaiSisa')
  const numUmurTahunan          = localStorage.getItem('numRows')

  const dataArray               = storedValue ? JSON.parse(storedValue) : []
  const pembelianAktivaTetapNum = pembelianAktivaTetap ? strCurrencyToInt(pembelianAktivaTetap) : 0
  const numNilaiSisaNum         = numNilaiSisa ?  strCurrencyToInt(numNilaiSisa) : 0
  const numUmurTahunanNum       = numUmurTahunan ? strCurrencyToInt(numUmurTahunan) : 0

  const hitungDepresiasiTahunan = () => {
    if (pembelianAktivaTetapNum && numNilaiSisaNum && numUmurTahunanNum) {
      const nilaiDepresiasi = (pembelianAktivaTetapNum - numNilaiSisaNum) / numUmurTahunanNum
      return nilaiDepresiasi
    } else {
      return 0
    }
  };

  const hitungAliranMasuk = (laba:number,penyusutan:number) => {
    var valueAliranMasuk = 0
    valueAliranMasuk = laba + penyusutan

    return valueAliranMasuk

  }

  return (
    <div>
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
                      <TableCell key={rowIndex}>
                        {title === 'Debet Penyusutan' ? (
                          <TextField
                            disabled
                            id="outlined-disabled"
                            label={title}
                            fullWidth
                            value={formatNumberWithCommas(hitungDepresiasiTahunan().toString())}
                          />
                        ) : title === 'Aliran Kas Masuk' ? (
                          <TextField
                            disabled
                            id="outlined-disabled"
                            label={title}
                            fullWidth
                            value={formatNumberWithCommas((hitungAliranMasuk(strCurrencyToInt(item),hitungDepresiasiTahunan()).toString()))}
                          />
                        ) : (
                          <TextField disabled id="outlined-disabled" label={title} fullWidth />
                        )}
                      </TableCell>
                    ))}
                  </div>
                  
                )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default TableAliranKasMasuk

