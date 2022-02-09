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
import moment from 'moment';

import {
  Dashboard,
  Form,
  StockLocation,
  StockLocationForm,
  Items,
  GrnWithPo,
  // GrnWithForm,
  GrnManual,
  GrnManualForm,
  GrnWithPoForm,
  Uom,
  UomForm,
  ItemCategory,
  ItemCategoryForm,
  InventoryControl,
  InventoryControlForm,
  Msr,
  MsrForm
} from '../screens';
import { Sidebar } from '../components';
import { Colors, Images } from '../constant';

import env from '../env';


// import PrivateRoute from './private';
// import { scrollToTop as ScrollToTop } from '../helpers';
// import { store } from 'store';


const publicRoutes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/items',
    component: Items,
  },
  {
    path: '/items/create',
    component: Form,
  },
  {
    path: '/items/:id',
    component: Form,
  },
  {
    path: '/stock-locations',
    component: StockLocation,
  },
  {
    path: '/stock-locations/create',
    component: StockLocationForm,
  },
  {
    path: '/stock-locations/:id',
    component: StockLocationForm,
  },
  {
    path: '/grn-with-pos/create',
    component: GrnWithPoForm
  },
  {
    path: '/grn-with-pos/:id',
    component: GrnWithPoForm
  },
  {
    path: '/grn-with-pos',
    component: GrnWithPo
  },
  {
    path: '/grn-manuals',
    component: GrnManual
  },
  {
    path: '/grn-manuals/create',
    component: GrnManualForm
  },
  {
    path: '/grn-manuals/:id',
    component: GrnManualForm
  },
  {
    path: '/uoms',
    component: Uom,
  },
  {
    path: '/uoms/create',
    component: UomForm,
  },
  {
    path: '/uoms/:id',
    component: UomForm,
  },
  {
    path: '/item-categories',
    component: ItemCategory
  },
  {
    path: '/item-categories/create',
    component: ItemCategoryForm
  },
  {
    path: '/item-categories/:id',
    component: ItemCategoryForm
  },
  {
    path: '/inventory-controls',
    component: InventoryControl
  },
  {
    path: '/inventory-controls/create',
    component: InventoryControlForm
  },
  {
    path: '/inventory-controls/:id',
    component: InventoryControlForm
  },
  {
    path: '/msr',
    component: Msr
  },
  {
    path: '/msr/create',
    component: MsrForm
  },
  {
    path: '/msr/:id',
    component: MsrForm
  }

];

const privateRoutes = [
  // {
  //   path: '/payment-status/:id',
  //   component: WaitingPayment,
  // },
];


const Router = props => {
  const history = useHistory();
  const [userName, setUserName] = useState('username');
  const [company, setCompany] = useState('company_name');
  const [loginDate, setLoginDate] = useState(moment().format("LLL"));
  // const dispatch = useDispatch();
  const [now, setNow] = useState(moment().format("LLL"));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment().format("LLL"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter history={ history }>
      {/* <GlobalStyles /> */ }
      {/* <ScrollToTop /> */ }

      <Sidebar />

      <div className="page-wrapper">
        {
          <div className="userInfo">
            <div className="left">
              <p className="username">Username: <span>{ env.username }</span></p>
              <p className="company">Company: <span>{ env.companyName }</span></p>
            </div>
            <div className="right">
              <p className="login"><span>{ now }</span></p>
            </div>
          </div>
        }
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
