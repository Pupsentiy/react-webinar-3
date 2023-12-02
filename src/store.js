
/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItem(code) {
    const item = this.state.list.find((obj) => obj.code === code);
    const findItem = this.state.cart.find((obj) => obj.code === code);

    this.setState({
      ...this.state,
      cart: findItem ?  this.state.cart.map((el) => {
        if(el.code === code){
          ++el.quantity
         return el
        }
        return el
      }) :[...this.state.cart, {
        ...item, quantity: 1
      }]
    })
  };

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };

  totalPrice(){
    this.setState({
      ...this.state,
      totalPrice: this.state.cart.length ? this.state.cart.reduce((sum, obj) => obj.price * obj.quantity + sum, 0) : 0
    })
  }
}

export default Store;
