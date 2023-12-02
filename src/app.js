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

  const { list, cart, totalPrice  } = store.getState();

  const callbacks = {
    onDelete: useCallback((code) => {
      store.deleteItem(code);
      store.totalPrice()
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
      store.totalPrice()
    }, [store]),
    onToggleModal: useCallback(() => {
      setIsOpenModal(!isOpenModal)
    }, [store, isOpenModal]),

  }



  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls openModal={callbacks.onToggleModal} cart={cart} totalPrice={totalPrice}/>
      <List list={list}
            onAction={callbacks.onAddItem}
            />
      <CartModal
        isOpenModal={isOpenModal}
        toggleModal={callbacks.onToggleModal}
        onDelete={callbacks.onDelete}
        totalPrice={totalPrice}
        cart={cart}
      />
    </PageLayout>
  );
}

export default App;
