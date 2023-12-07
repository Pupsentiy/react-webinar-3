import {Fragment, memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import {changeLang} from "../../utils";
import Loader from "../../components/loader";

function Main() {
  const store = useStore();
  const [loading, setLoading] = useState(false)

  const select = useSelector(state => ({
    count:  state.catalog.count,
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.pagination.page,
    limit:  state.pagination.limit,
    toggleLang:state.toggleLang.toggle
  }));

  const fetchItems = async () => {
    setLoading(true)
    await store.actions.catalog.load(select.limit,select.page);
    setLoading(false)
  }

  useEffect(() => {
    void  fetchItems()
  }, [select.limit, select.page]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    setPage:useCallback((num) => store.actions.pagination.setPage(num),[store]),

    toggleLang: useCallback(() => store.actions.toggleLang.toggleLang(), [store])

  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={changeLang(select.toggleLang,'Магазин')} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      {loading
        ?
        <Loader/>
        :
        <Fragment>
        <List list={select.list} renderItem={renders.item}/>
        <Pagination pagination={callbacks.setPage}/>
        </Fragment>}
    </PageLayout>

  );
}

export default memo(Main);
