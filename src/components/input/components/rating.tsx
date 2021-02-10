import React from "react";
import { View } from "react-native";
import { IInput } from "..";
import { Color } from "../../../styles";
import Icon from "../../icon";
import Rating from "../../rating";
import styles from "../styles";

interface IInputRatingState {
	value: number;
}

/**
 * Dostupne vlastnosti
 */
export type IInputRating = IInput<number>;

/**
 * Hodnotici vstup
 */
export default class InputRating extends React.PureComponent<IInputRating, IInputRatingState> {
	/**
	 * Vychozi stav
	 */
	public state: IInputRatingState = {
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputRating = {
		highlight: false,
		icon: null,
		onChange: null,
		placeholder: null,
		validator: null,
		value: 0
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { highlight, icon } = this.props;
		const { value } = this.state;
		// sestaveni a vraceni
		return (
			<View style={[styles.wrapperBasic, highlight ? styles.wrapperHighlight : null]}>
				<Icon style={styles.iconBasic} icon={icon} color={Color.Dark} />
				<Rating value={value} onChange={this.handleChange} />
			</View>
		);
	}

	/**
	 * Zmenova udalost
	 *
	 * @param {number} value Hodnota
	 */
	private handleChange = (value: number): void => {
		this.setState(
			{
				value
			},
			() => {
				this.props.onChange(value, { filled: true, valid: true });
			}
		);
	};
}
