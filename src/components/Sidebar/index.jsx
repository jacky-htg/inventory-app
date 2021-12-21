import React, { useState, useEffect } from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaDotCircle, FaUserCircle } from "react-icons/fa";
import { BsCircle } from "react-icons/bs";
import { AiTwotoneCiCircle } from "react-icons/ai";

import { BsSun } from 'react-icons/bs';
import ReactHoverObserver from 'react-hover-observer';

import { Colors, Images } from '../../constant';


function Sidebar() {

  const [itemMenu, setItemMenu] = useState([
    {
      title: 'Maintenance',
      submenu: [
        {
          title: 'Item Master',
          link: '',
          isActive: false
        },
        {
          title: 'GRN Entry (with PO)',
          link: '',
          isActive: false
        },
        {
          title: 'Manual GRN Entry',
          link: '',
          isActive: false
        },
        {
          title: 'SIV Entry',
          link: '',
          isActive: false
        },
        {
          title: 'Manual SIV Entry',
          link: '',
          isActive: false
        },
        {
          title: 'SIV Combine Entry',
          link: '',
          isActive: false
        },
        {
          title: 'SIV Consigned Entry',
          link: '',
          isActive: false
        },
        {
          title: 'MSR Entry',
          link: '',
          isActive: false
        },
        {
          title: 'MRV Entry',
          link: '',
          isActive: false
        },
        {
          title: 'Stock Location',
          link: '',
          isActive: true
        },
        {
          title: 'UOM',
          link: '',
          isActive: false
        },
        {
          title: 'Item Category',
          link: '',
          isActive: false
        },
        {
          title: 'Inventory Control',
          link: '',
          isActive: false
        },
        {
          title: 'Reversal of RSI',
          link: '',
          isActive: false
        },
        {
          title: 'GRN Reversal',
          link: '',
          isActive: false
        },
        {
          title: 'Project - Stock Allocation',
          link: '',
          isActive: false
        },
        {
          title: 'Project - Stock Release',
          link: '',
          isActive: false
        },
      ]
    },
    {
      title: 'Batch',
      submenu: [
        {
          title: 'Batch 1',
          link: '',
          isActive: false
        },
        {
          title: 'Batch 2',
          link: '',
          isActive: false
        }
      ]
    },
    {
      title: 'Report',
      submenu: [
        {
          title: 'Report 1',
          link: '',
          isActive: false
        },
        {
          title: 'Report 2',
          link: '',
          isActive: false
        }
      ]
    },
    {
      title: 'End of Period',
      link: '',
      isActive: false
    }
  ]);

  return (
    <ReactHoverObserver className='sidebar-wrapper'>
      { ({ isHovering }) => (
        <ProSidebar
          width={ '270px' }
          collapsedWidth={ '80px' }
          collapsed={ false }
        >
          <SidebarHeader>
            {/**
         *  You can add a header for the sidebar ex: logo
         */}
            <div className="sidebar-title">
              <img src={ Images.sunrightLogo } alt="" />
              {/* <BsSun size={ 30 } />
            {
              isHovering &&
              <h1>Sunright ERP</h1>
            } */}
            </div>
          </SidebarHeader>

          <SidebarContent>
            <Menu iconShape="circle">
              {
                itemMenu.map((menu, idx) => {
                  return (
                    <>
                      {
                        menu.submenu ?
                          <SubMenu title={ menu.title } icon={ <AiTwotoneCiCircle /> }>
                            {
                              menu.submenu.map((submenu, idx) => {
                                return (
                                  <MenuItem className={ `${ submenu.isActive ? 'actived' : 'nonactive' }` } >{ submenu.title }</MenuItem>
                                );
                              })
                            }
                          </SubMenu>
                          :
                          <MenuItem className={ `${ menu.isActive || menu.submenu ? 'actived' : 'nonactive' }` } icon={ <AiTwotoneCiCircle /> }>{ menu.title }</MenuItem>

                      }
                    </>

                  );
                })
              }
              {/* <SubMenu title="Maintenance" icon={ <AiTwotoneCiCircle /> }>
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
              <SubMenu title="Batch" icon={ <AiTwotoneCiCircle /> }>
                <MenuItem>Batch 1</MenuItem>
                <MenuItem>Batch 2</MenuItem>
              </SubMenu>
              <SubMenu title="Report" icon={ <AiTwotoneCiCircle /> }>
                <MenuItem>Report 1</MenuItem>
                <MenuItem>Report 2</MenuItem>
              </SubMenu>
              <MenuItem icon={ <AiTwotoneCiCircle /> }>End of Period</MenuItem> */}
            </Menu>
          </SidebarContent>

          <SidebarFooter>
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
  );
}

export default Sidebar;
