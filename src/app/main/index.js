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
import Navigation from "../../components/navigation";

function Main() {
  const store = useStore();
  const [loading, setLoading] = useState(false)

  const select = useSelector(state => ({
    count:  state.catalog.count,
    list: state.catalog.list,
    page: state.catalog.page,
    amount: state.basket.amount,
    sum: state.basket.sum,
    toggleLang:state.toggleLang.toggle,
    limit:state.catalog.limit
  }));

  const fetchItems = async () => {
    setLoading(true)
    await store.actions.catalog.load(select.page);
    setLoading(false)
  }

  useEffect(() => {
    void  fetchItems()
  }, [select.page]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    setPage:useCallback((num) => store.actions.catalog.setPage(num),[store]),

    toggleLang: useCallback(() => store.actions.toggleLang.toggleLang(), [store]),

  }

  const renders = {
    item: useCallback((item) => {
      return <Item
        item={item}
        onAdd={callbacks.addToBasket}
        toggleLang={select.toggleLang}
        link={`item-details/${item._id}`}
      />
    }, [callbacks.addToBasket, select.toggleLang]),
  };

  return (
    <PageLayout>
      <Head
        title={changeLang(select.toggleLang,'Магазин')}
        onToggle={callbacks.toggleLang}
        toggleLang={select.toggleLang}
      />

      <div className="inner-header">
        <Navigation toggleLang={select.toggleLang} setPage={callbacks.setPage}/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          toggleLang={select.toggleLang}
        />
      </div>
      {loading
        ?
        <Loader/>
        :
        <Fragment>
        <List list={select.list} renderItem={renders.item}/>
        <Pagination
          nextPage={callbacks.setPage}
          count={select.count}
          page={select.page}
          limit={select.limit}
        />
        </Fragment>}
    </PageLayout>

  );
}

export default memo(Main);
