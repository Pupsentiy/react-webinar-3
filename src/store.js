/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.setState({
      ...this.state,
      initialLength:this.state.list.length
    })
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
    if(!this.state.list.length) {
      this.setState({
        ...this.state,
        initialLength: this.state.initialLength
      })
      return this.state.initialLength + 1
    }

    return this.state.initialLength + 1
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    let code = this.generationCode()
      this.setState({
        ...this.state,
        list: [...this.state.list, {code: code, title: 'Новая запись'}],
        initialLength: this.state.initialLength + 1
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
      initialLength:code > this.state.initialLength ? code + 1 : this.state.initialLength
    })
  };

  /**
   * Выделение записи по коду
   * @param { MouseEvent<HTMLDivElement>} e
   * @param code
   */
  selectItem(e, code) {
    if (e.target instanceof HTMLButtonElement && e.target.id === 'delete') return;
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if(item.selected){
            item.selectedNum = item.selectedNum ? ++item.selectedNum : 1
          }

        }else{
          item.selected = false
        }
        return item;
      })
    })
  }

}

export default Store;
