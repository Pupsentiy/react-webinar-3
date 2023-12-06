import StoreModule from "../module";

class ToggleLang extends StoreModule {

  initState() {
    return {
      toggle: false,
    }
  }

  toggleLang() {
    this.setState({
     ...this.setState,
      toggle: this.toggle = !this.toggle
    },'Смена языка')
  }
}

export default ToggleLang;
