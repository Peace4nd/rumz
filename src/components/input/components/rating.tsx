import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View } from "react-native";
import { IInput } from "..";
import { Measurement } from "../../../styles";
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
	 * Aktualizace komponenty
	 *
	 * @param {IInputRating} prevProps Predchozi vlastnosti
	 */
	public componentDidUpdate(prevProps: IInputRating): void {
		if (this.props.value !== prevProps.value) {
			this.handleChange(this.props.value);
		}
	}

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
				<FontAwesomeIcon style={styles.iconBasic} icon={icon} size={Measurement.Icon} />
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
