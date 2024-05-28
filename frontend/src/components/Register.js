function Register() {
    return (
      <div className="container">
        <h2 className="title">Register</h2>
        <form>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="email" placeholder="Enter your email" />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="Enter your password" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary">Register</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  