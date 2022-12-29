import { AiOutlineShoppingCart, AiOutlineBarChart, AiOutlineFire } from 'react-icons/ai';
import { FiAward, FiEdit } from 'react-icons/fi';
import { BsBoxSeam, BsGift } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { RiTodoLine,  } from 'react-icons/ri';
import { TbBottle } from 'react-icons/tb';

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
  { value: 7, label: '8x10"'},
  { value: 8, label: 'Custom'}
];

export const serviceOpts = [
  { value: 'coin-mount', label: 'Coin Mount' },
  { value: 'item-mount', label: 'Item Mount'},
  { value: 'color-fill', label: 'Color Fill'}
];

export const graphicColOpts = [
  { value: 1, label: 'Default - Same as other addons'},
  { value: 2, label: 'Blue' }
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
          to: 'vendors',
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
    { field: 'code',
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
      format: 'yMd',
      textAlign: 'Center'},
    {
      field: 'cost',
      headerText: 'Cost',
      width: '75',
      textAlign: 'Center' },
    { field: 'category',
      headerText: 'Category',
      width: '100',
      format: 'yMd',
      textAlign: 'Center' },
  
    { field: 'qty',
      headerText: 'Qty.',
      width: '75',
      textAlign: 'Center' },
  
    { field: 'qtyThresh',
      headerText: 'Reorder Threshold',
      width: '130',
      textAlign: 'Center',
    },

    { field: 'maxAddon',
      headerText: 'Max Addons',
      width: '100',
      textAlign: 'Center',
    },
    
    { field: 'updatedAt',
      headerText: 'Last Updated',
      width: '120',
      textAlign: 'Center',
    },
];

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

export const InitCartItemState = {
  name: "",
  code: "",
  price: 0.0,
  services: [],
  graphics: [],
  cutouts: [],
  subItems: [],
  quantity: 1,
  txtLines: null, //draft-js object
  font: "", //probably get rid of this later
  category: "",
  layoutImg: null,
  postGraphics: false,
  postTxt: false,
  postLayout: false
};