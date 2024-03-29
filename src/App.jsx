import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { notification } from 'antd';
import 'antd/dist/antd.css';
// import { PersistGate } from 'redux-persist/integration/react';

// import { GlobalStyles } from './constant';
import Router from './router';
// import { history, store, Redux } from 'store';


const App = () => {

  useEffect(() => {
    // message.config({
    //   duration: 20,
    //   rtl: false,
    //   maxCount: 1
    // });

    notification.config({
      placement: 'topRight',
      duration: 20,
      rtl: false,
    });

    $('body').on('keydown', 'input, select', function (e) {
      if (e.key === "Enter") {
        var self = $(this), form = self.parents('form:eq(0)'), focusable, next;
        focusable = form.find('input,a,select,button').filter(':visible');
        next = focusable.eq(focusable.index(this) + 1);
        if (next.length) {
          next.focus();
        } else {
          form.submit();
        }
        return false;
      }
    });
  }, []);


  return (
    // <Provider store={ store }>
    //   <PersistGate loading={ null } persistor={ persistor }>
    //     <GlobalStyles/>
    //     <Router history={ history } />
    //   </PersistGate>
    // </Provider>
    <div className='App' onClick={ () => notification.destroy() } style={ { overflow: 'hidden' } }>
      {/* <Redux> */ }
      {/* <GlobalStyles /> */ }
      <Router />
      {/* </Redux> */ }
    </div>
  );
};
export default App;
