export interface NavbarItemType {
    label: string;
    href: string;
    isDropDown?: boolean;
    dropDownData?: Array<NavbarItemType>;
}

export const NavbarArray: Array<NavbarItemType> = [
    {
        label: "Female",
        href: "/female/Female",
        isDropDown: true,
        dropDownData: [
            {
                label: "Dresses",
                href: "/female/Dress",
            },
            {
                label: "T-Shirts",
                href: "/female/T-shirt",
            },
            {
                label: "Pants",
                href: "/female/Pant",
            },
            {
                label: "Jackets",
                href: "/female/Jacket",
            },
            {
                label: "Sweaters",
                href: "/female/Sweater",
            }
        ]
    },
    {
        label: "Male",
        href: "/male",
        isDropDown: true,
        dropDownData: [
            {
                label: "Sweaters",
                href: "/male/Sweater",
            },
            {
                label: "Jackets",
                href: "/male/Jacket",
            }
        ]
    },
    {
        label: "Kids",
        href: "/kids",
        isDropDown: false,
    },
    {
        label: "All Products",
        href: "/products",
        isDropDown: false,
    }
];