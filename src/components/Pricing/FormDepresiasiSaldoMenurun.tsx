import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, Box } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { formatNumberWithCommas, validatePersentase} from "@/helper/formatCurrency";
import { useState } from "react";

function FormDepresiasiSaldoMenurun({ numRows }: { numRows: number }) {
  const headerPenyusutanGarisLurus = [
    "Nilai Buku Awal",
    "Depresiasi",
    "Nilai Buku Akhir"
  ]

  const [numPenyusutan, setNumPenyusutan]       = useState<string>('20'); 
  const [helperPenyusutan, setHelperPenyusutan] = useState<string>('');
  const [errorPenyusutan, setErrorPenyusutan]   = useState<boolean>(false);
  const storedValue                             = localStorage.getItem('prediksiLaba');
  const dataArray                               = storedValue ? JSON.parse(storedValue) : [];

  const pembelianAktivaTetap    = localStorage.getItem('pembelianAktivaTetap');
  var pembelianAktivaTetapNum = pembelianAktivaTetap ? parseInt(pembelianAktivaTetap.replace(/,/g, '')) : 0;

  const handlePenyusutanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumPenyusutan(value);
  };

  const hitungTingkatPenyusutan = () => {
    var tempDepresiasi = (pembelianAktivaTetapNum * Number(numPenyusutan)) / 100
    return tempDepresiasi
  }

  const handleValidatePresentase = (component:string,value:string) => {
    const validationResult = validatePersentase(value);
    switch(component) {
      case 'depresiasi':
        if (validationResult === true) {
          setNumPenyusutan(value);
          setErrorPenyusutan(false);
          setHelperPenyusutan('');
        } else {
          setErrorPenyusutan(true);
          setHelperPenyusutan(validationResult as string);
        }
        break;
    }
  }

  return (
    <div
    className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14"
    data-wow-delay=".1s"
    >
      <h3 className="mb-8 mt-5 text-2xl font-semibold text-dark dark:text-white md:text-[28px] md:leading-[1.42]">Metode Saldo Menurun</h3>
      
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-helperText"
              label="Tingkat Depresiasi %"
              value={numPenyusutan}
              onChange={handlePenyusutanChange}
              onBlur={()=>{handleValidatePresentase('depresiasi',numPenyusutan)}}
              helperText={errorPenyusutan ? helperPenyusutan : ''}
              error={errorPenyusutan}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }}>
          
          <TableContainer component={Paper}>
            <Table>
                <TableBody>
                {Array.from({ length: 1 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
          
                    {
                    dataArray.map((item:string, index: number) => {
                   
                      
                      var tempPembelianAktivaTetapNum = (pembelianAktivaTetapNum ?? 0) 
                      var depresiasi     = hitungTingkatPenyusutan()
                      var nilaiBukuAkhir = tempPembelianAktivaTetapNum - depresiasi

                      if (index != 1){
                        pembelianAktivaTetapNum = nilaiBukuAkhir
                      }
                      return (
                        <div>
                          <TableCell>Tahun Ke - {index+1}</TableCell>
                          {
                            headerPenyusutanGarisLurus.map((title, colIndex) => (
                              <TableCell key={colIndex}>
                                {title === 'Nilai Buku Awal' ? (
                                  
                                  <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label={title}
                                    fullWidth
                                    value={formatNumberWithCommas(pembelianAktivaTetapNum.toString())}
                                  />
                                ) : title === 'Depresiasi' ? (
                                  <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label={title}
                                    fullWidth
                                    value={formatNumberWithCommas(depresiasi.toString())}
                                  />
                                ) : title === "Nilai Buku Akhir" ? (
                                  <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label={title}
                                    fullWidth
                                    value={formatNumberWithCommas(nilaiBukuAkhir.toString())}
                                  />
                                ) : (
                                  <TextField disabled id="outlined-disabled" label={title} fullWidth /> 
                                )}
                              </TableCell>
                            ))
                          }
                        </div>
                      )
                    })
                     
                  }
           
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


export default FormDepresiasiSaldoMenurun