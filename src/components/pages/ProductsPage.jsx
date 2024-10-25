import { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { ProductCard } from "../ProductCard"
import ReactPaginate from 'react-paginate';
import ArrowLeft from '../../assets/arrow_left.svg';
import ArrowRight from '../../assets/arrow_right.svg';
import Undo from '../../assets/Undo.svg';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../axiosInstance';

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
const inputStyle = css`
    border-radius: 10px;
    border: 2px solid #0073E6;
    padding: 5px 10px;
`
const formStyle = css`
    display: flex;
    gap: 5px;
`
const inputBtnStyle = css`
    border: none;
    background-color: #0073E6;
    color: #FFFF;
    border-radius: 5px;
    cursor: pointer;
`
const mainBtnStyle = css`
    position: absolute;
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

export const ProductsPage = () => {
    const location = useLocation();
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(location.state?.currentPage || 1);
    const [howManyPages, setHowManyPages] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [showMainBtn, setShowMainBtn] = useState(false);

    const getProducts = async () => {
        setLoading(true);
        if (inputValue.length === 0) {
            try {
                const res = await axiosInstance.get(`/products?page=${pageCount}&limit=15&sort=title%3Aasc`)
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant"
                });
                setData(res.data.data);
                setLoading(false);
                setHowManyPages(res.data.meta.total);
                setShowMainBtn(false);
                
            } catch(error) {
                console.log(error.massage);
                setLoading(false);
            }
        }
        if (inputValue.length > 0) {
            try {
                const res = await axiosInstance.get(`/products?search=${inputValue}&page=${pageCount}&limit=15&sort=title%3Aasc`)
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant"
                });
                setData(res.data.data);
                setLoading(false);
                setHowManyPages(res.data.meta.total);
                setShowMainBtn(true)
                
            } catch(error) {
                console.log(error.massage);
                setLoading(false);
            } 
        }
    }

    useEffect(() => {
        getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageCount])

    
    const onPageChange = (pageNumber) => {
        setPageCount(pageNumber.selected + 1);
    }
    const handleInputBtnClick = (e) => {
        e.preventDefault();
        getProducts();
    }
    const handleBackBtnClick = async () => {
        try {
            const res = await axiosInstance.get(`/products?page=${pageCount}&limit=15&sort=title%3Aasc`)
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });
            setData(res.data.data);
            setLoading(false);
            setHowManyPages(res.data.meta.total);
            setShowMainBtn(false);
            setInputValue('')
            
        } catch(error) {
            console.log(error.massage);
            setLoading(false);
        }
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
                {showMainBtn && <button 
                    className={mainBtnStyle} 
                    onClick={handleBackBtnClick}
                >
                    <img src={Undo}/> На главную
                </button>}
                <form className={formStyle} onSubmit={handleInputBtnClick}>
                    <input 
                        placeholder='Введите название' 
                        className={inputStyle}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" className={inputBtnStyle}>Поиск</button>
                </form>
                <h1>У вас отсутствуют заказы!</h1>
            </main>
        )
    } else {
        return (
            <main className={mainStyle}>
                {showMainBtn && <button 
                    className={mainBtnStyle} 
                    onClick={handleBackBtnClick}
                >
                    <img src={Undo}/> На главную
                </button>}
                <form className={formStyle} onSubmit={handleInputBtnClick}>
                    <input 
                        placeholder='Введите название' 
                        className={inputStyle}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" className={inputBtnStyle}>Поиск</button>
                </form>
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