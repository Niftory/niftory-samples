export type Product = {
  id: string
  title: string
  price?: number
  currency?: string
  imageUrl?: string
  clickUrl: string
  tags?: {
    name: string
  }[]
  stats?: {
    rarity?: string
    serial?: string
  }
}

export type ProductDetail = {
  id: string
  title: string
  description?: string
  price: number
  currency?: string
  tags?: {
    name: string
  }[]
}
