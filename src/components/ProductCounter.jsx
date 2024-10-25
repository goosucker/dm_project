/* eslint-disable react/prop-types */
import { css } from "@emotion/css";
import { useEffect } from "react";
import { addProduct, removeProduct, incrementCount, decrementCount } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const prCounterStyle = css`
    display: flex;
    width: 158px;
    justify-content: space-evenly;
    height: 52px;
    align-items: center;
`
const btnStyle = css`
    width: 100%;
    border: none;
    background-color: #FFFF;
    font-size: 30px;
    color: #0073E6;
    cursor: pointer;
`

export const ProductCounter = ({ id, title, picture, price, setSeeProductCounter }) => {
    const dispatch = useDispatch();
    const cartProduct = useSelector(state => state.cart.items.find(product => product.id === id));
    const productCount = cartProduct ? cartProduct.count : 1;

    const addProductToCart = () => {
        dispatch(addProduct({
            id: id,
            title: title,
            picture: picture,
            price: price,
            count: productCount
        }));
    };

    const handlePlusBtnClick = () => {
        if (productCount < 10) {
            dispatch(incrementCount(id))
        }
    };

    const handleMinusBtnClick = () => {
        if (productCount > 0) {
            dispatch(decrementCount(id))
        }
    };

    useEffect(() => {
        addProductToCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productCount, dispatch]);
    useEffect(() => {
        if (productCount === 0) {
            dispatch(removeProduct({ id }));
            setSeeProductCounter(false); 
        }
    }, [productCount, id, dispatch, setSeeProductCounter]);

    return (
        <div className={prCounterStyle}>
            <button className={btnStyle} onClick={handleMinusBtnClick}>-</button>
            <p>{productCount}</p>
            <button className={btnStyle} onClick={handlePlusBtnClick}>+</button>
        </div>
    );
};
