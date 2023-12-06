import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {Route, Routes} from "react-router-dom";
import ItemDetailsPage from "./item-details-page";
import NotFoundPage from "./not-found-page";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route element={<Main/>} path={'/'}/>
        <Route element={<ItemDetailsPage/>} path={'/item-details/:id'}/>
        <Route path={'*'} element={<NotFoundPage />}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
