import "./App.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import menuSlice from "./reduxStore/menuSlice";
import { history } from "./reduxStore/store";
import classes from "./App.scss";

import Header from "./components/common/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OAuth2RedirectHandler from "./components/user/OAuth2RedirectHandler";
import Cart from "./pages/Cart";
import SideMenu from "./components/common/SideMenu";
import Backdrop from "./components/common/Backdrop";
import Products from "./pages/product/Products";

import ReceiptList from "./components/receipt/ReceiptList";

import MyPage from "./pages/mypage/MyPage";
import MyPageInfo from "./pages/mypage/MyPageInfo";
import MyPageEdit from "./pages/mypage/MyPageEdit";
import MyReceipts from "./pages/mypage/MyReceipts";
import LikeStores from "./pages/mypage/LikeStores";

import ProductDetail from "./pages/product/ProductDetail";
import Payment from "./pages/product/Payment";

import Live from "./pages/live/Live";
import RunningLive from "./pages/live/RunningLive";
import ScheduledLive from "./pages/live/ScheduledLive";
import NotFound from "./pages/NotFound";
import MyStore from "./pages/mystore/MyStore";
import MyStoreInfo from "./pages/mystore/MyStoreInfo";
import MyStoreLive from "./pages/mystore/MyStoreLive";
import MyStoreProducts from "./pages/mystore/MyStoreProducts";
import MyStoreReceipt from "./pages/mystore/MyStoreReceipt";
import BroadCast from "./pages/BroadCast";

import Store from "./pages/store/Store";
import StoreLive from "./pages/store/StoreLive";
import StoreProducts from "./pages/store/StoreProducts";
import MyStoreCreate from "./pages/mystore/MyStoreCreate";

const App = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => {
    console.log("useSelector 확인용: state.menuSlice.isOpen");
    console.log(state.userSlice);
    console.log("userSlice확인용");
    return state.menuSlice.isOpen;
  }); // 로그인상태에 따라 화면 재렌더링(유저정보 업데이트)

  useEffect(
    () => {
      const listenBackEvent = () => {
        dispatch(menuSlice.actions.close());
      };

      const unlistenHistoryEvent = history.listen(({ action }) => {
        if (action === "POP") {
          listenBackEvent();
        }
      });

      return unlistenHistoryEvent;
    },
    [
      // effect에서 사용하는 state를 추가
    ]
  );

  return (
    <div id="app">
      <Header />
      <div>
        {menu && <Backdrop />}
        <SideMenu
          className={`${classes.sideMenu} ${
            menu ? classes.open : classes.closed
          }`}
        />
      </div>
      <Routes>
        <Route path="/receipt" element={<ReceiptList />}></Route>
        <Route path="/product-detail" element={<ProductDetail />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/store" element={<Store />}>
          <Route path="live" element={<StoreLive />}></Route>
          <Route path="products" element={<StoreProducts />}></Route>
        </Route>
        {/* 마이페이지 */}
        <Route path="/mypage" element={<MyPage />}>
          <Route path="info" element={<MyPageInfo />} />
          <Route path="edit" element={<MyPageEdit />} />
          <Route path="receipts" element={<MyReceipts />} />
          <Route path="likestores" element={<LikeStores />} />
          <Route path="" element={<Navigate replace to="info" />} />
        </Route>
        {/* 스토어페이지 렌더링용. */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/kakao" element={<OAuth2RedirectHandler />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/livestore" element={<Live />}>
          <Route path="running" element={<RunningLive />} />
          <Route path="scheduled" element={<ScheduledLive />} />
          <Route path="" element={<Navigate replace to="running" />} />
        </Route>
        <Route path="/products" element={<Products />} />
        {/* 마이스토어 생성을 안했으면 prompt 창 띄우고 마이페이지로 리다이렉션 */}
        <Route path="/mystore" element={<MyStore />}>
          <Route path="info" element={<MyStoreInfo />} />
          <Route path="live" element={<MyStoreLive />} />
          <Route path="product" element={<MyStoreProducts />} />
          <Route path="receipt" element={<MyStoreReceipt />} />
          <Route path="" element={<Navigate replace to="info" />} />
        </Route>
        <Route path="mystorecreate" element={<MyStoreCreate />} />
        <Route path="/broadcast" element={<BroadCast />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
