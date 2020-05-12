import React, { Component } from "react";

export default class Transaction extends Component {
    render() {
        return (
            <div className="financial__form__container">
                <div className="financial__form_wrapper">
                    <div className="financial__title">
                        <h2>Nova transação</h2>
                    </div>
                    <div className="financial__form">
                        <form onSubmit={this.props.addItem}>
                            <div className="financial__form__row">
                                <div className="financial__form__column">
                                    <label>Tipo de transação</label>
                                    <select
                                        value={this.props.inputOption}
                                        onChange={this.props.handleChange}
                                        name="inputOption"
                                    >
                                        <option value="compra">Compra</option>
                                        <option value="venda">Venda</option>
                                    </select>
                                </div>

                                <div className="financial__form__column">
                                    <label>Nome da mercadoria</label>
                                    <input
                                        placeholder="Input"
                                        value={this.props.inputText}
                                        onChange={this.props.handleChange}
                                        name="inputText"
                                    />
                                </div>

                                <div className="financial__form__column">
                                    <label>Valor</label>
                                    <input
                                        placeholder="R$ 0,00"
                                        value={this.props.inputFormattedPrice}
                                        onChange={this.props.handleChangePrice}
                                        name="inputPrice"
                                    />
                                </div>

                                <div className="financial__form__column--submit">
                                    <input type="submit" value="Adicionar transação" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}