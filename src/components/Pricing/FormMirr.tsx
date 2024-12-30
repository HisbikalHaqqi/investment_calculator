import { strCurrencyToInt } from '@/helper/formatCurrency'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TextField } from '@mui/material'
import React from 'react'

function FormMirr() {
  const headerTableNPV = [
    "Reinvestment Rate",
    "Modified Internal Rate Of Return",
    "Kesimpulan"
  ]

  const storedValue             = localStorage.getItem('prediksiLaba')
  const pembelianAktivaTetap    = localStorage.getItem('pembelianAktivaTetap')
  const numNilaiSisa            = localStorage.getItem('numNilaiSisa')
  const numUmurTahunan          = localStorage.getItem('numRows')
  const numSukuBunga            = localStorage.getItem('numSukuBunga')
  const numPayback              = localStorage.getItem('numPayback')
  const numReinvestmentRate     = localStorage.getItem('numReinvestmentRate')

  const dataLaba                = storedValue ? JSON.parse(storedValue) : []
  const pembelianAktivaTetapNum = pembelianAktivaTetap ? strCurrencyToInt(pembelianAktivaTetap) : 0
  const numNilaiSisaNum         = numNilaiSisa ?  strCurrencyToInt(numNilaiSisa) : 0
  const numUmurTahunanNum       = numUmurTahunan ? strCurrencyToInt(numUmurTahunan) : 0
  const numSukuBunganNum        = numSukuBunga ? strCurrencyToInt(numSukuBunga) : 0
  const numPaybackNum           = numPayback ? strCurrencyToInt(numPayback) : 0
  const numReinvestmentRateNum  = numReinvestmentRate ? strCurrencyToInt(numReinvestmentRate) : 0

  const hitungDepresiasiTahunan = () => {
    if (pembelianAktivaTetapNum && numNilaiSisaNum && numUmurTahunanNum) {
      const nilaiDepresiasi = (pembelianAktivaTetapNum - numNilaiSisaNum) / numUmurTahunanNum
      return nilaiDepresiasi
    } else {
      return 0
    }
  };

  const describeNpv  = (nilaiMIRR : number) => {

    var status        = 'Tidak Layak'

    if(nilaiMIRR > numSukuBunganNum){
      status        = 'LAYAK'
    }

    const stringDesc = 'Dengan demikian, MIRR investasi ini adalah '+nilaiMIRR.toFixed(2)+' %. Hal ini berarti bahwa investasi tersebut menghasilkan tingkat pengembalian sebesar '+nilaiMIRR.toFixed(2)+' % per tahun jika kas yang dihasilkan reinvestasi pada tingkat bunga '+numReinvestmentRateNum+'% per tahun dan dikatakan '+status+' untuk diivestasi'
    return stringDesc
  }

  const presentValueUp = (rate:number) => {
    var resultNpv: number = 0;  
    var finalNpv: number = 0;

    for (var i = 0; i < dataLaba.length; i++) {

      if (i == 0){
        continue;
      }

      var pembagiNpv        = Math.pow(1 + rate / 100, i);
      var valueAliranMasuk = strCurrencyToInt(dataLaba[i]) + hitungDepresiasiTahunan();
      var result            = valueAliranMasuk / pembagiNpv;

      if (i == numPaybackNum){
        break;
      }

      resultNpv += result;
    }
  
    finalNpv = resultNpv
  
    return finalNpv
  }

  const presentValueDown = (rate:number) => {
    var resultNpv: number = 0;  
    var finalNpv: number  = 0;
  
    for (var i = 0; i < dataLaba.length; i++) {
 
      if (dataLaba.length - 1 == i){
        var pembagiNpv       = Math.pow(1 + rate / 100, (dataLaba.length - 1));
        var valueAliranMasuk = strCurrencyToInt(dataLaba[i]) + hitungDepresiasiTahunan();
        var result           = valueAliranMasuk / pembagiNpv;
        resultNpv += result;
      }
    }
  
    finalNpv = resultNpv
  
    return finalNpv
  }

  const handleMIRR = (): number => {

    const n              = dataLaba.length - 1; 
    const valuePVUp      = presentValueUp(numReinvestmentRateNum)
    const valuePVDown    = presentValueDown(numReinvestmentRateNum)
    const mirr           = Math.pow(valuePVDown / valuePVUp, 1/n) - 1;

    return (mirr * 100)
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
                      { title ===   "Reinvestment Rate" ? (
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label={title}
                          fullWidth
                          value={numReinvestmentRateNum+' %'}
                        />
                      ): title ===  "Modified Internal Rate Of Return" ? (
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label={title}
                          fullWidth
                          value={handleMIRR().toFixed(2)+' %'}
                        />
                      ): title ===   "Kesimpulan" ? (
                        <Typography>
                          {describeNpv(handleMIRR())}
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

export default FormMirr
