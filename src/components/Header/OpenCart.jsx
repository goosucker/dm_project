import { css } from "@emotion/css";
import { useSelector, useDispatch } from "react-redux";
import { incrementCount, decrementCount, removeAllProducts, toggleCart } from "../../store/cartSlice";
import { axiosInstance } from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

const cartStyle = css`
    @media screen and (min-width: 500px) {
        border-radius: 24px;
        padding: 16px 24px 24px 25px;
        width: 560px;
        box-sizing: border-box;
        position: absolute;
        right: 0;
        top: 0;
        background-color: #FFFF;
        margin: 0;
        list-style: none;
        z-index: 100;
        box-shadow: 0px 16px 40px 0px #17202952;
    }
    @media screen and (max-width: 499px) {
        border-radius: 24px;
        padding: 16px 24px 24px 25px;
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        right: 0;
        top: 0;
        background-color: #FFFF;
        margin: 0;
        list-style: none;
        z-index: 100;
        box-shadow: 0px 16px 40px 0px #17202952;
    }
`;

const productStyle = css`
    display: flex;
    gap: 16px;
    height: 82px;
    align-items: center;
`;

const productTitleStyle = css`
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    width: 144px;
    overflow: hidden;
    height: 2.2em;
`;

const counterStyle = css`
    display: flex;
    width: 156px;
    justify-content: space-evenly;
    align-items: center;
`;

const countBtnStyle = css`
    width: 100%;
    height: 100%;
    border: none;
    background-color: #FFFF;
    color: #0073E6;
    font-size: 25px;
    font-weight: 600;
    cursor: pointer;
    box-sizing: border-box;
`;

const countStyle = css`
    font-size: 16px;
    font-weight: 700;
`;

const priceStyle = css`
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    width: 112px;
    text-align: end;
`;
const onePriceStyle = css`
    color: #808080;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    width: 112px;
    text-align: end;
`
const emptyCartTextStyle = css`
    text-align: center;
    font-size: 20px;
    font-weight: 800;
`
const finalPriceStyle = css`
    display: flex;
    justify-content: space-between;
`
const finalTextStyle = css`
    font-size: 20px;
    font-weight: 700;
    margin-top: 22px
`
const finalPriceTextStyle = css`
    font-size: 28px;
    font-weight: 800;
    line-height: 32px;
    margin-top: 16px;
`
const placeAnOrderBtnStyle = css`
    width: 100%;
    background-color: #0073E6;
    height: 52px;
    margin-top: 16px;
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
`
const closeBtnStyle = css`
    background-color: #0073E6;
    margin-top: 16px;
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    padding: 5px 10px;
`

export const OpenCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartInfo = useSelector(state => state.cart.items);

    const finalPrice = cartInfo.reduce((total, product) => {
        return total + (product.price * product.count)
    }, 0);

    const handleOfferBtnClick = async () => {
        if (cartInfo.length === 0) {
            return;
        } else {
            try {
                const updateCart = await axiosInstance.post('/cart/update', {
                    "data": 
                    cartInfo.map((product) => {
                        return {
                            "id": product.id,
                            "quantity": product.count
                        }
                    })
                });
                console.log('Данные успешно отправлены: ', updateCart);

                const submitOffer = await axiosInstance.post('/cart/submit')
                console.log('Заказ оформлен:', submitOffer);
        
                dispatch(removeAllProducts());
                dispatch(toggleCart());
                navigate("/orders");
            } catch (error) {
                console.error(error)
            }
        }
    }

    if (cartInfo.length === 0) {
        return (
            <ul className={cartStyle}>
                <button className={closeBtnStyle} onClick={() => {dispatch(toggleCart())}}>Закрыть корзину</button>
                <p className={emptyCartTextStyle}>Ваша корзина пуста!<br/>Самое время это исправить</p>
            </ul>
        )
    } else {
        return (
            <ul className={cartStyle}>
                <button className={closeBtnStyle} onClick={() => {dispatch(toggleCart())}}>Закрыть корзину</button>
               {cartInfo.filter(product => product.count > 0).map((product) => {
                return (
                    <li key={product.id} className={productStyle}>
                        <img 
                            src={product.picture} 
                            height="62%" 
                            width="52px" 
                            alt={product.title}
                        />
                        <h3 className={productTitleStyle}>{product.title}</h3>
                        <div className={counterStyle}>
                            <button 
                                className={countBtnStyle}
                                onClick={() => dispatch(decrementCount(product.id))}
                            >
                                -
                            </button>
                            <p className={countStyle}>{product.count}</p>
                            <button 
                                className={countBtnStyle}
                                onClick={() => dispatch(incrementCount(product.id))}
                            >
                                +
                            </button>
                        </div>
                        <div>
                            {product.count > 1 
                            ?
                                <p className={onePriceStyle}>{product.price} ₽ за шт.</p>
                            :
                                null
                            }
                            <p className={priceStyle}>{product.price * product.count} ₽</p>
                        </div>
                    </li>
                );
               })}
               <div className={finalPriceStyle}>
                    <p className={finalTextStyle}>Итого</p>
                    <p className={finalPriceTextStyle}>{finalPrice} ₽</p>
               </div>
               <button className={placeAnOrderBtnStyle} onClick={handleOfferBtnClick}>Оформить заказ</button>
            </ul>
        );
    }  
};
