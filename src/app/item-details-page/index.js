import PageLayout from "../../components/page-layout";
import {memo, useCallback, useEffect} from "react";
import ItemDetails from "../../components/item-details";
import useStore from "../../store/use-store";
import {useParams} from "react-router-dom";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useSelector from "../../store/use-selector";

function ItemDetailsPage() {
  const store = useStore();
  const {id} = useParams()

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.itemDetails.item,
    list: state.catalog.list,
  }));

  useEffect(() => {
     store.actions.itemDetails.itemLoad(id)

  }, []);

  const callbacks = {
    // Добавление в корзину
    addProductBasket: useCallback(product => store.actions.basket.addProductBasket(product), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
<PageLayout>
  <Head title={select.item?.title}/>
  <BasketTool
    onOpen={callbacks.openModalBasket}
    amount={select.amount}
    sum={select.sum}/>
  <ItemDetails addProductBasket={callbacks.addProductBasket}/>
</PageLayout>
  )
}

export default memo(ItemDetailsPage)