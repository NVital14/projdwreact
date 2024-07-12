import AppBar from "./components/AppBar";
import { HashRouter, Route, Routes } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import HomePage from "./pages/HomePage";
import './FontAwesome';
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import { getCurrentUser, isAuthenticated, isAdmin } from "./API/api";
import MyReviewsPage from "./pages/MyReviewsPage";

export const ROUTES = {
  LOG_IN: '/log-in',
  REGISTER: '/register',
  HOME: '/home',
  MYREVIEWS: '/myreviews'
}

var contextInterface = {
  context: { isAuthenticated: false, user: {}, isAdmin: false },
  setContext: () => { }
}

export const AppContext = createContext({ ...contextInterface });


function App() {
  const [ctx, setCtx] = useState({ ...contextInterface.context });

  const inic = async () => {
    try {
      let auth = "";
      if (!ctx.isAuthenticated) {

        auth = await isAuthenticated();
        setCtx((prevState) => ({ ...prevState, isAuthenticated: auth }));
        console.log(auth);
      }
      if (auth == true || ctx.isAuthenticated == true) {
        //se o utilizador estiver autenticado, vai buscar os seus dados
        try {
          const user = await getCurrentUser();
          setCtx((prevState) => ({ ...prevState, user: user }));
          console.log(auth);
          console.log(user);

        } catch (error) {
          console.error('Erro ao obter o utilizador:', error);
        }
        //se o utilizador estiver autenticado, verifica se é admin
        try {
          const admin = await isAdmin();
          setCtx((prevState) => ({ ...prevState, isAdmin: admin }));
          console.log(admin);
        } catch (error) {
          console.error('Erro ao obter o utilizador:', error);
        }
      }
      else {
        setCtx((prevState) => ({ ...prevState, user: {} }));
        setCtx((prevState) => ({ ...prevState, isAdmin: false }));
      }
    } catch (error) {
      console.error('Erro ao saber se o utlizador está autenticado:', error);
    }

  }
  useEffect(() => {
    inic();
  }, []);

  // useEffect que depende do ctx
  useEffect(() => {

    inic();


  }, [ctx.isAuthenticated]);
  return (
    <div>


      <HashRouter>
        <AppContext.Provider value={{ context: ctx, setContext: setCtx }} >
          <AppBar />
          <Routes>
            {console.log('O contexto foi atualizado', ctx)}
            <Route path='/' element={<HomePage />} />
            <Route key={ROUTES.HOME} path={ROUTES.HOME} element={<HomePage />} />
            <Route key={ROUTES.LOG_IN} path={ROUTES.LOG_IN} element={<LogInPage />} />
            <Route key={ROUTES.REGISTER} path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route key={ROUTES.MYREVIEWS} path={ROUTES.MYREVIEWS} element={<MyReviewsPage />} />
            {/* <Route key={ROUTES.FAVORITES} path={ROUTES.FAVORITES} element={<FavoritesScreen />} />
        <Route key={ROUTES.CRUD} path={ROUTES.CRUD} element={<CRUDScreen />} /> */}

          </Routes>
        </AppContext.Provider>
      </HashRouter>
    </div>


  );
}

export default App;
