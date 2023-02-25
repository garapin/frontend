export type Product = {
    id?: string
    active: boolean,
    productName: string,
    sku: string,
    slug: string,
    category: string,
    channel: "printing" | "general",
    createdAt: Date
    deleted: boolean
    description: string
    img: string[]
    leadTime: number
    maxPrice: number
    minPrice: number
    moq: number
}