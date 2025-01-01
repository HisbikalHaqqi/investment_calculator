import { strCurrencyToInt } from '@/helper/formatCurrency';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TextField } from '@mui/material'
import React from 'react'

export default function FormPaybackPeriod() {

  const headerTablePP = [
    "Suku Bunga",
    "Payback Periode",
    "Kesimpulan"
  ]
  
  const storedValue             = localStorage.getItem('prediksiLaba')
  const pembelianAktivaTetap    = localStorage.getItem('pembelianAktivaTetap')
  const numNilaiSisa            = localStorage.getItem('numNilaiSisa')
  const numUmurTahunan          = localStorage.getItem('numRows')
  const numSukuBunga            = localStorage.getItem('numSukuBunga')
  const numPayback              = localStorage.getItem('numPayback')

  const dataLaba                = storedValue ? JSON.parse(storedValue) : []
  const pembelianAktivaTetapNum = pembelianAktivaTetap ? strCurrencyToInt(pembelianAktivaTetap) : 0
  const numNilaiSisaNum         = numNilaiSisa ?  strCurrencyToInt(numNilaiSisa) : 0
  const numUmurTahunanNum       = numUmurTahunan ? strCurrencyToInt(numUmurTahunan) : 0
  const numSukuBunganNum        = numSukuBunga ? strCurrencyToInt(numSukuBunga) : 0
  const numPaybackNum           = numPayback ? strCurrencyToInt(numPayback) : 0

  const hitungDepresiasiTahunan = () => {
    if (pembelianAktivaTetapNum && numNilaiSisaNum && numUmurTahunanNum) {
      const nilaiDepresiasi = (pembelianAktivaTetapNum - numNilaiSisaNum) / numUmurTahunanNum
      return nilaiDepresiasi
    } else {
      return 0
    }
  };

  const describePP = (nilaiPP : number) => {

    var status        = 'Tidak Layak'

    if(nilaiPP <= numPaybackNum){
      status        = 'Layak'
    }

    const stringDesc = 'Periode pengembalian modal untuk investasi tersebut adalah '+nilaiPP.toFixed(2) + ' Tahun , sehingga investasi ini dikatakan '+status;
    return stringDesc
  }

  const handleAliranKasMasuk = (): number[] => {
    const listArusKasMasuk: number[] = [];
  
    for (var i = 0; i < dataLaba.length; i++) {
      const valueAliranMasuk = strCurrencyToInt(dataLaba[i]) + hitungDepresiasiTahunan();
      listArusKasMasuk.push(valueAliranMasuk);
    }

    return listArusKasMasuk;
  }

  const handlePaybackPeriode = (valueKasMasuk: number[]): number => {
    var kasTahunKeN: number = 0;
    var kasPayback: number = 0;
    var numPaybackNum: number = 0;
  
    for (var i = 0; i < valueKasMasuk.length; i++) {
      var cumulativeCashFlow = 0;
  
      for (var j = 0; j <= i; j++) {
        cumulativeCashFlow += valueKasMasuk[j];
      }
  
      if (cumulativeCashFlow >= pembelianAktivaTetapNum) {
        numPaybackNum = i;
        kasTahunKeN = cumulativeCashFlow - valueKasMasuk[i]; 

        if (i > 0) {
          kasPayback = valueKasMasuk[i];
        } else {
          kasPayback = cumulativeCashFlow; 
        }
        break;
      }
    }
  
    if (numPaybackNum === 0) {
      return 0;
    } else {
      const fractionalYear = (pembelianAktivaTetapNum - kasTahunKeN) / kasPayback;
      return numPaybackNum + fractionalYear;
    }
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
              {headerTablePP.map((title, colIndex) => (
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
                      ): title ===  "Payback Periode" ? (
                        <TextField
                          disabled
                          id="outlined-disabled"
                          label={title}
                          fullWidth
                          value={handlePaybackPeriode(handleAliranKasMasuk()).toFixed(2) + ' Tahun'}
                        />
                      ): title ===  "Kesimpulan" ? (
                        <Typography>
                          {describePP(handlePaybackPeriode(handleAliranKasMasuk()))}
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
