import React, {Component} from "react";
import CryptoList from "./CryptoList";
import axios from "axios";
import "./Crypto.css";

class Crypto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptoList: []
        };
    }

    componentDidMount() {
        // this.getCryptoData()// czy tu mam to miec czy nie
        this.interval = setInterval (
            () => {this.getCryptoData()},
            5000
        );
    }

    componentDidUpdate() {
        ("did update")
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getCryptoData = () => {
        axios.get("https://blockchain.info/ticker")
            .then(res => {
                const tickers = res.data;


                this.setState((state) => {
                    let newList = [];

                    for (const [ticker, rate] of Object.entries(tickers)) {

                        let lastCryptoObj = state.cryptoList.find((cryptoObj) => {
                            return (cryptoObj.currency === ticker)
                        });

                        let newCryptoObj = {
                            currency: ticker,
                            symbol: rate.symbol,
                            buy: rate.buy,
                            sell: rate.sell,
                            lastRate: rate.last
                        }

                        if (lastCryptoObj !== undefined) {
                            if (newCryptoObj.lastRate > lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = "green";
                                newCryptoObj.htmlArray = String.fromCharCode(8593);
                            } else if (newCryptoObj.lastRate === lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = "blue";
                                newCryptoObj.htmlArray = String.fromCharCode(8596);
                            } else if (newCryptoObj.lastRate < lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = "red";
                                newCryptoObj.htmlArray = String.fromCharCode(8595);
                            }
                        } else {
                            newCryptoObj.cssClass = "blue";
                            newCryptoObj.htmlArray = String.fromCharCode(8596);
                        }

                        newList.push(newCryptoObj);
                    }

                    console.log(newList)

                    return ({
                        cryptoList: newList
                        
                    })
                })
                
            })
    }

    render() {
        return (
            <div className="Crypto">
                <CryptoList cryptoList={this.state.cryptoList}/>
            </div>

        );        
    }
}

export default Crypto;