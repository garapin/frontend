import { Template } from "@/types/product";


const variantsCB = [
    {
        name: 'Corrugated Box Options',
        id: 'corrugated-box-options',
        description: "Box options can be like this",
        options: [
            {
                name: 'Shipping Box',
                imgSrc: 'https://ph-prod.imgix.net/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg',
                value: 'shipping-box',
                price: 8000
            },
            {
                name: 'Mailer Box',
                imgSrc: 'https://cf.shopee.co.id/file/3d856acdb1e975165881e4ab47d2d36a',
                value: 'mailer-box',
                price: 3000
            },
            {
                name: 'Handle Box',
                imgSrc: 'https://cdn.shopify.com/s/files/1/1516/1182/products/CakeBoxwithHandle1Cropped3.png?v=1592811934',
                value: 'handle-box',
                price: 6500
            },
            {
                name: 'Top-Bottom Box',
                imgSrc: 'https://pacmart.in/wp-content/uploads/2020/08/p3.png',
                value: 'top-bottom-box',
                price: 7000
            },
            {
                name: 'Sliding Box',
                imgSrc: 'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/6/28/cfe13c8b-d7a9-44ed-ac3a-83a18bafbd5f.jpg',
                value: 'sliding-box',
                price: 8000
            },
        
        ]
    },
    {
        name: 'Bahan Lapisan',
        id: 'bahan-lapisan',
        description: "Bahan lapisan untuk kemasan anda",
        options: [
            {
                name: 'Brown Kraft',
                imgSrc: 'https://picsum.photos/60',
                value: 'brown-kraft',
                price: 5000
            },
            {
                name: 'Duplex',
                imgSrc: 'https://picsum.photos/60?random=1',
                value: 'duplex',
                price: 7000
            },
            {
                name: 'White Kraft',
                imgSrc: 'https://picsum.photos/60?random=2',
                value: 'white-kraft',
                price: 3000
            },
            {
                name: 'Not sure',
                imgSrc: 'https://picsum.photos/60?random=3',
                value: 'not-sure',
                price: 0
            }
        ]
    },
    {
        name: 'Bahan Dasar',
        id: 'bahan-dasar',
        description: "Tentukan bahan dasar kemasan anda",
        options: [
            {
                name: 'B Flute',
                imgSrc: 'https://picsum.photos/60?random=4',
                value: 'b-flute',
                price: 5000
            },
            {
                name: 'C Flute',
                imgSrc: 'https://picsum.photos/60?random=5',
                value: 'c-flute',
                price: 4000
            },
            {
                name: 'CB Flute',
                imgSrc: 'https://picsum.photos/60?random=6',
                value: 'cb-flute',
                price: 5000
            },
            {
                name: 'E Flute',
                imgSrc: 'https://picsum.photos/60?random=7',
                value: 'e-flute',
                price: 4000
            },
        ]
    },
    {
        name: 'Proses Printing',
        id: 'proses-printing',
        description: "Proses Printing Bahan Dasar",
        options: [
            {
                name: 'Offset',
                imgSrc: 'https://picsum.photos/60?random=8',
                value: 'offset',
                price: 5000
            },
            {
                name: 'Digital',
                imgSrc: 'https://picsum.photos/60?random=9',
                value: 'digital',
                price: 4000
            },
            {
                name: 'Screen',
                imgSrc: 'https://picsum.photos/60?random=10',
                value: 'screen',
                price: 5000
            },
            {
                name: 'Flexo',
                imgSrc: 'https://picsum.photos/60?random=11',
                value: 'flexo',
                price: 4000
            },
        ]
    },
    {
        name: 'Finishing',
        id: 'finishing',
        description: "Proses Finishing Packaging",
        options: [
            {
                name: 'Doff/Matte',
                imgSrc: 'https://picsum.photos/60?random=12',
                value: 'offset',
                price: 5000
            },
            {
                name: 'Glossy',
                imgSrc: 'https://picsum.photos/60?random=13',
                value: 'glossy',
                price: 4000
            },
            {
                name: 'Varnish',
                imgSrc: 'https://picsum.photos/60?random=14',
                value: 'varnish',
                price: 6000
            },
        ]
    }
    
];

