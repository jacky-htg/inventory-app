import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { useHistory } from 'react-router-dom';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from 'react-device-detect';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaHeart, FaUserCircle } from "react-icons/fa";
import { BsSun } from 'react-icons/bs';
import ReactHoverObserver from 'react-hover-observer';

import {
  Dashboard,
  Master,
  Inm00001
} from '../screens';
import { Colors } from '../constant';


// import PrivateRoute from './private';
// import { scrollToTop as ScrollToTop } from '../helpers';
// import { store } from 'store';


const publicRoutes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/master',
    component: Master,
  },
  {
    path: '/inm00001',
    component: Inm00001,
  },

];

const privateRoutes = [
  // {
  //   path: '/payment-status/:id',
  //   component: WaitingPayment,
  // },
];


const Router = props => {
  const history = useHistory();
  console.log('useHistory() :>> ', useHistory());
  // const dispatch = useDispatch();

  return (
    <BrowserRouter history={ history }>
      {/* <GlobalStyles /> */ }
      {/* <ScrollToTop /> */ }

      <ReactHoverObserver className='sidebar-wrapper'>
        { ({ isHovering }) => (
          <ProSidebar
            width={ '270px' }
            collapsedWidth={ '80px' }
            collapsed={ !isHovering }
          >
            <SidebarHeader>
              {/**
             *  You can add a header for the sidebar ex: logo
             */}
              <div className="sidebar-title">
                <BsSun size={ 30 } />
                {
                  isHovering &&
                  <h1>Sunright ERP</h1>
                }
              </div>
            </SidebarHeader>
            <SidebarContent>
              {/**
             *  You can add the content of the sidebar ex: menu, profile details, ...
             */}
              <Menu iconShape="circle">
                <SubMenu title="Maintenance" icon={ <FaHeart /> }>
                  <MenuItem>Item Master</MenuItem>
                  <MenuItem>GRN Entry (with PO)</MenuItem>
                  <MenuItem>Manual GRN Entry</MenuItem>
                  <MenuItem>SIV Entry</MenuItem>
                  <MenuItem>Manual SIV Entry</MenuItem>
                  <MenuItem>SIV Combine Entry</MenuItem>
                  <MenuItem>SIV Consigned Entry</MenuItem>
                  <MenuItem>MSR Entry</MenuItem>
                  <MenuItem>MRV Entry</MenuItem>
                  <MenuItem>Stock Location</MenuItem>
                  <MenuItem>UOM</MenuItem>
                  <MenuItem>Item Category</MenuItem>
                  <MenuItem>Inventory Control</MenuItem>
                  <MenuItem>Reversal of RSI</MenuItem>
                  <MenuItem>GRN Reversal</MenuItem>
                  <MenuItem>Project - Stock Allocation</MenuItem>
                  <MenuItem>Project - Stock Release</MenuItem>
                </SubMenu>
                <SubMenu title="Batch" icon={ <FaHeart /> }>
                  <MenuItem>Batch 1</MenuItem>
                  <MenuItem>Batch 2</MenuItem>
                </SubMenu>
                <SubMenu title="Report" icon={ <FaHeart /> }>
                  <MenuItem>Report 1</MenuItem>
                  <MenuItem>Report 2</MenuItem>
                </SubMenu>
                <MenuItem icon={ <FaGem /> }>End of Period</MenuItem>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              {/**
             *  You can add a footer for the sidebar ex: copyright
             */}
              <Menu iconShape="circle">
                <SubMenu title="username" icon={ <FaUserCircle /> }>
                  <MenuItem>Setting</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </SubMenu>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        ) }
      </ReactHoverObserver>

      <div className="page-wrapper">
        <Switch>
          {
            publicRoutes.map(route =>
              <Route
                key={ route.path }
                exact
                path={ route.path }
                component={ route.component }
              />
            )
          }

          {/* {
            privateRoutes.map(route => <PrivateRoute key={ route.path } path={ route.path } component={ route.component } langContent={ langContent } />)
          } */}

          {/* <Route component={ Page404 }/> */ }
        </Switch>
      </div>

    </BrowserRouter>
  );
};

export default Router;
