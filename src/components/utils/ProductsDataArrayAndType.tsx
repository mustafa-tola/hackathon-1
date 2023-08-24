export interface slugType {
    _type: string,
    current: string
}

export interface imageType {
    _type: string,
    ref: string
}

export interface imagesType {
    asset: imageType,
    _type: string,
    alt: string,
    _key: string
}

export interface oneProductType {
    slug: slugType,
    quantity: number,
    _rev: string,
    _type: string,
    productName: string,
    _createdAt: string,
    _id: string,
    _updatedAt: string,
    image: Array<imagesType>,
    description: any,
    productTypes: Array<string>,
    size: Array<string>,
    price: number
}

export interface responseType {
    result: Array<oneProductType>;
}