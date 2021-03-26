import React, { useEffect, Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Preloader from './components/Preloader/Preloader';
import Modal from './components/Modal/Modal';
import { authOperations } from './redux/auth/';
import routesData from './routes';
import AppBar from './components/AppBar/AppBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppBar />
      <Suspense
        fallback={
          <Modal>
            <Preloader />
          </Modal>
        }
      >
        <Switch>
          {routesData.routes.map(route =>
            route.private ? (
              <PrivateRoute key={route.name} {...route} />
            ) : (
              <PublicRoute key={route.name} {...route} />
            ),
          )}
          <Redirect to={routesData.pathes.homePage} />
        </Switch>
      </Suspense>
    </>
  );
}
