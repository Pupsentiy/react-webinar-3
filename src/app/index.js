import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Header from "../containers/header";
import Login from "./login";
import Profile from "./profile";
import PrivateRoute from "./private-route";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Header/>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path={'/profile'} element={<Profile/>}/>
        </Route>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
