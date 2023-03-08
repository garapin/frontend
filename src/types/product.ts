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
    template: Template
}

export type Template = {
    id?: string
    name: string,
    description: string,
    active: boolean,
    deleted: boolean,
    createdAt: Date,
    updatedAt: Date,
    variants: Variant[]
}

export type Variant = {
    name: string
    id: string
    description: string
    required?: boolean
    pickOption?: "single" | "multiple"
    maxOptions?: number
    options: VariantOption[]
}

export type VariantOption = {
    name: string
    imgSrc?: string
    value: string
    price: number
}

export type TemplateInput = {
    [key: string]: {
    variant: Variant,
    selectedOption: VariantOption
    }
}