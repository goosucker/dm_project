import { css } from '@emotion/css';
import Logo from '../../assets/Logo.svg';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { OpenCart } from './OpenCart';
import Shape from '../../assets/Shape.svg';
import { useSelector } from 'react-redux';

const headerStyle = css`
    @media screen and (min-width: 500px) {
        display: flex;
        justify-content: space-between;
        height: 48px;
        align-items: center;
        padding: 0 32px 0 32px;
    }
    @media screen and (max-width: 499px) {
        display: flex;
        justify-content: space-between;
        height: 100px;
        align-items: center;
    }

`
const linksStyle = css`
    @media screen and (min-width: 500px) {
        display: flex;
        gap: 16px;
    }
    @media screen and (max-width: 499px) {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
`
const linkStyle = css`
    @media screen and (min-width: 500px) {
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
        text-decoration: none;
        color: #172029;
        &.active {
            color: #0073E6;
            border-bottom: 3px solid #0073E6;
            border-radius: 2px;
        }
    }
    @media screen and (max-width: 499px) {
        font-size: 20px;
        font-weight: 700;
        line-height: 20px;
        text-decoration: none;
        color: #172029;
        &.active {
            color: #0073E6;
            border-bottom: 3px solid #0073E6;
            border-radius: 2px;
        }
    }
`
const btnStyle = css`
    display: flex;
    align-items: center;
    gap: 4px;
    border: none;
    background: none;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    font-family: "Nunito";
    cursor: pointer;
`

export const Header = () => {
    const [seeCart, setSeeCart] = useState(false);
    const cart = useSelector((state) => state.cart);
    const count = cart.length; 

    return (
        <header className={headerStyle}>
            <img src={Logo} alt="логотип"/>
            <div className={linksStyle}>
                <NavLink to="/" className={linkStyle}>Товары</NavLink>
                <NavLink to="/orders" className={linkStyle}>Заказы</NavLink>
            </div>
            <div>
                <button className={btnStyle} onClick={() => setSeeCart(!seeCart)}>
                    <img src={Shape} alt="иконка корзины"/> Корзина ({count})
                </button>
                {seeCart && <OpenCart closeCart={() => setSeeCart(false)} />} 
            </div>
        </header>
    );
};