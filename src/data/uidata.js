import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiTodoLine, RiStockLine } from 'react-icons/ri';
import { GiLouvrePyramid } from 'react-icons/gi';

export const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'metrics',
          icon: <AiOutlineBarChart />,
        },
        {
            name: 'orders',
            icon: <AiOutlineShoppingCart/>
        }
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'inventory',
          icon: <FiEdit />,
        },
        {
          name: 'purchase order',
          icon: <RiTodoLine />,
        },
        {
          name: 'vendors',
          icon: <BsBoxSeam />,
        },
        {
            name: 'employees',
            icon: <IoMdContacts/>
        }
      ],
    },
    {
      title: 'Apps',
      links: [
        {
          name: 'calendar',
          icon: <AiOutlineCalendar />,
        },
        {
          name: 'kanban',
          icon: <BsKanban />,
        },
        {
          name: 'editor',
          icon: <FiEdit />,
        },
        {
          name: 'color-picker',
          icon: <BiColorFill />,
        },
      ],
    },
    {
      title: 'Charts',
      links: [
        {
          name: 'line',
          icon: <AiOutlineStock />,
        },
        {
          name: 'area',
          icon: <AiOutlineAreaChart />,
        },
  
        {
          name: 'bar',
          icon: <AiOutlineBarChart />,
        },
        {
          name: 'pie',
          icon: <FiPieChart />,
        },
        {
          name: 'financial',
          icon: <RiStockLine />,
        },
        {
          name: 'color-mapping',
          icon: <BsBarChart />,
        },
        {
          name: 'pyramid',
          icon: <GiLouvrePyramid />,
        },
        {
          name: 'stacked',
          icon: <AiOutlineBarChart />,
        },
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

