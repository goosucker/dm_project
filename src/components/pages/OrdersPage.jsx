import axios from "axios";
import { BASED_URL } from "../../BASED_URL";
import { useState, useEffect } from "react";
import { css } from "@emotion/css";
import ReactPaginate from 'react-paginate';
import ArrowLeft from '../../assets/arrow_left.svg';
import ArrowRight from '../../assets/arrow_right.svg';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/cartSlice";

const loaderTextStyle = css`
    @media screen and (min-width: 500px) {
        font-size: 10vh;
    }
    @media screen and (max-width: 499px) {
        font-size: 5vh;
    }
`
const loaderStyle = css`
    @media screen and (min-width: 500px) {
        width: 200px;
        height: 200px;
        border: 5px solid;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }
    @media screen and (max-width: 499px) {
        width: 100px;
        height: 100px;
        border: 5px solid;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }
`
const mainStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const listStyle = css`
    @media screen and (min-width: 500px) {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 0;
        margin: 24px 0 24px 0;
        height: 952px;
        width: 65%;
        list-style: none;
    }
    @media screen and (max-width: 499px) {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 0;
        margin: 24px 0 24px 0;
        width: 100%;
        list-style: none;
    }
`
const orderNumContainerStyle = css`
    display: flex;
    flex-direction: column;
    gap: 4px;
`
const orderNameStyle = css`
    @media screen and (min-width: 500px) {
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
        text-align: left;    
        color: #808080;
    }
    @media screen and (max-width: 499px) {
        font-size: 25px;
        font-weight: 700;
        line-height: 20px;
        text-align: center;
        color: #808080;
    }

`
const orderNumStyle = css`
    @media screen and (min-width: 500px) {
        font-weight: 700;
        line-height: 24px;
        font-size: 20px;
    }
    @media screen and (max-width: 499px) {
        font-weight: 700;
        line-height: 24px;
        font-size: 30px;
        text-align: center;
    }
`
const orderStyle = css`
    @media screen and (min-width: 500px) {
        margin: 24px;
        display: flex;
    }
    @media screen and (max-width: 499px) {
        margin: 24px;
        display: flex;
        flex-direction: column;
    }
`
const pictureContainerStyle = css`
    @media screen and (min-width: 500px) {
        width: 60%; 
        display: flex;
        margin: 0 0 0 16px;
        gap: 8px;
        overflow-x: auto;
        height: 100%;
    }
    @media screen and (max-width: 499px) {
        width: 90%; 
        display: flex;
        margin: 0 0 0 16px;
        gap: 8px;
        overflow-x: auto;
        height: 100%;
    }
`
const picStyle = css`
    @media screen and (min-width: 500px) {
        height: 48px;
        width: 48px;
    }
    @media screen and (max-width: 499px) {
        height: 100px;
    }
`
const dateSumContainerStyle = css`
    @media screen and (min-width: 500px) {
        flex-direction: column;
        justify-content: space-between;
        width: 40%;
        align-items: flex-end;
        display: flex;
    }
    @media screen and (max0width: 499px) {
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        align-items: flex-end;
        display: flex;
    }
`
const dateTextStyle = css`
    @media screen and (min-width: 500px) {
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
        text-align: left;
        gap: 8px;
        align-items: center;
        display: flex;
        &:last-child {
            margin-left: 21px;
        }
    }
    @media screen and (max-width: 499px) {
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
        line-height: 20px;
        text-align: left;
        gap: 20px;
        align-items: center;
        display: flex;
        &:last-child {
            margin-left: 21px;
        }
    }
`
const paginationStyle = css`
    display: flex;
    gap: 8px;
    list-style-type: none;
    align-items: center;
    padding: 0;
    margin: 24px 0 0 0;
`
const btnStyle = css`
    color: #0073E6;
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &.selected {
        border-radius: 12px;
        background-color: #0073E6;
        color: #FFFFFF;
    }
`
const repeatOrderStyle = css`
    @media screen and (min-width: 500px) {
        background-color: #0073E6;
        color: #FFFF;
        margin-left: 10px;
        border-radius: 12px;
        cursor: pointer;
        border: none;
    }
    @media screen and (max-width: 499px) {
        background-color: #0073E6;
        color: #FFFF;
        margin-left: 10px;
        border-radius: 12px;
        cursor: pointer;
        border: none;
        height: 50px;
        font-size: 20px;
        margin-top: 10px;
    }
`

