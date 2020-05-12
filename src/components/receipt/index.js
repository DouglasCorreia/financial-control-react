import React, { Component } from "react";

export default class Receipt extends Component {
    render() {
        return (
            <div className="financial__receipt__container">
                <div className="financial__receipt__wrapper">
                    <div className="receipt__title">
                        <h2>Extrato de transações</h2>
                    </div>

                    <div className="receipt__content">
                        <div className="content__row">
                            <div className="content__column">
                                <span className="content__title">Mercadoria</span>
                            </div>
                            <div className="content__column">
                                <span className="content__title text-right">Valor</span>
                            </div>
                        </div>

                        {this.props.recipe.map((item) => (
                            <div key={item.id} className="content__row">
                                <div className="content__column">
                                    <h3 className="content__title">
                                        {(item.option === "compra") ? <span>-</span> : <span>+</span>}
                                        {item.text}
                                    </h3>
                                </div>
                                <div className="content__column">
                                    <span className="content__title text-right">{item.price.formatted}</span>
                                </div>
                            </div>
                        ))}

                        <div className="content__row--total">
                            <div className="content__column">
                                <span className="content__title">Total</span>
                            </div>
                            <div className="content__column">
                                <span className="content__title text-right">R$ {this.props.profit.formatted}</span>
                            </div>
                        </div>


                        <div className="content__row">
                            <div className="content__column--profit">
                                {(this.props.profit.absolute < 0) && <span className="red">[Prejuízo]</span>}
                                {(this.props.profit.absolute > 0) && <span className="green">[Lucro]</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}