export enum Interval {
  Monthly = 'EVERY_30_DAYS',
  Annually = 'ANNUAL',
}

export interface Payment {
  netAmount: number
  createdAt: number
  grossAmount: number
  chargeId: Interval
  billingInterval: Interval
}

export interface User {
  shopOrigin: string
  subscription: string
  primaryDomain: string
  uninstalled: boolean
  createdAt: Date
  payments: Payment[]
}
