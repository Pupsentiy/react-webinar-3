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

  generationCode() {
    let randomNumber;
    do {
      // Generate a random number between 0 and 10
      randomNumber = Math.floor(Math.random() * this.state.list.length * 10);
    } while (this.state.list.some(item => item.code === randomNumber));

    return randomNumber;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    let code = this.generationCode()
      this.setState({
        ...this.state,
        list: [...this.state.list, {code: code, title: 'Новая запись'}]
      })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
        }else{
          item.selected = false
        }
        return item;
      })
    })
  }

  hoverItem(code){
    let num = 1

    this.setState({
      ...this.state,
      list:this.state.list.map(item => {

        if(item.code === code){
          if(item.hoverNum === undefined){
            item.hoverNum = num
          }else{
            if(!item.selected){
              return item
            }else{
              ++item.hoverNum
            }
          }
        }
        return item
      })
    })
  }
}

export default Store;
