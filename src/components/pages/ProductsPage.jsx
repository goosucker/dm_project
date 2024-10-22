import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASED_URL } from '../../BASED_URL';
import { css } from '@emotion/css';
import { ProductCard } from "../ProductCard"
import ReactPaginate from 'react-paginate';
import ArrowLeft from '../../assets/arrow_left.svg';
import ArrowRight from '../../assets/arrow_right.svg';
import { useLocation } from 'react-router-dom';

const mainStyle = css`
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
`
const sectionStyle = css`
    display: flex;
    gap: 24px;
    box-sizing: border-box;
    flex-wrap: wrap;
    max-width: 80%;
    justify-content: center;
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
const loaderTextStyle = css`
    @media screen and (min-width: 500px) {
        font-size: 10vh;
    }
    @media screen and (max-width: 499px) {
        font-size: 5vh;
    }
`

export const ProductsPage = () => {
    const location = useLocation();
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(location.state?.currentPage || 1);
    const [howManyPages, setHowManyPages] = useState(1);

    const getProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get(BASED_URL + `/products?page=${pageCount}&limit=15&sort=title%3Aasc`, {
                withCredentials: true
            });
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });
            setData(res.data.data);
            setLoading(false);
            setHowManyPages(res.data.meta.total);
            
        } catch(error) {
            console.log(error.massage);
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageCount])

    
    const onPageChange = (pageNumber) => {
        setPageCount(pageNumber.selected + 1);
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
                <h1>У вас отсутствуют заказы!</h1>
            </main>
        )
    } else {
        return (
            <main className={mainStyle}>
                <section className={sectionStyle}>
                    {data.map((product, index) => (
                        <ProductCard
                            key={index}
                            imgSrc={product.picture}
                            name={product.title}
                            rate={product.rating}
                            price={product.price}
                            id={product.id}
                            currentPage={pageCount}
                        />
                    ))}
                </section>
                <ReactPaginate 
                    pageCount={Math.ceil(howManyPages / 15) || 1}
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
            </main>
        )
    }
}