const variantsFC = [
    {
        name: 'Folding Carton Options',
        id: 'folding-carton-options',
        description: "Box options can be like this",
        options: [
            {
                name: 'Straight Tuck End',
                imgSrc: 'https://www.mycustomboxes.com/uploads/productimage/1632155969_3b5b2a38438e636ced94.jpg',
                value: 'straight-tuck-end',
                price: 8000
            },
            {
                name: 'Reverse Tuck End',
                imgSrc: 'https://www.liquidprinter.com/images/reverse-tuck-end.jpg',
                value: 'reverse-tuck-end',
                price: 3000
            },
            {
                name: 'Tuck Top Auto Bottom',
                imgSrc: 'https://anycustombox.com/img/products/tuck-top-auto-bottom-01.png',
                value: 'tuck-top-auto-bottom',
                price: 6500
            },
        ]
    },
    {
        name: 'Jenis Bahan',
        id: 'bahan-lapisan',
        description: "Bahan lapisan untuk kemasan anda",
        options: [
            {
                name: 'Art Carton',
                imgSrc: 'https://picsum.photos/60?random=18',
                value: 'art-carton',
                price: 3000
            },
            {
                name: 'Ivory',
                imgSrc: 'https://picsum.photos/60?random=17',
                value: 'white-kraft',
                price: 3000
            },
            {
                name: 'Brown Kraft',
                imgSrc: 'https://picsum.photos/60?random=15',
                value: 'brown-kraft',
                price: 5000
            },
            {
                name: 'Duplex',
                imgSrc: 'https://picsum.photos/60?random=16',
                value: 'duplex',
                price: 7000
            },
            {
                name: 'Not sure',
                imgSrc: 'https://picsum.photos/60?random=19',
                value: 'not-sure',
                price: 0
            }
        ]
    },
    {
        name: 'Ketebalan Bahan',
        id: 'ketebalan-bahan',
        description: "Tentukan ketebalan kemasan anda",
        options: [
            {
                name: '270 gsm',
                value: '270-gsm',
                price: 2000
            },
            {
                name: '300 gsm',
                value: '300-gsm',
                price: 3000
            },
            {
                name: '350 gsm',
                value: '350-gsm',
                price: 4000
            },
            {
                name: '400 gsm',
                value: '400-gsm',
                price: 5000
            },
        ]
    },
    {
        name: 'Proses Printing',
        id: 'proses-printing',
        description: "Proses Printing Bahan Dasar",
        options: [
            {
                name: 'Offset',
                imgSrc: 'https://picsum.photos/60?random=20',
                value: 'offset',
                price: 5000
            },
            {
                name: 'Digital',
                imgSrc: 'https://picsum.photos/60?random=21',
                value: 'digital',
                price: 4000
            },
            {
                name: 'Screen',
                imgSrc: 'https://picsum.photos/60?random=22',
                value: 'screen',
                price: 5000
            },
            {
                name: 'Foil Stamp',
                imgSrc: 'https://picsum.photos/60?random=23',
                value: 'foil-stamp',
                price: 4000
            },
        ]
    },
    {
        name: 'Finishing',
        id: 'finishing',
        description: "Proses Finishing Packaging",
        options: [
            {
                name: 'Doff/Matte',
                imgSrc: 'https://picsum.photos/60?random=24',
                value: 'offset',
                price: 5000
            },
            {
                name: 'Glossy',
                imgSrc: 'https://picsum.photos/60?random=25',
                value: 'glossy',
                price: 4000
            },
            {
                name: 'Varnish',
                imgSrc: 'https://picsum.photos/60?random=26',
                value: 'varnish',
                price: 6000
            },
            {
                name: 'Emboss',
                imgSrc: 'https://picsum.photos/60?random=27',
                value: 'emboss',
                price: 6000
            },
        ]
    }
    
];

const variantsRB = [
    {
        name: 'Rigid Box Options',
        id: 'rigid-box-options',
        description: "Box options can be like this",
        options: [
            {
                name: 'Top-Bottom',
                imgSrc: 'https://themendpackaging.com/wp-content/uploads/2021/03/Top-and-Bottom-Box-Rigid-Board.jpg',
                value: 'top-bottom',
                price: 8000
            },
            {
                name: 'Magnetic Flap Box',
                imgSrc: 'https://ibexpackaging.com/wp-content/uploads/2022/06/Magnetic-Closure-Rigid-Box-2.jpg',
                value: 'magnetic-flap-box',
                price: 3000
            },
        ]
    },
    {
        name: 'Bahan Cover Luar/Dalam',
        id: 'bahan-cover-luar-dalam',
        description: "Bahan cover luar dalam untuk kemasan anda",
        options: [
            {
                name: 'Art Carton',
                imgSrc: 'https://picsum.photos/60?random=28',
                value: 'art-carton',
                price: 3000
            },
            {
                name: 'Linen',
                imgSrc: 'https://picsum.photos/60?random=29',
                value: 'linen',
                price: 3000
            },
            {
                name: 'Fanci Paper',
                imgSrc: 'https://picsum.photos/60?random=30',
                value: 'fanci-paper',
                price: 5000
            },
        ]
    },
    {
        name: 'Jenis Bahan Dasar',
        id: 'jenis-bahan-dasar',
        description: "Tentukan jenis bahan dasar kemasan anda",
        options: [
            {
                name: 'Bot 30',
                value: 'bot-30',
                price: 2000
            },
            {
                name: 'Bot 40',
                value: 'bot-40',
                price: 3000
            },
            {
                name: 'Bot 20',
                value: 'bot-20',
                price: 4000
            },
        ]
    },
    {
        name: 'Proses Printing',
        id: 'proses-printing',
        description: "Proses Printing Bahan Dasar",
        options: [
            {
                name: 'Offset',
                imgSrc: 'https://picsum.photos/60?random=31',
                value: 'offset',
                price: 5000
            },
            {
                name: 'Digital',
                imgSrc: 'https://picsum.photos/60?random=32',
                value: 'digital',
                price: 4000
            },
            {
                name: 'Screen',
                imgSrc: 'https://picsum.photos/60?random=33',
                value: 'screen',
                price: 5000
            },
            {
                name: 'Foil Stamp',
                imgSrc: 'https://picsum.photos/60?random=34',
                value: 'foil-stamp',
                price: 4000
            },
        ]
    },
    {
        name: 'Finishing',
        id: 'finishing',
        description: "Proses Finishing Packaging",
        options: [
            {
                name: 'Doff/Matte',
                imgSrc: 'https://picsum.photos/60?random=35',
                value: 'offset',
                price: 5000
            },
            {
                name: 'Glossy',
                imgSrc: 'https://picsum.photos/60?random=36',
                value: 'glossy',
                price: 4000
            },
        ]
    }
    
];

export const templateCB: Template = {
    name: 'Corrugated Box Template',
    description: 'Template for Corrugated Box',
    active: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    variants: variantsCB
}

export const templateFC: Template = {
    name: 'Folding Carton Template',
    description: 'Template for Folding Carton',
    active: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    variants: variantsFC
}

export const templateRB: Template = {
    name: 'Rigid Box Template',
    description: 'Template for Rigid Box',
    active: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    variants: variantsRB
}