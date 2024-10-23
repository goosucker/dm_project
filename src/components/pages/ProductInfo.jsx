import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { css } from "@emotion/css";
import { StarsComp } from "../StarsComp";
import Undo from "../../assets/Undo.svg";
import Arrow from "../../assets/arrow_left.svg";
import { ProductCounter } from "../ProductCounter";
import { axiosInstance } from "../../axiosInstance";
import { useDispatch } from "react-redux";
import { toggleCart } from "../../store/cartSlice";

const loaderStyle = css`
    @media screen and (min-width: 500px) {
        width: 200px;
        height: 200px;
        border: 5px solid ;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @media screen and (max-width: 499px) {
        width: 100px;
        height: 100px;
        border: 5px solid ;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`
const mainStyle = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    max-width: 792px;
`
const backBtnStyle = css`
    position: absolute;
    top: 72px;
    left: 32px;
    display: flex;
    border: none;
    background-color: #FFFF;
    align-items: center;
    font-family: "Nunito";
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    gap: 4px;
    color: #0073E6;
    cursor: pointer;
`
const infoBoxStyle = css`
    @media screen and (min-width: 500px) {
        display: flex;
        gap: 24px;
        max-width: 792px;
        margin-top: 24px;
        padding: 24px;
    }
    @media screen and (max-width: 499px) {
        display: flex;
        gap: 24px;
        margin-top: 24px;
        padding: 24px;
        flex-direction: column;
    }
`
const imgStyle = css`
    @media screen and (min-width: 500px) {
        width: 374px;
        height: 374px;
    }
    @media screen and (max-width: 499px) {
        width: 100%;
        height: 100%;
    }
`
const titleStyle = css`
    font-family: "Circe Rounded DM Web";
    font-size: 28px;
    font-weight: 700;
    line-height: 32px;
    max-height: 64px;
    margin: 0;
    overflow: hidden;
    margin-bottom: 8px;
`
const priceStyle = css`
    font-size: 28px;
    font-family: "Circe Rounded DM Web";
    font-weight: 800;
    line-height: 32px;
    max-height: 32px;
    margin-top: 16px;
`
const returnTextStyle = css`
    display: flex;
    margin-top: 16px;
    font-weight: 700;
    font-size: 16px;
    gap: 8px;
`
const returnOfferTextStyle = css`
    line-height: 20px;
    margin-top: 8px;
`
const afterReturnTextStyle = css`
    color: #808080;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    margin-top: 16px;
`
const addToCartBtnStyle = css`
    width: 100%;
    border-radius: 12px;
    background-color: #0073E6;
    height: 52px;
    border: none;
    color: #FFFF;
    font-family: "Nunito";
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    margin-top: 8px;
    cursor: pointer;
`
const offerBtnStyle = css`
    border-radius: 16px;
    background-color: #0073E6;
    color: #FFFF;
    border: none;
    width: 60%;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
`
const loaderTextStyle = css`
    @media screen and (min-width: 500px) {
        font-size: 10vh;
    }
    @media screen and (max-width: 499px) {
        font-size: 5vh;
    }
`

export const ProductInfo = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [productInfo, setProductInfo] = useState('');
    const [loading, setLoading] = useState(true);

    const cartProduct = useSelector(state => state.cart.items.find(product => product.id === id));
    const [seeProductCounter, setSeeProductCounter] = useState(!!cartProduct);

    const currentPage = location.state?.currentPage || 1;

    const handleGoBack = () => {
        navigate('/', { state: { currentPage } });  
    }
    const getProduct = async () => {
        try {
            const res = await axiosInstance.get(`/products/${id}`)
            setProductInfo(res.data);
            setLoading(false);
        } catch(error) {
            console.error(error.message);
            setLoading(false);
        }
    }
    const handleOfferBtnClick = () => {
        dispatch(toggleCart());
    }

    useEffect(() => {
        getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setSeeProductCounter(!!cartProduct);
      }, [cartProduct]);

    if (loading) {
        return (
            <main className={mainStyle}>
                <p className={loaderTextStyle}>loading...</p>
                <span className={loaderStyle}></span>
            </main>
        )
    } else if (!loading && productInfo.length === 0) {
        return (
            <main className={mainStyle}>
                <h1 style={{fontSize: "70px"}}>Ошибка 404</h1>
                <p style={{fontSize: "40px"}}>Такой товар не найден</p>
                <button className={backBtnStyle} onClick={handleGoBack}><img src={Arrow} alt="стрелочка"/> <span>Назад</span></button>
            </main>
        )
    } else {
        return (
            <main className={mainStyle}>
                <button className={backBtnStyle} onClick={handleGoBack}><img src={Arrow} alt="стрелочка"/> <span>Назад</span></button>
                <div className={infoBoxStyle}>
                    <img src={productInfo.picture} alt="изображение товара" className={imgStyle}/>
                    <div>
                        <h2 className={titleStyle}>{productInfo.title}</h2>
                        <StarsComp rate={productInfo.rating}/>
                        <p className={priceStyle}>{productInfo.price} ₽</p>
                        {seeProductCounter 
                            ? 
                            <div style={{display: "flex"}}>
                                <ProductCounter 
                                    id={id} 
                                    title={productInfo.title} 
                                    picture={productInfo.picture}
                                    price={productInfo.price}
                                    setSeeProductCounter={setSeeProductCounter} 
                                /> 
                                <button className={offerBtnStyle} onClick={handleOfferBtnClick}>Оформить заказ</button>
                            </div>
                            : 
                            <button 
                                className={addToCartBtnStyle}
                                onClick={() => {setSeeProductCounter(true)}}
                            >
                                Добавить в корзину
                            </button>
                        }
                        <p className={returnTextStyle}><img src={Undo}/> Условия возврата</p>
                        <p className={returnOfferTextStyle}>Обменять или вернуть товар надлежащего качества можно в течение 14 дней с момента покупки.</p>
                        <p className={afterReturnTextStyle}>Цены в интернет-магазине могут отличаться от розничных магазинов.</p>
                    </div>
                </div>
                <div>
                    <h3>Описание</h3>
                    <div dangerouslySetInnerHTML={{ __html: productInfo.description }} />
                </div>
            </main>
        )
    }
}
