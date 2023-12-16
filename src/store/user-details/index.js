import StoreModule from "../module";

class UserDetailsState extends StoreModule {

  initState() {
    return {
      user: null,
      error: "",
      waiting: false,
    }
  }

  async userDetails() {
    const token = localStorage.getItem('token')
    if(!token) return
    this.setState({
      user: null,
      error: "",
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        }
      });
      const json = await response.json();
      if (response.ok) {
        this.setState({
          ...this.getState(),
          user: json.result,
          error: '',
          waiting: false,
        })
      } else {
        this.setState({
          user:null,
          error:json.result,
          waiting: false,
        })
      }
    } catch (e) {
      this.setState({
        user:null,
        error:'',
        waiting: false,
      });
    }
  }
}

export default UserDetailsState;
