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
  const kebutuhanModalKerja     = localStorage.getItem('kebutuhanModalKerja')

  const dataLaba                = storedValue ? JSON.parse(storedValue) : []
  const pembelianAktivaTetapNum = pembelianAktivaTetap ? strCurrencyToInt(pembelianAktivaTetap) : 0
  const numNilaiSisaNum         = numNilaiSisa ?  strCurrencyToInt(numNilaiSisa) : 0
  const numUmurTahunanNum       = numUmurTahunan ? strCurrencyToInt(numUmurTahunan) : 0
  const numSukuBunganNum        = numSukuBunga ? strCurrencyToInt(numSukuBunga) : 0
  const numPaybackNum           = numPayback ? strCurrencyToInt(numPayback) : 0
  const numReinvestmentRateNum  = numReinvestmentRate ? strCurrencyToInt(numReinvestmentRate) : 0
  const kebutuhanModalKerjaNum  = kebutuhanModalKerja ? strCurrencyToInt(kebutuhanModalKerja) : 0

  const hitungDepresiasiTahunan = () => {
    if (pembelianAktivaTetapNum && numNilaiSisaNum && numUmurTahunanNum) {
      const nilaiDepresiasi = (pembelianAktivaTetapNum - numNilaiSisaNum) / numUmurTahunanNum
      return nilaiDepresiasi
    } else {
      return 0
    }
  };

  const describeNpv  = (nilaiMIRR : number) => {

    var status      = 'Tidak Layak'

    if(nilaiMIRR > numSukuBunganNum){
      status        = 'Layak'
    }

    const stringDesc = 'Dengan demikian, MIRR investasi ini adalah '+nilaiMIRR.toFixed(2)+' %. Hal ini berarti bahwa investasi tersebut menghasilkan tingkat pengembalian sebesar '+nilaiMIRR.toFixed(2)+' % per tahun jika kas yang dihasilkan reinvestasi pada tingkat bunga '+numReinvestmentRateNum+'% per tahun dan dikatakan '+status+' untuk diivestasi'
    return stringDesc
  }

  const cashFlows = (dataLaba: string[]): number[] => {
    var getDataLaba = dataLaba;
    return getDataLaba.map((cf) => {
      const arusKasMasuk = strCurrencyToInt(cf) + hitungDepresiasiTahunan();
      return arusKasMasuk;
    });
  };

  function handleMIRR(): number {
    var getCashFlows = cashFlows(dataLaba)

    const n = getCashFlows.length - 1
  
    var terminalValue = 0;
    for (var t = 1; t <= n; t++) {
      if (getCashFlows[t] > 0) {
        terminalValue += getCashFlows[t] * Math.pow(1 + numReinvestmentRateNum, n - t)
      }
    }
  
    var presentValueCost = 0
    for (var i = 0; i <= n; i++) {
      if (getCashFlows[i] < 0) {
        presentValueCost += getCashFlows[i] * Math.pow(1 + numSukuBunganNum, i)
      }else{
        presentValueCost = kebutuhanModalKerjaNum
      }
    }
  
    const MIRR = Math.pow(terminalValue / Math.abs(presentValueCost), 1 / n) - 1;
    return MIRR / 100;
  }
  

  return (
    <div>
      <TableContainer component={Paper}>
            <Table>
              <TableHead>
              {headerTableNPV.map((title, colIndex) => (
                <TableRow key={colIndex}>
                    <TableCell >
                      <Typography variant="h6" component="h4">
                        {title}
                      </Typography>
                    </TableCell>
                    <TableCell >
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
