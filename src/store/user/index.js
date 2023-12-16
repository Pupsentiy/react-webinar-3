import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      username: null,
      error: "",
      waiting: false,
    }
  }


  async login(auth) {
    this.setState({
      user: null,
      error: "",
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth)
      })
      const json = await response.json();
      if (response.ok) {
        localStorage.setItem("token", json.result.token)
        this.setState({
          user: {id:json.result._id,name:json?.result?.profile?.name},
          error: "",
          waiting: false,
        });
      }else{
        this.setState({
          user:null,
          error: json.error.data?.issues[0].message || json.error.message,
          waiting: false,
        });
      }

    } catch (e) {
      this.setState({
        user:null,
        error: e.data?.issues[0].message || e.message,
        waiting: false,
      });
    }
  }

  async logout() {
    const token = localStorage.getItem('token')
    this.setState({
      user: null,
      error: "",
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      const json = await response.json();
      localStorage.removeItem("token")

      if (json.result) {
        this.setState({
          user: null,
          error: "",
          waiting: false,
        })
      }
    } catch (e) {
      this.setState({
        user: null,
        error: "",
        waiting: false,
      });
    }
  }

  async refreshUser() {
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
          user: {id:json.result._id,name:json.result.profile.name},
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

export default UserState;