export const OrdersPage = () => { 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(1);
    const [howManyPages, setHowManyPages] = useState(1);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getOrders = async () => {
        setLoading(true); 
        try {
            const res = await axios.get(BASED_URL + `/orders?limit=8&page=${pageCount}`, {
                withCredentials: true
            });
            setData(res.data.data);
            setHowManyPages(res.data.meta.total);
            setLoading(false); 
            console.log(res.data.data)
        } catch (error) {
            console.error(error);
            setLoading(false); 
        }
    }

    useEffect(() => {
        getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageCount]);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    };
    const onPageChange = (pageNumber) => {
        setPageCount(pageNumber.selected + 1);
    };
    const handleRepeatBtnClick = (order) => {
        order.forEach((product) => {
            dispatch(addProduct({
                id: product.product.id,
                title: product.product.title,
                picture: product.product.picture,
                price: product.product.price,
                count: product.quantity
            }))
        })
    } 

    if (loading) {
        return (
            <main className={mainStyle}>
                <p className={loaderTextStyle}>loading...</p>
                <span className={loaderStyle}></span>
            </main>
        )
    } else if (data.length === 0) {
        return (
            <main className={mainStyle}>
                <h1>У вас нет заказов!</h1>
                <h2>Самое время это исправить</h2>
            </main>
        )
    } else {
        return (
            <main className={mainStyle}>
                <ul className={listStyle}>
                    {data.map((order, key) => {
                        const totalAmount = order.reduce((sum, product) => {
                            return sum + product.product.price;
                        }, 0);
                        const orderNumber = (pageCount - 1) * 8 + key + 1;

                        return (
                            <li key={key} className={orderStyle}>
                                <div className={orderNumContainerStyle}>
                                    <span className={orderNameStyle}>Заказ</span>
                                    <span className={orderNumStyle}>№{orderNumber}</span>
                                </div>
                                <div className={pictureContainerStyle}>
                                    {order.map((product, key) => {
                                        return (
                                            <img 
                                                key={key} 
                                                src={product.product.picture} 
                                                className={picStyle}
                                                style={{cursor: "pointer"}}
                                                alt={product.product.title}
                                                onClick={() => navigate(`/product-card/${product.product.id}`)}
                                            />
                                        )
                                    })}
                                </div>
                                <div className={dateSumContainerStyle}>
                                    <p className={dateTextStyle}>
                                        <span style={{color: "#808080"}}>Оформлено</span>
                                        {formatDate(order[0].createdAt)} 
                                    </p>
                                    <p className={dateTextStyle}>
                                        <span style={{color: "#808080"}}>На сумму</span>
                                        {totalAmount} ₽
                                    </p>
                                </div>
                                <button className={repeatOrderStyle} onClick={() => handleRepeatBtnClick(order)}>Повторить заказ</button>
                            </li>
                        )
                    })}
                </ul>
                {Math.ceil(howManyPages / 8) <= 1 
                ?
                    null
                :
                    <ReactPaginate 
                        pageCount={Math.ceil(howManyPages / 8) || 1}
                        pageRangeDisplayed={0}
                        marginPagesDisplayed={2}
                        className={paginationStyle}
                        previousLabel={<img src={ArrowLeft} style={{cursor: "pointer"}} alt="стрелка влево"/>}
                        nextLabel={<img src={ArrowRight} style={{cursor: "pointer"}} alt="стрелка вправо"/>}
                        breakLabel={<p style={{color: "#0073E6"}}>...</p>}
                        pageClassName={btnStyle}
                        onPageChange={onPageChange}
                        forcePage={pageCount - 1}
                    />
                }
            </main>
        )
    }
}
