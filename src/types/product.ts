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
    template?: Template
    templateId?: string
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
    qty?: number
    hasQtyFields?: boolean
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

export enum ProductType {
    READY_TO_BUY = "rtb",
    CUSTOM_PACKAGING = "custom",
    DIGITAL_PACKAGING = "digital",
}

export enum StoragePath {
    PATH_RTB = "/printing/inquiry/rtb/uploads/",
    PATH_CUSTOM = "/printing/inquiry/custom/uploads/",
    PATH_DIGITAL = "/printing/inquiry/digital/uploads/",
}