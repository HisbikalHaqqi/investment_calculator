import { formatNumberWithCommas, strCurrencyToInt } from '@/helper/formatCurrency'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TextField } from '@mui/material'
import { get } from 'http'
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
  const kebutuhanModalKerja     = localStorage.getItem('kebutuhanModalKerja')

  const dataLaba                = storedValue ? JSON.parse(storedValue) : []
  const pembelianAktivaTetapNum = pembelianAktivaTetap ? strCurrencyToInt(pembelianAktivaTetap) : 0
  const numNilaiSisaNum         = numNilaiSisa ?  strCurrencyToInt(numNilaiSisa) : 0
  const numUmurTahunanNum       = numUmurTahunan ? strCurrencyToInt(numUmurTahunan) : 0
  const numSukuBunganNum        = numSukuBunga ? strCurrencyToInt(numSukuBunga) : 0
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
    var finalNpv: number  = 0;
  
    for (var i = 0; i < dataLaba.length; i++) {
      var pembagiNpv        = Math.pow(1 + rate / 100, i + 1);
      var valueAliranMasuk  = strCurrencyToInt(dataLaba[i]) + hitungDepresiasiTahunan();
      var result            = valueAliranMasuk / pembagiNpv;

      resultNpv += result;
    }
  
    finalNpv = resultNpv
  
    return finalNpv
  }

  const getCashFlows = (dataLaba: string[]): number[] => {
    const adjustedDataLaba = [...dataLaba];
    
    adjustedDataLaba.unshift((formatNumberWithCommas(kebutuhanModalKerjaNum.toString())));
  
    return adjustedDataLaba.map((cf, i) => {
     
      let arusKasMasuk = 0;

      if (i === adjustedDataLaba.length - 1) {
        console.log(cf)
        arusKasMasuk = strCurrencyToInt(cf) + hitungDepresiasiTahunan() + numNilaiSisaNum;
      } else {
        if( i == 0){
          arusKasMasuk = (strCurrencyToInt(cf) * (-1))
        }else{
          arusKasMasuk = strCurrencyToInt(cf) + hitungDepresiasiTahunan();
        }
       
      }
      // console.log(arusKasMasuk)
  
      return arusKasMasuk;
    });
  };

 
  function calculateIRR( 
    getCashFlowsArray: number[],
    guess: number = 0.1, 
    maxIterations: number = 50, 
    tolerance: number = 1e-6
  ): number {
  
    var rate = guess;
  
    for (var i = 0; i < maxIterations; i++) {

      const npv        = presentValue(rate)
      getCashFlowsArray.unshift((-kebutuhanModalKerjaNum))
      getCashFlowsArray.splice(1,1)

      const derivative = getCashFlowsArray.reduce((sum, cf, t) => {
        const  hitung  = sum - t * cf / Math.pow(1 + rate, t + 1);
        return hitung
      }, 0);
  
      const newRate = rate - npv / derivative; 
  
      if (Math.abs(newRate - rate) < tolerance) {
        return newRate;
      }
  
      rate = newRate;
    }

    return rate
  }

  const handleIRR = (): number => {
    const getCashFlowsArray   = getCashFlows(dataLaba)
    console.log(getCashFlowsArray)
    const irr                 = calculateIRR(getCashFlowsArray);
    console.log(irr)
    return irr * 100;
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
