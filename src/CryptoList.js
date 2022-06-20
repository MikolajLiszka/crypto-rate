import React, { useEffect } from "react";
import "./CryptoList.css";

function CryptoList(props) {

    let cryptoList = props.cryptoList;

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("5s");
        }, 5000)
        return () => clearInterval(interval);
    })

    let liElements = cryptoList.map((cryptoObj) => {

        return(
            <li key={cryptoObj.currency}>
                <span className="Label">Last rate: </span>
                <span className={`Rate ${cryptoObj.cssClass}`}>{cryptoObj.lastRate} {cryptoObj.htmlArray}</span>
                <span className="Currency">{cryptoObj.currency} </span>
                <span className="imageCurrency">{cryptoObj.symbol}</span>
            </li>
        );
    })

    return (
        <ul>
            {liElements}
        </ul>
    );
}

export default CryptoList;