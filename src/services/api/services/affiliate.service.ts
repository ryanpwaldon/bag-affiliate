import { client } from '../client'

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
  async findMyReferrals({ query, sort, page, limit }: FindAllQuery) {
    return (await client({ url: `/affiliate/referrals`, method: 'get', params: { query, sort, page, limit } })).data
  },
}
