import { Box, Typography } from "@mui/material"

import { styled } from '@mui/material/styles';
import {Drawer as MuiDrawer} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import SidebarContents from "@/components/Admin/Layouts/SidebarContents";
import { ReactNode } from "react";

const drawerWidth = 240;

const Wrapper = styled('div')(({ theme }) => ({
    height: 'calc(100vh - 64px)',
    display: 'flex',
    marginTop: '64px',
    backgroundColor: '#f5f5f5',
}));

const Sidebar = styled('div')(({ theme }) => ({
  width: drawerWidth,
  minWidth: drawerWidth,
  flexShrink: 0,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Content = styled('div')(({ theme }) => ({
  flexGrow: 1,
  minHeight: '100%',
  overflow: 'auto',
  flexDirection: 'column',
  padding: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        minWidth: drawerWidth,
        boxSizing: 'border-box',
    },
}));

const AdminPanelLayout = ({children}: {children: ReactNode}) => {
  return (
    <Wrapper>
      <Sidebar className="sidebar">
        <Drawer variant="permanent">
          <Toolbar />
          <SidebarContents />
        </Drawer>
      </Sidebar>
      <Content>
        {children}
      </Content>
    </Wrapper>
  );
};


AdminPanelLayout.showAppBar = true;
AdminPanelLayout.showFooter = false;

export default AdminPanelLayout;