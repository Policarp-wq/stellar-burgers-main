import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { useDispatch } from '../../services/store';
import { fetchUser } from '../../services/slices/user-slice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(fetchIngredients());
    dispatch(fetchUser());
  }, [])
  const handleModalClose = () => {
    navigate(-1);
    // dispatch(closeOrderModalData());
  };
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />

        <Route path='/*' element={<NotFound404 />} />

        <Route
          path='/feed/:number'
          element={
            <Modal title='Информация о заказе' onClose={handleModalClose}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Ингредиент' onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders:/:number'
          element={
            <Modal title='Ингредиент' onClose={handleModalClose}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

const ProtectedRoute = ({
  children,
  anonymous = false
}: {
  children: JSX.Element;
  anonymous?: boolean;
}) => {
  const isAuthenticated = false;

  if (anonymous && isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (!anonymous && !isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default App;
