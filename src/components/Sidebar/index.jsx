import React, { useState, useEffect } from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useHistory, useParams } from 'react-router-dom';
import { FaDotCircle, FaUserCircle } from "react-icons/fa";
import { GrHostMaintenance } from "react-icons/gr";
import { BsCircle, BsCalendar2WeekFill } from "react-icons/bs";
import { MdBatchPrediction, MdQueryStats } from "react-icons/md";
import { AiTwotoneCiCircle } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsSun } from 'react-icons/bs';
import ReactHoverObserver from 'react-hover-observer';

import { Colors, Images } from '../../constant';


function Sidebar() {
  const { menu } = useParams();
  const history = useHistory();
  const [reRender, setReRender] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [itemMenu, setItemMenu] = useState([
    {
      title: 'Maintenance',
      icon: <GrHostMaintenance />,
      submenu: [
        {
          title: 'Item Master',
          link: '/items',
          isActive: true
        },
        {
          title: 'GRN Entry (with PO)',
          link: '/grn-with-pos',
          isActive: true
        },
        {
          title: 'Manual GRN Entry',
          link: '/grn-manuals',
          isActive: true
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
          link: '/stock-locations',
          isActive: true
        },
        {
          title: 'UOM',
          link: '/uoms',
          isActive: true
        },
        {
          title: 'Item Category',
          link: '/item-categories',
          isActive: true
        },
        {
          title: 'Inventory Control',
          link: '/inventory-controls',
          isActive: true
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
        {
          title: 'Project - Stock Unpick',
          link: '',
          isActive: false
        },
        {
          title: 'Project - Picked Material Transfer',
          link: '',
          isActive: false
        },
        {
          title: 'Inventory Movement Request',
          link: '',
          isActive: false
        },
        {
          title: 'Inventory Provision Auto Posting Account Code Setup',
          link: '',
          isActive: false
        },
        {
          title: 'MSR Docm Download',
          link: '',
          isActive: false
        },
        {
          title: 'Auto Project SIV from GRN',
          link: '',
          isActive: false
        },
        {
          title: 'Default Item Maintenance',
          link: '',
          isActive: false
        },
      ]
    },
    {
      title: 'Batch',
      icon: <MdBatchPrediction />,
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
      title: 'Query',
      icon: <MdQueryStats />,
      submenu: [
        {
          title: 'Query 1',
          link: '',
          isActive: false
        },
        {
          title: 'Query 2',
          link: '',
          isActive: false
        }
      ]
    },
    {
      title: 'Report',
      icon: <HiOutlineDocumentReport />,
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
      icon: <BsCalendar2WeekFill />,
      link: '',
      isActive: false
    }
  ]);

  const whichMenuLogic = () => {
    let menu = '';
    if (history.location.search && history.location.search.includes('?menu=')) {
      menu = history.location.search.replace('?menu=', '');
    }
    if (
      menu === 'inventory' ||
      history.location.pathname.includes('/items') ||
      history.location.pathname.includes('/stock-locations') ||
      history.location.pathname.includes('/grn-with-pos') ||
      history.location.pathname.includes('/grn-manuals') || 
      history.location.pathname.includes('/uoms') || 
      history.location.pathname.includes('/item-categories') ||
      history.location.pathname.includes('/inventory-controls')
    ) {
      setSelectedMenu(itemMenu);
    }
    else {
      setSelectedMenu([]);
    }
  };

  useEffect(() => {
    console.log('history.location :>> ', history.location);
    const unlisten = history.listen((location, action) => {
      whichMenuLogic();
    });
    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    whichMenuLogic();
  }, [history.location.pathname]);

  useEffect(() => {
    setReRender(!reRender);
  }, [selectedMenu]);

  const renderMenu = () => {
    return (
      <Menu iconShape="circle">
        {
          selectedMenu.map((menu, idx) => {
            return (
              <>
                {
                  menu.submenu ?
                    <SubMenu title={ menu.title } icon={ menu.icon ? menu.icon : <AiTwotoneCiCircle /> }>
                      {
                        menu.submenu.map((submenu, idx) => {
                          return (
                            <MenuItem onClick={ () => submenu.link ? history.push(submenu.link) : {} } className={ `${ submenu.isActive ? 'actived' : 'nonactive' }` } >{ submenu.title }</MenuItem>
                          );
                        })
                      }
                    </SubMenu>
                    :
                    <MenuItem className={ `${ menu.isActive || menu.submenu ? 'actived' : 'nonactive' }` } icon={ menu.icon ? menu.icon : <AiTwotoneCiCircle /> }>{ menu.title }</MenuItem>

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
    );
  };

  return (
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
              <img onClick={ () => history.push('/') } src={ Images.sunrightLogo } alt="" />
              {/* <BsSun size={ 30 } />
            {
              isHovering &&
              <h1>Sunright ERP</h1>
            } */}
            </div>
          </SidebarHeader>

          <SidebarContent>
            {
              reRender
                ?
                renderMenu()
                :
                renderMenu()
            }
          </SidebarContent>

          <SidebarFooter>
            <Menu className='footer' iconShape="circle">
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
