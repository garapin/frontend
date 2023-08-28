import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import Link from 'next/link';
import { useRouter } from 'next/router';

const drawerItems = [
  // {
  //   label: 'Dashboard',
  //   icon: <DashboardIcon />,
  //   href: '/admin/dashboard'
  // },
  {
    label: 'Orders',
    icon: <ShoppingCartIcon />,
    href: '/admin/orders'
  },
  // {
  //   label: 'Customers',
  //   icon: <PeopleIcon />,
  //   href: '/admin/customers'
  // },
  // {
  //   label: 'Reports',
  //   icon: <BarChartIcon />,
  //   href: '/admin/reports'
  // },
  // {
  //   label: 'Integrations',
  //   icon: <LayersIcon />,
  //   href: '/admin/integrations'
  // },
];

const SidebarContents = () => {
    const router = useRouter();

  return (
    <List>
      {drawerItems.map(({ label, icon, href }) => (
        <Link href={href} passHref key={label} >
          <ListItem >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
          </ListItem>
      </Link>
      ))}
    </List>
  );
};

export default SidebarContents;
