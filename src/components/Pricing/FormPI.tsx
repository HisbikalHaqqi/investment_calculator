import { formatNumberWithCommas, strCurrencyToInt } from '@/helper/formatCurrency'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TextField } from '@mui/material'
import React from 'react'

function FormPI() {
  const headerTableNPV = [
    "Suku Bunga",
    "Profitability Index",
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

  const describePI  = (nilaiPI : number) => {
    var status        = 'Tidak Layak'
    var statusBesaran = 'lebih kecil'

    if(nilaiPI > 1){
      status        = 'LAYAK'
      statusBesaran = 'lebih besar'
    }

    const stringDesc = 'Nilai Profitabilty index didapatkan sebesar ' +nilaiPI.toFixed(2)+ ' dapat disimpulkan Profitabilty index tersebut '+statusBesaran+' dari 1, maka proyek ini dianggap '+status+' untuk diinvestasikan.'
    return stringDesc
  }

  const handlePI = (): number => {
    var resultNpv: number= 0;  
    var finalNpv: number = 0;
  
    for (var i = 0; i < dataLaba.length; i++) {
      var pembagiNpv = Math.pow(1 + numSukuBunganNum / 100, i + 1);
      var valueAliranMasuk = strCurrencyToInt(dataLaba[i]) + hitungDepresiasiTahunan();
      var result = valueAliranMasuk / pembagiNpv;
      resultNpv += result;
    }
  
    finalNpv = resultNpv / (pembelianAktivaTetapNum);
  
    return finalNpv
  }
  

  return (
    <div>
      <TableContainer component={Paper}>
            <Table>
              <TableHead>
              {headerTableNPV.map((title, colIndex) => (
                <TableRow key={colIndex}>
                    <TableCell>
                      <Typography variant="h6" component="h4">
                        {title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      { title ===   "Suku Bunga" ? (
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label={title}
                          fullWidth
                          value={numSukuBunganNum+' %'}
                        />
                      ): title === "Profitability Index" ? (
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label={title}
                          fullWidth
                          value={handlePI().toFixed(2)}
                        />
                      ): title ===   "Kesimpulan" ? (
                        <Typography>
                          {describePI(handlePI())}
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

export default FormPI
