import PageLayout from "../../components/page-layout";
import {memo, useCallback, useEffect, useState} from "react";
import ItemDetails from "../../components/item-details";
import useStore from "../../store/use-store";
import {useParams} from "react-router-dom";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useSelector from "../../store/use-selector";
import Loader from "../../components/loader";

function ItemDetailsPage() {
  const store = useStore();
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.itemDetails.item,
    list: state.catalog.list,
  }));

  const fetchItemById = async () => {
    setLoading(true)
    await store.actions.itemDetails.itemLoad(id)
    setLoading(false)
  }


  useEffect(() => {
   void fetchItemById()
  }, []);

  const callbacks = {
    // Добавление в корзину
    addProductBasket: useCallback(product => store.actions.basket.addProductBasket(product), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
<PageLayout>
  {!loading && <Head title={select.item?.title}/>}
  <BasketTool
    onOpen={callbacks.openModalBasket}
    amount={select.amount}
    sum={select.sum}/>
  {loading ? <Loader/> : <ItemDetails addProductBasket={callbacks.addProductBasket}/> }
</PageLayout>
  )
}

export default memo(ItemDetailsPage)