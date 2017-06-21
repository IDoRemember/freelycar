'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import Login from './components/Login.jsx';
import Page from './components/Page.jsx';
import IndexPage from './components/IndexPage.jsx'
//consumption
import OrderManage from './components/consumption/OrderManage.jsx';
import BeautyOrder from './components/consumption/BeautyOrder.jsx'
import CostClose from './components/consumption/CostClose.jsx';
import FixOrder from './components/consumption/FixOrder.jsx';
import OrderDetail from './components/consumption/OrderDetail.jsx';
//income
import IncomeSearch from './components/income/IncomeSearch.jsx';
import IncomeDetail from './components/income/IncomeDetail.jsx';
import PayDetail from './components/income/PayDetail.jsx';
import OtherPay from './components/income/OtherPay.jsx';
import HistoryIncomeDetail from './components/income/HistoryIncomeDetail.jsx';
import HistoricalAccount from './components/income/HistoricalAccount.jsx';
import HistoryOutcomeDetail from './components/income/HistoryOutcomeDetail.jsx';
//member
import ClientInfo from './components/member/ClientInfo.jsx'
import ClientDetail from './components/member/ClientDetail.jsx'
import PayHistory from './components/member/PayHistory.jsx'
import AddClient from './components/member/AddClient.jsx'
import BuyCard from './components/member/BuyCard.jsx'

//product
import ItemManage from './components/productManage/ItemManage.jsx';
import PartsManage from './components/productManage/PartsManage.jsx';
import CardManage from './components/productManage/CardManage.jsx';
//buy
import ProviderManage from './components/buySellStock/ProviderManage.jsx';
import ProductSearch from './components/buySellStock/ProductSearch.jsx';
import ReceiptDetail from './components/buySellStock/ReceiptDetail.jsx';
import PutInStorage from './components/buySellStock/PutInStorage.jsx';
import SellProduct from './components/buySellStock/SellProduct.jsx';
import ProductReceipts from './components/buySellStock/ProductReceipts.jsx';
import BusinessSummary from './components/dataTable/BusinessSummary.jsx';
//system
import StaffManage from './components/systemSetting/StaffManage.jsx';
import AccountManage from './components/systemSetting/AccountManage.jsx';


const routes = < Route path={"/"} components={Page} >
    <Route path={"login"} component={Login} />
    <Route path={"app"} component={App} >
        <Route path={"consumption"} >
            <Route path={"beautyorder"} component={BeautyOrder} />
            <Route path={"fixorder"} component={FixOrder} />
            <Route path={"accountingcenter"} component={CostClose} />
            <Route path={"ordermanage"} component={OrderManage} />
            <Route path={"ordermanage/:orderId"} component={OrderDetail} />
        </Route>
        <Route path={"incomeManage"} >
            <Route path={"incomeSearch"} component={IncomeSearch} />
            <Route path={"incomeSearch/income/:incomeId"} component={IncomeDetail} />
            <Route path={"incomeSearch/pay/:payId"} component = {PayDetail}/>
            <Route path={"historyAccount"} component={HistoricalAccount} />
            <Route path={"historyIncomeDetail"} component={HistoryIncomeDetail} />
            <Route path={"historyOutcomeDetail"} component={HistoryOutcomeDetail} />
            <Route path={"otherPay"} component={OtherPay} />
        </Route>
        <Route path={"member"} >
            <Route path={"memberShip"} component={BuyCard} />
            <Route path={"customer"} component={ClientInfo} />
            <Route path={"customer/:uid"} component={ClientDetail} />
            <Route path={"customer/:uid/payhistory"} component={PayHistory} />
            <Route path={"addclient"} component={AddClient}/>
        </Route>
        <Route path={"buySellStock"} >
            <Route path={"productSearch"} component={ProductSearch} />
            <Route path={"buyProduct"} component={PutInStorage} />
            <Route path={"sellProduct"} component={SellProduct} />
            <Route path={"productReceipts"} component={ProductReceipts} />
            <Route path={"providerManage"} component={ProviderManage} />
            <Route path={"productReceipts/:receiptId"} component={ReceiptDetail}/>
        </Route>
        <Route path={"productManage"} >
            <Route path={"itemManage"} component={ItemManage} />
            <Route path={"partsManage"} component={PartsManage} />
            <Route path={"cardManage"} component={CardManage} />
        </Route>
        <Route path={"dataTable"} >
            <Route path={"businessSummary"} component={BusinessSummary} />
        </Route>
        <Route path={"systemSet"} >
            <Route path={"staffManage"} component={StaffManage} />
            <Route path={"accountManage"} component={AccountManage} />
        </Route>
        <Route path="/dashboard/index" component={IndexPage} />
    </Route>
</Route>

ReactDom.render((
    <Router history={hashHistory} >
        {routes}
    </Router>),
    document.getElementById('app')
);