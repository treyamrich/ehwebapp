import { AiOutlineShoppingCart, AiOutlineBarChart, AiOutlineFire } from 'react-icons/ai';
import { FiAward, FiEdit } from 'react-icons/fi';
import { BsBoxSeam, BsGift } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { RiTodoLine,  } from 'react-icons/ri';
import { TbBottle } from 'react-icons/tb';
import makeAnimated from 'react-select/animated';

export const animatedComponents = makeAnimated();

export const EH_COLOR_DARK = '#C39F7F';
export const EH_COLOR_LIGHT = '#c39f7f57';

export const pltColors = [
  { value: 1, label: 'Black/Gold' },
  { value: 2, label: 'Black/Silver' },
  { value: 3, label: 'Gold/Black'},
  { value: 4, label: 'Silver/Black' },
  { value: 5, label: 'Red/Gold' }
];

export const pltSizes = [
  { value: 1, label: '3x1.5"'},
  { value: 2, label: '4x3"'},
  { value: 3, label: '5x2"'},
  { value: 4, label: '6x3"'},
  { value: 5, label: '6x4"'},
  { value: 6, label: '5x7"'},
  { value: 7, label: '8x10"'}
];

export const graphicColOpts = [
  { value: 1, label: 'Default - Same as other addons'},
  { value: 2, label: 'Blue' }
];
export const graphicSizeOpts = [
  { value: 1, label: "Small ~ smaller than (2.5x2.5\")"},
  { value: 2, label: "Large ~ bigger than (2.5x2.5\")"}
];
export const woodcutoutSizeOpts = [
  { value: 1, label: "Small"}
];

export const itemCategoryOptions = [
  {value: 1, label: "PLAQUE"},
  {value: 2, label: "DRINKWARE"},
  {value: 3, label: "GIFT"},
  {value: 4, label: "SERVICE"},
  {value: 5, label: "GRAPHICADDON"},
  {value: 6, label: "CUTOUTADDON"}
];

export const dashboard_links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'Metrics',
          to: 'metrics',
          icon: <AiOutlineBarChart />,
        },
        {
            name: 'Orders',
            to: 'orders',
            icon: <AiOutlineShoppingCart/>
        }
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'Inventory',
          to: 'inventory',
          icon: <FiEdit />,
        },
        {
          name: 'Purchase Orders',
          to: 'purchase-orders',
          icon: <RiTodoLine />,
        },
        {
          name: 'Vendors',
          to: 'manage-vendor',
          icon: <BsBoxSeam />,
        },
        {
            name: 'Employees',
            to: 'employees',
            icon: <IoMdContacts/>
        }
      ],
    },
  ];

export const inventoryColumns = [
    { type: 'checkbox', width: '50' },
    { field: 'itemCode',
      isPrimaryKey: true,
      headerText: 'Item Code',
      width: '150',
      textAlign: 'Center' },
    { field: 'name',
      headerText: 'Item Name',
      width: '150',
      textAlign: 'Center' },
    { field: 'price',
      headerText: 'Price',
      width: '75',
      textAlign: 'Center'},
    {
      field: 'cost',
      headerText: 'Cost',
      width: '75',
      textAlign: 'Center'
    },
    { field: 'category',
      headerText: 'Category',
      width: '100',
      textAlign: 'Center' 
    },
    { field: 'qty',
      headerText: 'Qty.',
      width: '75',
      textAlign: 'Center' },
    { field: 'updatedAt',
      headerText: 'Last Updated',
      width: '120',
      textAlign: 'Center',
    },
];
export const vendorColumns = [
  { type: 'checkbox', width: '50' },
  { field: 'vendorName',
    isPrimaryKey: true,
    headerText: 'Vendor Name',
    width: '150',
    textAlign: 'Center' },
  { field: 'contactInfo.name',
    headerText: 'Contact Info',
    width: '150',
    textAlign: 'Center' },
  { field: 'shTerms',
    headerText: 'Shipping Terms',
    width: '75',
    textAlign: 'Center'},
  {
    field: 'salesTaxTerms',
    headerText: 'Sales Tax Terms',
    width: '75',
    textAlign: 'Center'
  },
  { field: 'notes',
    headerText: 'Notes',
    width: '100',
    textAlign: 'Center' 
  },
];

export const orderColumns = [
  { field: 'orderNum',
    isPrimaryKey: true,
    headerText: 'Order #',
    width: '75',
    textAlign: 'Center' 
  },
  { field: 'dateNeeded',
    headerText: 'Needed By',
    width: '120',
    textAlign: 'Center' 
  },
  { field: 'rushStatus',
    headerText: 'Rush',
    width: '75',
    textAlign: 'Center'
  },
  {
    field: 'location',
    headerText: 'Location',
    width: '75',
    textAlign: 'Center' 
  },
  { field: 'status',
    headerText: 'Status',
    width: '100',
    textAlign: 'Center' 
  },
  { field: 'updatedAt',
    headerText: 'Last Updated',
    width: '120',
    textAlign: 'Center',
  }
];


export const AUTH_MODE_COGNITO = "AMAZON_COGNITO_USER_POOLS";
export const AUTH_MODE_IAM = "AWS_IAM";
export const DEFAULT_TABLE_PAGE_SETTINGS = {pageSize: 12, pageCount: 5};

export const order_links = [
  {
    title: 'Popular',
    links: [
      {
        name: 'Bundles',
        to: 'bundles',
        icon: <AiOutlineFire />,
      },
    ],
  },

  {
    title: 'Customize',
    links: [
      {
        name: 'Plaques & Plates',
        to: 'plaques-and-plates',
        icon: <FiAward />,
      },
      {
        name: 'Engravable Bottles',
        to: 'engravable-bottles',
        icon: <TbBottle />,
      },
      {
        name: 'Personalized Gifts',
        to: 'personalized-gifts',
        icon: <BsGift />,
      }
    ],
  },
];

export const initialOrderState = {
  orderNum: '',
  name: '',
  phone: '',
  email: '',
  dateNeeded: '',
  location: '',
  status: 'NEW',
  rushStatus: 'NONE',
  cart: [],
  notes: ''
};

export const InitCartItemState = {
  name: "",
  itemCode: "",
  price: 0.0,
  services: [],
  graphics: [],
  cutouts: [],
  subItems: [],
  quantity: 1,
  txtObj: null, //draft-js object
  notes: "",
  category: "",
  layoutImg: null,
  postTxt: false,
  postLayout: false
};
export const locationOpts = [
  { value: "SCHO", label: 'Schofield Barracks'},
  { value: "KBAY", label: 'Kaneohe Bay'},
];
export const addonFields = ['graphics', 'cutouts', 'services'];
export const HAWAII_SALES_TAX = 0.04;
export const RUSH_FEES = { //Key = # of days
  0: 0,
  1: 40,
  3: 25
};
