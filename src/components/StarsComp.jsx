/* eslint-disable react/prop-types */
import EmptyStar from '../assets/empty_star.svg';
import HalfEmptyStar from '../assets/half-empty-star.svg';
import Star from '../assets/star.svg';
import { css } from '@emotion/css';

const starsStyle = css`
    display: flex;
    gap: 4px;
`

export const StarsComp = ({rate}) => {
    if (rate < 0.5) {
        return (
            <div className={starsStyle}>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
            </div>
        )
    } else if (rate >= 0.5 & rate < 1) {
        return (
            <div className={starsStyle}>
                <img src={HalfEmptyStar} alt="полупустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
            </div> 
        )
    } else if (rate >= 1 & rate < 1.5) {
        return (
            <div className={starsStyle}>
                <img src={Star} alt="звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
            </div> 
        )
    } else if (rate >= 1.5 & rate < 2) {
        return (
            <div className={starsStyle}>
                <img src={Star} alt="звезда"/>
                <img src={HalfEmptyStar} alt="полупустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
            </div> 
        )
    } else if (rate >= 2 & rate < 2.5) {
        return (
            <div className={starsStyle}>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
            </div> 
        )
    } else if (rate >= 2.5 & rate < 3) {
        return (
            <div className={starsStyle}>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={HalfEmptyStar} alt="полупустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
            </div> 
        )
    } else if (rate >= 3 & rate < 3.5) {
        return (
            <div className={starsStyle}>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
            </div> 
        )
    } else if (rate >= 3.5 & rate < 4) {
        return (
            <div className={starsStyle}>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={HalfEmptyStar} alt="полупустая звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
            </div> 
        )
    } else if (rate >= 4 & rate < 4.5) {
        return (
            <div className={starsStyle}>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={EmptyStar} alt="пустая звезда"/>
            </div> 
        )
    } else if (rate >= 4.5 & rate < 5) {
        return (
            <div className={starsStyle}>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="пустая звезда"/>
                <img src={HalfEmptyStar} alt="полупустая звезда"/>
            </div> 
        )
    } else if (rate >= 4.5) {
        return (
            <div className={starsStyle}>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
                <img src={Star} alt="звезда"/>
            </div> 
        )
    }
}