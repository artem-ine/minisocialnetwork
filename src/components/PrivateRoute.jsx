const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);
