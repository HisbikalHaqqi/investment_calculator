import { convertToCurrency, formatNumberWithCommas, strCurrencyToInt } from '@/helper/formatCurrency'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TextField } from '@mui/material'
import React from 'react'

function FormNPV() {
  const headerTableNPV = [
    "Suku Bunga",
    "Net Present Value",
    "Kesimpulan"
  ]

  const storedValue             = localStorage.getItem('prediksiLaba')
  const pembelianAktivaTetap    = localStorage.getItem('pembelianAktivaTetap')
  const numNilaiSisa            = localStorage.getItem('numNilaiSisa')
  const numUmurTahunan          = localStorage.getItem('numRows')
  const numSukuBunga            = localStorage.getItem('numSukuBunga')

  const dataLaba                = storedValue ? JSON.parse(storedValue) : []
  const pembelianAktivaTetapNum = pembelianAktivaTetap ? strCurrencyToInt(pembelianAktivaTetap) : 0
  const numNilaiSisaNum         = numNilaiSisa ?  strCurrencyToInt(numNilaiSisa) : 0
  const numUmurTahunanNum       = numUmurTahunan ? strCurrencyToInt(numUmurTahunan) : 0
  const numSukuBunganNum        = numSukuBunga ? strCurrencyToInt(numSukuBunga) : 0

  const hitungDepresiasiTahunan = () => {
    if (pembelianAktivaTetapNum && numNilaiSisaNum && numUmurTahunanNum) {
      const nilaiDepresiasi = (pembelianAktivaTetapNum - numNilaiSisaNum) / numUmurTahunanNum
      return nilaiDepresiasi
    } else {
      return 0
    }
  };

  const describeNpv  = (nilaiNpv : number) => {

    var status        = 'Tidak Layak'
    var statusBesaran = 'lebih kecil'

    if(nilaiNpv > 1){
      status        = 'LAYAK'
      statusBesaran = 'lebih besar'
    }

    const stringDesc = 'Dengan nilai proyeksi NPV selama '+numUmurTahunanNum+' tahun, maka keuntungan yang didapat sebanyak Rp '+convertToCurrency(nilaiNpv)+'. Maka, investasi dikatakan '+status+' , sebab mampu menghasilkan NPV '+statusBesaran+' dari nol '
    return stringDesc
  }
  const handleNPV = (): number => {
    var resultNpv: number = 0;  
    var finalNpv: number = 0;
  
    for (var i = 0; i < dataLaba.length; i++) {
      var pembagiNpv = Math.pow(1 + numSukuBunganNum / 100, i + 1);
      var valueAliranMasuk = strCurrencyToInt(dataLaba[i]) + hitungDepresiasiTahunan();
      var result = valueAliranMasuk / pembagiNpv;
      resultNpv += result;
    }
  
    finalNpv = resultNpv - (pembelianAktivaTetapNum);
  
    return finalNpv
  }

  

  return (
    <div>
      <TableContainer component={Paper}>
            <Table>
              <TableHead>
              {headerTableNPV.map((title, colIndex) => (
                <TableRow key={colIndex}>
                    <TableCell key={colIndex}>
                      <Typography variant="h6" component="h4">
                        {title}
                      </Typography>
                    </TableCell>
                    <TableCell key={colIndex}>
                      { title ===   "Suku Bunga" ? (
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label={title}
                          fullWidth
                          value={numSukuBunganNum+' %'}
                        />
                      ): title ===  "Net Present Value" ? (
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label={title}
                          fullWidth
                          value={(convertToCurrency(handleNPV()))+''}
                        />
                      ): title ===   "Kesimpulan" ? (
                        <Typography>
                          {describeNpv((handleNPV()))}
                        </Typography>
                      ) :(
                        <TextField disabled id="outlined-disabled" label={title} fullWidth />
                      )}
                    </TableCell>
                </TableRow>
              ))}
              
              </TableHead>
            </Table>
          </TableContainer>
    </div>
  )
}

export default FormNPV
