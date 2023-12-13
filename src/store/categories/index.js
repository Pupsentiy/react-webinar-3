import StoreModule from "../module";
import {treeShaping} from "../../utils";

/**
 * Детальная информация о товаре для страницы товара
 */
class CategoriesState extends StoreModule {

  initState() {
    return {
      data: [],
      waiting: false // признак ожидания загрузки
    }
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async loadCategories() {
    this.setState({
      data:[],
      waiting: true,
    });
    try {
      const response = await fetch(`api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();
      const items =  treeShaping(json.result.items)

      this.setState({
        data:items,
        waiting: false
      }, 'Загруженные категории из АПИ');

    } catch (e) {
      this.setState(
        {
          data: [],
          waiting: false
        }
      );
    }
  }
}

export default CategoriesState;
