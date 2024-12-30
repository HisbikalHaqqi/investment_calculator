const formatNumberWithCommas = (value: string): string => {

  const number = value.replace(/[^\d]/g, '');
  return Number(number).toLocaleString();
};

const parseNumber = (value: string): number => {
  return parseFloat(value.replace(/,/g, '')) || 0;
};

const validatePersentase = (nilai: string): string | boolean => {
  const regex = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/;

  if (regex.test(nilai)) {
    return true; // Valid input
  } else {
    return "Format tidak valid (maksimal 3 digit sebelum koma, 2 digit setelah koma)";
  }
};

const strCurrencyToInt= (nilai:string) => {
  var parse = parseInt(nilai.replace(/,/g, ''))
  return parse
}

const convertToCurrency = (value:number) => {
  const locale = 'id-ID'; 

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'IDR'
  });

  const formattedNumber = formatter.format(value);
  return formattedNumber
}

export  {formatNumberWithCommas,parseNumber,validatePersentase,strCurrencyToInt,convertToCurrency};