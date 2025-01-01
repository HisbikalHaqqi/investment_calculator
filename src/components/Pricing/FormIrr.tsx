import { formatNumberWithCommas, strCurrencyToInt } from '@/helper/formatCurrency'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TextField } from '@mui/material'
import React from 'react'

function FormIRR() {
  const headerTableNPV = [
    "Suku Bunga",
    "Reinvestment Rate",
    "Internal Rate Of Return",
    "Kesimpulan"
  ]

  const storedValue             = localStorage.getItem('prediksiLaba')
  const pembelianAktivaTetap    = localStorage.getItem('pembelianAktivaTetap')
  const numNilaiSisa            = localStorage.getItem('numNilaiSisa')
  const numUmurTahunan          = localStorage.getItem('numRows')
  const numSukuBunga            = localStorage.getItem('numSukuBunga')
  const numReinvestmentRate     = localStorage.getItem('numReinvestmentRate')

  const dataLaba                = storedValue ? JSON.parse(storedValue) : []
  const pembelianAktivaTetapNum = pembelianAktivaTetap ? strCurrencyToInt(pembelianAktivaTetap) : 0
  const numNilaiSisaNum         = numNilaiSisa ?  strCurrencyToInt(numNilaiSisa) : 0
  const numUmurTahunanNum       = numUmurTahunan ? strCurrencyToInt(numUmurTahunan) : 0
  const numSukuBunganNum        = numSukuBunga ? strCurrencyToInt(numSukuBunga) : 0
  const numReinvestmentRateNum  = numReinvestmentRate ? strCurrencyToInt(numReinvestmentRate) : 0

  const hitungDepresiasiTahunan = () => {
    if (pembelianAktivaTetapNum && numNilaiSisaNum && numUmurTahunanNum) {
      const nilaiDepresiasi = (pembelianAktivaTetapNum - numNilaiSisaNum) / numUmurTahunanNum
      return nilaiDepresiasi
    } else {
      return 0
    }
  };

  const describeNpv  = (nilaiIRR : number) => {

    var status       = 'Tidak Layak'

    if(nilaiIRR > numSukuBunganNum){
      status         = 'Layak'
    }

    const stringDesc = 'Dengan nilai proyeksi IRR dengan tingkat diskonto '+numReinvestmentRateNum+ ' % dan suku bunga '+numSukuBunganNum+ ' % selama '+numUmurTahunanNum+' tahun, maka investasi tersebut mendapat pengembalian sebanyak '+nilaiIRR.toFixed(2)+' %. Maka, investasi tersebut dikatakan '+status
    return stringDesc
  }

  const presentValue = (rate:number) => {
    var resultNpv: number = 0;  
    var finalNpv: number = 0;
  
    for (var i = 0; i < dataLaba.length; i++) {
      var pembagiNpv = Math.pow(1 + rate / 100, i + 1);
      var valueAliranMasuk = strCurrencyToInt(dataLaba[i]) + hitungDepresiasiTahunan();
      var result = valueAliranMasuk / pembagiNpv;

      resultNpv += result;
    }
  
    finalNpv = resultNpv
  
    return finalNpv
  }

  const handleIRR = (): number => {

    const arr1 = presentValue(numSukuBunganNum);
    const arr2 = presentValue(numReinvestmentRateNum);
  
    if (arr1 === arr2) {
      return numSukuBunganNum / 100; 
    }
  
    const irr =
      (numSukuBunganNum / 100) +
      (arr1 * ((numSukuBunganNum / 100) - (numReinvestmentRateNum / 100))) /
        (arr1 - arr2);
  
    return irr;
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
                      ): title ===   "Reinvestment Rate" ? (
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label={title}
                          fullWidth
                          value={numReinvestmentRate+' %'}
                        />
                      ):title ===   "Internal Rate Of Return" ? (
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label={title}
                          fullWidth
                          value={handleIRR().toFixed(2)+' %'}
                        />
                      ): title ===   "Kesimpulan" ? (
                        <Typography>
                          {describeNpv(handleIRR())}
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

export default FormIRR
