import StoreModule from "../module";

class ItemDetails extends StoreModule {


  initState() {
    return {
      item: null,
    }
  }

  async itemLoad(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: {
        _id: json.result._id,
        title: json.result.title,
        description: json.result.description,
        price: json.result.price,
        madeIn: {
          title: json.result.madeIn.title,
          code: json.result.madeIn.code,
        },
        edition: json.result.edition,
        category: {
          title: json.result.category.title,
        }
      },
    }, 'Загружен один item');
  }
}

export default ItemDetails;
