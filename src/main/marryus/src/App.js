import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom.min"
import Main from "./body/Main";
import WeddingHall from "./body/WeddingHall";
import NavBar from "./body/NavBar";
import Footer from "./footer/Footer";
import SdmBoard from "./sdm/SdmBoard";
import WeddingItem from "./weddingItem/WeddingItem";
import WeddingItemArticle from "./weddingItem/WeddingItemArticle";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import Join from "./login/Join";
import Travel from "./travel/Travel";
import MyPage from "./body/mypage/MyPage";
import ExitSite from "./body/mypage/ExitSite";
import MyAccount from "./body/mypage/MyAccount";
import MyQna from "./body/mypage/MyQna";
import MyReivew from "./body/mypage/MyReivew";
import MyWedding from "./body/mypage/MyWedding";
import MyBookList from "./body/mypage/MyBookList";
import MyOrder from "./body/mypage/MyOrder";
import MyBookmark from "./body/mypage/MyBookmark";
import MyCart from "./body/mypage/MyCart";
import UpdateUser from "./login/UpdateUser";
import SdmArticle from "./sdmArticle/SdmArticle";
import WeddingHallArticle from "./body/WeddingHallArticle";
import Cart from "./cart/Cart";
import ServiceCenter from "./serviceCenter/ServiceCenter";
import ServiceCenterCreate from "./serviceCenter/ServiceCenterCreate";
import ServiceCenterArticle from "./serviceCenter/ServiceCenterArticle";
import TravelArticle from "./travel/TravelArticle";
import TravelOnCat from "./travel/TravelOnCat";
import ScrollToTop from "./body/ScrollToTop";
import InsertWeddingHall from "./body/InsertWeddingHall";
import OauthSingUp from "./login/OauthSingUp";
import { useEffect, useState } from "react";
import axios from "axios";
import OauthUpdateUser from "./login/OauthUpdateUser";

function App() {
  return (
    <div>
      <ScrollToTop/>
      <NavBar/>
      <Switch>
        <Route path={['/','/main']} exact><Main/></Route>
        <Route path={['/sdm']}><SdmBoard/></Route>
        <Route path={['/weddingHall']}><WeddingHall/></Route>
        <Route path={['/weddingItem']}><WeddingItem/></Route>
        <Route path={['/weddingItemArticle/:id']}><WeddingItemArticle/></Route>
        <Route path={['/login']}><Login/></Route>
        <Route path={['/signup']}><SignUp/></Route>
        <Route path={['/join']}><Join/></Route>
        <Route path={['/travel']}><Travel/></Route>
        <Route path={['/exitSite']}><ExitSite/></Route>
        <Route path='/myPage' component={MyPage} />
        <Route path='/myAccount' component={MyAccount} />
        <Route path='/myQna' component={MyQna} />
        <Route path='/myReview' component={MyReivew} />
        <Route path='/myWedding' component={MyWedding} />
        <Route path='/myBookList' component={MyBookList} />
        <Route path='/myOrder' component={MyOrder} />
        <Route path='/myBookmark' component={MyBookmark} />
        <Route path='/myCart' component={MyCart} />
        <Route path='/updateUser' component={UpdateUser} />
        <Route path='/oauthUpdateUser'><OauthUpdateUser/></Route>
        <Route path={['/sdmArticle/:sdmName']}><SdmArticle/></Route>
        <Route path={['/wdArticle/:itemName']}><WeddingHallArticle/></Route>
        <Route path={['/cart']}><Cart/></Route>
        <Route path={['/serviceCenter']}><ServiceCenter/></Route>
        <Route path={['/serviceCenterCreate']}><ServiceCenterCreate/></Route>
        <Route path={['/serviceCenterArticle/:id']}><ServiceCenterArticle/></Route>
        <Route path={['/travelArticle/:place']}><TravelArticle/></Route>
        <Route path={['/travelOnCat/:place']}><TravelOnCat/></Route>
        <Route path={['/insertWeddingHall']}><InsertWeddingHall/></Route>
        <Route path={['/oauthSignup']}><OauthSingUp/></Route>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;