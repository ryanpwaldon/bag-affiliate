import { client } from '../client'

interface Payout {
  periodEnd: Date
  periodStart: Date
  value: number
}

export interface Affiliate {
  email: string
  payPalEmail: string
  linkClicks: number
  code: string
  payouts: Record<string, Payout>
  referralNotification: boolean
}

interface FindAllQuery {
  query?: object
  sort?: string
  page: number
  limit: number
}

export default {
  async login(email: string) {
    return await client({ url: `/affiliate/login`, method: 'post', data: { email } })
  },
  async logout() {
    return await client({ url: `/affiliate/logout`, method: 'get' })
  },
  async findMe() {
    return (await client({ url: `/affiliate`, method: 'get' })).data
  },
  async updateMe(data: Partial<Affiliate>) {
    return (await client({ url: `/affiliate`, method: 'post', data })).data
  },
  async findMyReferralStats() {
    return (await client({ url: `/affiliate/referrals/stats`, method: 'get' })).data
  },
  async findMyReferrals({ query, sort, page, limit }: FindAllQuery) {
    return (await client({ url: `/affiliate/referrals`, method: 'get', params: { query, sort, page, limit } })).data
  },
  async updateCode(code: string) {
    return (await client({ url: `/affiliate/code`, method: 'post', data: { code } })).data
  },
}
