import styled from "styled-components";


export const PageNotFoundBox = styled.div`
    position: relative;
    max-width: 200%;
    height: calc(100vh - 310px);
    background: transparent url('http://assets.iceable.com/img/noise-transparent.png') repeat 0 0;
    background-repeat: repeat;
    animation: bg-animation .5s infinite;
    opacity: .8;
    visibility: visible;

    @keyframes bg-animation {
        0% { transform: translate(0,0) }
        10% { transform: translate(-5%,-5%) }
        20% { transform: translate(-10%,5%) }
        30% { transform: translate(5%,-10%) }
        40% { transform: translate(-5%,15%) }
        50% { transform: translate(-10%,5%) }
        60% { transform: translate(15%,0) }
        70% { transform: translate(0,10%) }
        80% { transform: translate(-15%,0) }
        90% { transform: translate(10%,5%) }
        100% { transform: translate(5%,0) }
    }
`

export const PageNotFoundContent = styled.div`
    position: fixed;
    height: unset;
    width: 100%;

    h5 {
    color: transparent;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 4em;
    text-align: center;
    position: relative;
    left: 50%;
    top: 35%;
    margin-left: -100%;

    animation: horror-animation 5s infinite;

        @media (max-width: 375px) {
            font-size: 3em;
        }
    }

    span {
        font-size: 0.4em;

        @media (max-width: 375px) {
            font-size: 0.3em;
        }
    }

    a {
        font-size: ${(props) => props.theme.dark.textL};
        text-transform: none;

        &:hover {
            color: transparent;
            text-shadow: 0 0 5px ${(props) => props.theme.dark.colorRED};
        }

        @media (max-width: 375px) {
            font-size: ${(props) => props.theme.dark.textXS};
        }
    }

    @keyframes horror-animation {
        0% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
            left: 51%;
        }
        5% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
            left: 50%;
        }
        10% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            left: 49%;
        }
        15% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
            left: 50%;
        }
        16% {
            text-shadow: 0 0 5px #212121;
            left: 50%;
        }
        17% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
            left: 50%;
        }
        20% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            left: 49%;
        }
        25% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
            left: 49%;
        }
        30% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
            left: 50%;
        }
        35% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
            left: 50%;
        }
        36% {
            text-shadow: 0 0 5px #212121;
            left: 50%;
        }
        37% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
            left: 50%;
        }
        40% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.9);
            left: 51%;
        }
        45% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
            left: 51%;
        }
        50% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
            left: 51%;
        }
        55% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
            left: 50%;
        }
        56% {
            text-shadow: 0 0 5px #212121;
            left: 50%;
        }
        57% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
            left: 52%;
        }
        60% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            left: 50%;
        }
        65% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
            left: 50%;
        }
        70% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            left: 49%;
        }
        75% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
            left: 49%;
        }
        76% {
            text-shadow: 0 0 5px #212121;
            left: 50%;
        }
        77% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
            left: 49%;
        }
        80% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
            left: 49%;
        }
        85% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
            left: 51%;
        }
        86% {
            text-shadow: 0 0 5px #212121;
            left: 50%;
        }
        87% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
            left: 51%;
        }
        90% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
            left: 51%;
        }
        95% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
            left: 51%;
        }
        100% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            left: 50%;
        }
    }

`
