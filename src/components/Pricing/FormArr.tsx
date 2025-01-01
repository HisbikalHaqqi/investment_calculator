import { convertToCurrency, formatNumberWithCommas, strCurrencyToInt } from '@/helper/formatCurrency';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TextField } from '@mui/material'
import React from 'react'

const headerTableARR = [
  "Rata Rata Laba Setelah Pajak",
  "Investasi Awal",
  "Rata - Rata Investasi",
  "ARR - Initial Investment",
  "ARR - Average Investment",
  "Kesimpulan"
]

function FormArr() {

  const storedValue           = localStorage.getItem('prediksiLaba')
  const pembelianAktivaTetap  = localStorage.getItem('pembelianAktivaTetap')
  const kebutuhanModalKerja   = localStorage.getItem('kebutuhanModalKerja')
  const dataLaba              = storedValue ? JSON.parse(storedValue) : []
  const numRasioArr           = localStorage.getItem('numRasio1')

  const numbers: number[]        = dataLaba.map((value:string) => parseFloat(value.replace(/,/g, '')))
  const pembelianAktivaTetapNum  = pembelianAktivaTetap ? parseInt(pembelianAktivaTetap.replace(/,/g, '')) : 0
  const modalKerjaNum            = kebutuhanModalKerja ? parseInt(kebutuhanModalKerja.replace(/,/g, '')) : 0

  const total: number            = numbers.reduce((sum, num) => sum + num, 0)
  const averageLaba: number      = total / numbers.length;
  const rataRataInvestasi:number = pembelianAktivaTetapNum+modalKerjaNum

  const numRasioArrNum           = numRasioArr ? strCurrencyToInt(numRasioArr) : 0

  const handleHitungInitialInvestment = () => {
    const nilaiArr = (((averageLaba/rataRataInvestasi) * 100))
    return nilaiArr
  }

  const describeArr = (nilaiArr : number) => {
    var status        = 'Layak'
    console.log(nilaiArr)
    console.log(numRasioArrNum)
    if(nilaiArr <= numRasioArrNum){
      status        = 'Tidak Layak'
    }

    const stringDesc = 'ARR (Average Rate of Return) sebesar '+nilaiArr.toFixed(2)+' % dari investasi tersebut maka dapat dikatakan '+status;
    return stringDesc
  }
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
              {headerTableARR.map((title, colIndex) => (
                <TableRow key={colIndex}>
                      <TableCell>
                      <Typography variant="h6" component="h4">
                        {title}
                      </Typography>
                      </TableCell>
                      <TableCell>
                        {title === "Rata Rata Laba Setelah Pajak" ? (
                          <TextField
                            disabled
                            id="outlined-disabled"
                            label={title}
                            fullWidth
                            value={convertToCurrency(averageLaba)}
                          />
                        ) : title === "Investasi Awal" ? (
                          <TextField
                            disabled
                            id="outlined-disabled"
                            label={title}
                            fullWidth
                            value={convertToCurrency(rataRataInvestasi)}
                          />
                        )  : title === "Rata - Rata Investasi" ? (
                          <TextField
                            disabled
                            id="outlined-disabled"
                            label={title}
                            fullWidth
                            value={convertToCurrency(rataRataInvestasi)}
                          />
                        ): title ===  "ARR - Initial Investment" ? (
                          <TextField
                            disabled
                            id="outlined-disabled"
                            label={title}
                            fullWidth
                            value={handleHitungInitialInvestment().toFixed(2)}
                          />
                        ): title ===   "ARR - Average Investment" ? (
                          <TextField
                            disabled
                            id="outlined-disabled"
                            label={title}
                            fullWidth
                            value={handleHitungInitialInvestment().toFixed(2)}
                          />
                        ): title ===  "Kesimpulan" ? (
                          <Typography>
                            {describeArr(handleHitungInitialInvestment())}
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

export default FormArr