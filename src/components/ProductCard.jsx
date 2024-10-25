/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
import { StarsComp } from './StarsComp';
import { useNavigate } from 'react-router-dom';

const cardStyle = css`
    border-radius: 16px;
    background-color: #FFFFFF;
    width: 250px;
    box-sizing: border-box;
    height: 358px;
    cursor: pointer;
`
const imgStyle = css`
   width: 100%;
   border-top-left-radius: 16px;
   border-top-right-radius: 16px;
   border: 2px solid #FFFFFF;
   margin-bottom: 12px;
   height: 254px;
   box-sizing: border-box;
   overflow: hidden;
`
const priceStyle = css`
    line-height: 24px;
    font-size: 22px;
    font-weight: 800;
    margin-top: 16px;
`
const titleStyle = css`
    margin-bottom: 4px;
    height: 44px;
    overflow: clip;
`

export const ProductCard = ({imgSrc, name, rate, price, id, currentPage}) => {
    const navigate = useNavigate();
    
    const handleBtnClick = () => {
        navigate(`/product-card/${id}`, { state: {currentPage} });
    };

    return (
        <div 
            className={cardStyle} 
            onClick={handleBtnClick}
        >
            <img 
                src={imgSrc} 
                className={imgStyle} 
            />
            <p className={titleStyle}>{name}</p>
            <StarsComp rate={rate} />
            <p className={priceStyle}>{price} ₽</p>
        </div>
    )
}