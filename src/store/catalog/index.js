import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      count:null,
      page: 1,
      limit:10
    }
  }

  async load( page ) {
    const limit = this.getState().limit
    const skip =  page * limit - limit
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      list: json.result.items,
      count:json.result.count
    }, 'Загружены товары из АПИ');
  }

  setPage(num) {
    this.setState({
      ...this.getState(),
      page:num,
    }, 'изменение номера страницы');
  }
}

export default Catalog;
