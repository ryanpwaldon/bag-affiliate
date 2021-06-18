const getLocale = () => (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language)

export default () => (value?: number) => {
  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: 'USD',
  }).format(value || 0)
}
