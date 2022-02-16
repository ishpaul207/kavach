import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import BasicLayout from './layout/basic';
import Auth from './components/Auth';
//Routes
import routes from './config/routes';
import Recovery from './pages/recovery';
import Verification from './pages/verification';
import ErrorComponent from './components/ErrorsAndImage/ErrorComponent';
import { getInvitation } from './actions/profile';
import VerificationAfterRegistration from './pages/verification/after-regisration';
import KratosError from './pages/error';
function App() {
  var inAuth = window.location.pathname.includes('auth');
  const dispatch = useDispatch();
  const { orgCount } = useSelector((state) => {
    return {
      orgCount: state.organisations && state.organisations.ids ? state.organisations.ids.length : 0,
    };
  });

  const fetchInvitations = React.useCallback(() => {
    dispatch(getInvitation());
  }, [dispatch]);

  React.useEffect(() => {
    if (!inAuth) {
      fetchInvitations();
    }
  }, [fetchInvitations, orgCount, inAuth]);

  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/auth/login" component={(props) => <Auth {...props} flow={'login'} />} />
          <Route
            path="/auth/registration"
            component={(props) => <Auth {...props} flow={'registration'} />}
          />
          <Route path="/auth/recovery" component={() => <Recovery />} />
          <Route path="/auth/verification" component={() => <Verification />} />
          <Route path="/verification" component={() => <VerificationAfterRegistration />} />
          <Route path="/error" component={() => <KratosError />} />
          <BasicLayout>
            <Switch>
              {routes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    exact
                    path={route.path}
                    component={
                      orgCount !== 0
                        ? route.Component
                        : route.path === '/password' ||
                          route.path === '/profile' ||
                          route.path === '/organisation' ||
                          route.path === '/profile/invite'
                        ? route.Component
                        : () =>
                            ErrorComponent({
                              status: '500',
                              title: 'To access this page please create an organisation',
                              link: '/organisation',
                              message: 'Create Organisation',
                            })
                    }
                  />
                );
              })}
            </Switch>
          </BasicLayout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
