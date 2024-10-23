
import './App.css'
import { Header } from './components/Header/Header';
import { ProductsPage } from './components/pages/ProductsPage';
import { ProductInfo } from './components/pages/ProductInfo';
import { OrdersPage } from './components/pages/OrdersPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<ProductsPage />}/>
          <Route path="/product-card/:id" element={<ProductInfo />}/>
          <Route path="/orders" element={<OrdersPage />}/>
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
