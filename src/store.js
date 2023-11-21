/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.initialLength = initState.initialLength;
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
   const item = this.state.list[this.state.list.length -1]
    if(!this.state.list.length) return this.state.initialLength + 1
    return item.code + 1
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
      list: this.state.list.filter(item => item.code !== code),
      initialLength:this.state.list[this.state.list.length -1].code
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
