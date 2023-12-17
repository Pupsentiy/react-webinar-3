import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      token:'',
      user: null,
      error: "",
      waiting: false,
    }
  }

  setToken() {
    const token = localStorage.getItem('token')
    this.setState({
      ...this.getState(),
      token,
    })
  }

  async login(auth) {
    this.setState({
      ...this.initState(),
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
          token:json.result.token,
          user: {id:json.result._id,name:json?.result?.profile?.name},
          error: "",
          waiting: false,
        });
      }else{
        this.setState({
          ...this.getState(),
          error: json.error.data?.issues[0].message || json.error.message,
          waiting: false,
        });
      }

    } catch (e) {
      this.setState({
       ...this.initState(),
        error: e.data?.issues[0].message || e.message,
        waiting: false,
      });
    }
  }

  async logout() {
    const token = localStorage.getItem('token')
    this.setState({
     ...this.initState(),
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
          ...this.initState()
        })
      }
    } catch (e) {
      this.setState({
        ...this.initState()
      });
    }
  }

  async refreshUser(token) {
    if(!token || this.getState().waiting) return
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/self?fields=_id,profile(name)", {
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
          token:token,
          user: {id:json.result._id,name:json.result.profile.name},
          error: '',
          waiting: false,
        })
      } else {
        localStorage.removeItem("token")
        this.setState({
          ...this.initState(),
          token:'',
          error: json.error.data?.issues[0].message || json.error.message,
          waiting: false,
        })
      }
    } catch (e) {
      localStorage.removeItem("token")
      this.setState({
        ...this.initState(),
        token:'',
        error:e.data?.issues[0].message || e.message,
        waiting: false,
      });
    }
  }
}

export default UserState;
