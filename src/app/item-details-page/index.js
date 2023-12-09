import PageLayout from "../../components/page-layout";
import {memo, useCallback, useEffect, useState} from "react";
import ItemDetails from "../../components/item-details";
import useStore from "../../store/use-store";
import {useParams} from "react-router-dom";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useSelector from "../../store/use-selector";
import Loader from "../../components/loader";
import Navigation from "../../components/navigation";

function ItemDetailsPage() {
  const store = useStore();
  const {id} = useParams()
  const [loading, setLoading] = useState(false)

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.itemDetails.item,
    list: state.catalog.list,
    toggleLang:state.toggleLang.toggle
  }));

  const fetchItemById = async () => {
    setLoading(true)
    await store.actions.itemDetails.itemLoad(id)
    setLoading(false)
  }

  useEffect(() => {
   void fetchItemById()
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addProductBasket: useCallback(product => store.actions.basket.addProductBasket(product), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    setPage:useCallback((num) => store.actions.catalog.setPage(num),[store]),

    toggleLang: useCallback(() => store.actions.toggleLang.toggleLang(), [store])
  }

  return (
<PageLayout>
  {!loading &&
    <Head
      title={select.item?.title}
      onToggle={callbacks.toggleLang}
      toggleLang={select.toggleLang}
    />}
  <div className="inner-header">
    <Navigation toggleLang={select.toggleLang} setPage={callbacks.setPage}/>
    <BasketTool
      onOpen={callbacks.openModalBasket}
      amount={select.amount}
      sum={select.sum}
      toggleLang={select.toggleLang}
    />
  </div>
  {loading ?
    <Loader/>
    :
    <ItemDetails
      addProductBasket={callbacks.addProductBasket}
      item={select.item}
      toggleLang={select.toggleLang}
    /> }
</PageLayout>
  )
}

export default memo(ItemDetailsPage)