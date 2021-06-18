import useDate from './useDate'
import store from '../store/store'
import useCurrency from './useCurrency'

const date = useDate()
const currency = useCurrency()

export default () => {
  if (!store.state.affiliate) return []
  const payouts = Object.values(store.state.affiliate.payouts).sort((a, b) => (date(a.periodStart).isBefore(b.periodStart) ? 1 : -1))
  const payoutsFormatted = payouts.map((payout) => {
    const value = payout.value
    const valueFormatted = currency(payout.value)
    const period = `${date(payout.periodStart).format('Do MMM YYYY')} – ${date(payout.periodEnd).format('Do MMM YYYY')}`
    const payoutDate = date(payout.periodEnd).add(1, 'month').format('Do MMM YYYY')
    const status = date().isBefore(payoutDate) ? 'Paid' : 'Pending'
    const paid = date().isBefore(payoutDate)
    return { value, valueFormatted, period, payoutDate, status, paid }
  })
  return payoutsFormatted
}
