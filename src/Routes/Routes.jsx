import React from 'react';
import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Loading from "../Pages/Loading/Loading";
import Login from "../Pages/Sign/Login";
import Register from "../Pages/Sign/Register";
import Dashboard from "../Layout/Dashboard";
import AddProduct from "../Pages/Dashboard/AddProduct";
import AllProducts from "../Pages/Home/Products/AllProducts";
import MenForm from "../Pages/Forms/MenForm";
import WomanForm from "../Pages/Forms/WomanForm";
import MemberRegistration from "../Pages/MemberRegistration/MemberRegistration";
import VerifiedRoute from "./VerifiedRoute";
import Users from "../Pages/Dashboard/Users";
import UserDetails from "../Pages/Dashboard/UserDetails";
import AllMembers from "../Pages/AllMembers/AllMembers";
import Product from "../Pages/Product/Product";
import Profile from "../Pages/Product/Profile";
import Cart from "../Pages/Dashboard/Cart";
import ManageSells from "../Pages/Dashboard/ManageSells";
import MyRequests from "../Pages/Dashboard/MyRequests";
import ReceivedRequest from "../Pages/Dashboard/ReceivedRequest";
import FormSubmitted from '../Pages/Forms/FormSubmitted';
import ProposalRequest from '../Pages/Dashboard/ProposalRequest';
import Images from '../Pages/Images/Images';
import Admin from '../Pages/Dashboard/Admin';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import SentTransaction from '../Pages/SentTransaction/SentTransaction';
import ManageTransactions from '../Pages/Dashboard/ManageTransactions';
import Girl from '../Pages/Girl/Girl';
import GirlsVerified from '../Components/MemberRegistration/GirlsVerified';
import TransactionReceived from '../Pages/Transaction/TransactionReceived';
import ForgetPass from '../Pages/ForgotPass/ForgetPass';
import AllUsers from '../Pages/Dashboard/AllUsers';
import AllForms from '../Pages/Dashboard/AllForms';
import Test from '../Pages/Test';
import SentRequest from '../Pages/Dashboard/SentRequest';
import AboutAndTeam from '../Pages/AboutAndTeam/AboutAndTeam';
import UserFormEdit from '../Pages/UserFormEdit/UserFormEdit';
import Checkout from '../Pages/Checkout/Checkout';
import OrderSuccess from '../Pages/Product/OrderSuccess';
import ProductOrders from '../Pages/Dashboard/ProductOrders';
import OrderedProduct from '../Pages/Dashboard/OrderedProduct';
import AdminDetails from '../Pages/Dashboard/AdminDetails';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/products',
                element: <PrivateRoute>
                    <AllProducts />
                </PrivateRoute>

            },
            {
                path: '/product/:product_id',
                element: <PrivateRoute>
                    <Product />
                </PrivateRoute>
            },
            {
                path: '/men_form',
                element: <PrivateRoute>
                    <MenForm />
                </PrivateRoute>
            },
            {
                path: '/woman_form',
                element: <PrivateRoute>
                    <WomanForm />
                </PrivateRoute>
            },
            {
                path: '/member_registration',
                element: <MemberRegistration />
            },
            {
                path: '/form_submitted',
                element: <PrivateRoute>
                    <FormSubmitted />
                </PrivateRoute>
            },
            {
                path: '/user_details/:user_email',
                element: <PrivateRoute>
                    <UserDetails />
                </PrivateRoute>
            },
            {
                path: '/admin_details/:user_email',
                element: <PrivateRoute>
                    <AdminDetails />
                </PrivateRoute>
            },
            {
                path: '/all_members',
                element: <PrivateRoute>
                    <AllMembers />
                </PrivateRoute>
            },
            {
                path: '/cart',
                element: <PrivateRoute>
                    <Cart />
                </PrivateRoute>
            },
            {
                path: '/all_request',
                element: <PrivateRoute>
                    {/* <MyRequests /> */}
                    <SentRequest />
                </PrivateRoute>
            },
            // {
            //     path: '/sent_request',
            //     element: <PrivateRoute>
            //         <SentRequest />
            //     </PrivateRoute>
            // },
            {
                path: '/received_request',
                element: <PrivateRoute>
                    <ReceivedRequest />
                </PrivateRoute>
            },
            {
                path: '/images/:email',
                element: <PrivateRoute>
                    <Images />
                </PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            },
            {
                path: '/checkout',
                element: <PrivateRoute>
                    <Checkout />
                </PrivateRoute>
            },
            {
                path: '/order_success',
                element: <PrivateRoute>
                    <OrderSuccess />
                </PrivateRoute>
            },
            {
                path: '/sent_transaction',
                element: <SentTransaction />
            },
            {
                path: '/transaction_received',
                element: <TransactionReceived />
            },
            {
                path: '/girls_verified',
                element: <GirlsVerified />
            },
            {
                path: '/forgot-password',
                element: <ForgetPass />
            },
            {
                path: '/about_team',
                element: <AboutAndTeam />
            },
            {
                path: '/user_form/:email',
                element: <UserFormEdit />
            },
            {
                path: '/test',
                element: <Test />
            },
            {
                path: '/ordered_product/:buyerEmail',
                element: <OrderedProduct />
            },
        ],
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'register',
        element: <Register />
    },
    {
        path: 'dashboard',
        element: <AdminRoute>
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        </AdminRoute>
        ,
        children: [
            {
                index: true,
                element: <Admin />
            }
            ,
            {
                path: 'add_product',
                element: <AddProduct />
            },
            {
                path: 'users',
                element: <Users />
            },
            {
                path: 'manage_sells',
                element: <ManageSells />
            },
            {
                path: 'manage_proposals',
                element: <ProposalRequest />
            },
            {
                path: 'manage_transactions',
                element: <ManageTransactions />
            },
            {
                path: 'all_users',
                element: <AllUsers />
            },
            {
                path: 'all_forms',
                element: <AllForms />
            },
            {
                path: 'product_orders',
                element: <ProductOrders />
            },
        ]
    },
]);

export default router;







