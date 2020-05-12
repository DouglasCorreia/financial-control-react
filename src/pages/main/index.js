import React, { Component } from "react";

import Transaction from '../../components/transaction';
import Receipt from '../../components/receipt';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: [],
            inputText: "",
            inputPrice: "",
            inputFormattedPrice: "",
            inputOption: "compra",
            profit: {
                formatted: "",
                absolute: "",
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.addItem = this.addItem.bind(this);
        this.profit = this.profit.bind(this);
    }

    // When the DOM´s changed, get the actual "state" and save on Local Storage
    componentDidUpdate() {
        localStorage.setItem("recipe", JSON.stringify(this.state.recipe));
        localStorage.setItem("profit", JSON.stringify(this.state.profit));
    }

    // When the DOM´s ready, get the "state" saved on Local Storage and show the page.
    componentDidMount() {
        const recipe = JSON.parse(localStorage.getItem("recipe")) || this.state.recipe;
        const profit = JSON.parse(localStorage.getItem("profit")) || this.state.profit;

        this.setState({
            recipe,
            profit
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleChangePrice = (event) => {
        let value = event.target.value;

        // Check if the field contains only numbers and special characters (",", ".") for the mask money. Ex. 1.000,00
        if (value.match(/^(\d|,|.)+$/)) {
            value = value + '';
            value = parseInt(value.replace(/[\D]+/g, ''));
            value = value + '';
            value = value.replace(/([0-9]{2})$/g, ",$1");

            if (value.length > 6) value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

            event.target.value = value;

            // Convert to the internacional price
            let valueFormat = value.replace(",", ".");
            // Convert to absolute number of type float. Ex. 2000
            let price = parseFloat(valueFormat.replace(/[.](?=.*[.])/g, ""));

            if (this.state.inputOption === "compra") price = -price;

            this.setState({
                inputPrice: price,
                inputFormattedPrice: value,
            });
        }
    }

    profit = () => {
        const { recipe } = this.state;

        const price = recipe.map((item) => item.price.absolute);
        const profit = price.reduce((accumulator, currentValue) => accumulator + currentValue);

        this.setState({
            profit: {
                formatted: profit.toLocaleString('pt-br', { minimumFractionDigits: 2 }),
                absolute: profit,
            }
        });
    }

    addItem = (event) => {
        event.preventDefault();

        const { inputText, inputPrice, inputOption, inputFormattedPrice } = this.state;

        if (inputText.trim().length === 0 || inputPrice.length === 0 || inputOption.trim().length === 0) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        let newItem = {
            id: Date.now(),
            text: inputText,
            price: {
                absolute: inputPrice,
                formatted: `R$ ${inputFormattedPrice}`,
            },
            option: inputOption,
        };

        this.setState((prevState) => ({
            recipe: [...prevState.recipe, newItem],
            inputText: "",
            inputPrice: "",
            inputFormattedPrice: "",
            inputOption: "compra"
        }), () => this.profit());
    }

    render() {
        const { recipe, inputOption, inputFormattedPrice, inputText, profit } = this.state;

        return (
            <div className="financial">
                <div className="financial__row">
                    <Transaction
                        addItem={this.addItem}
                        handleChange={this.handleChange}
                        handleChangePrice={this.handleChangePrice}
                        convertMoney={this.convertMoney}
                        inputOption={inputOption}
                        inputText={inputText}
                        inputFormattedPrice={inputFormattedPrice}
                    />
                    <Receipt
                        recipe={recipe}
                        profit={profit}
                    />
                </div>
            </div>
        )
    }
}