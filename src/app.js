import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import {CartModal} from "./components/cart-modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { list, cart } = store.getState();

  const callbacks = {
    onDelete: useCallback((item) => {
      store.deleteItem(item);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, [store]),
    onToggleModal: useCallback(() => {
      setIsOpenModal(!isOpenModal)
    }, [store, isOpenModal])
  }



  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls openModal={callbacks.onToggleModal} cart={cart}/>
      <List list={list}
            onAction={callbacks.onAddItem}
            />
      <CartModal
        isOpenModal={isOpenModal}
        toggleModal={callbacks.onToggleModal}
        onDelete={callbacks.onDelete}
        cart={cart}
      />
    </PageLayout>
  );
}

export default App;
