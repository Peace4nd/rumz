import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { IInput } from "..";
import { Measurement } from "../../../styles";
import Typography from "../../typography";
import styles from "../styles";

interface IInputDateState {
	visible: boolean;
	value: Date;
}

/**
 * Dostupne vlastnosti
 */
export type IInputDate = IInput<Date>;

/**
 * Textovy vstup
 *
 * @param {IInputDate} props Vlastnosti
 * @returns {JSX.Element} Element
 */
export default class InputDate extends React.PureComponent<IInputDate, IInputDateState> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputDate = {
		highlight: false,
		icon: faCalendarAlt,
		onChange: null,
		placeholder: null,
		validator: null,
		value: null
	};

	/**
	 * Vychozi stav
	 */
	public state: IInputDateState = {
		value: this.props.value,
		visible: false
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { highlight, icon, placeholder } = this.props;
		const { value, visible } = this.state;
		// sestaveni a vraceni
		return (
			<TouchableWithoutFeedback onPress={this.handleOpen}>
				<View style={[styles.wrapperBasic, highlight ? styles.wrapperHighlight : null]}>
					<FontAwesomeIcon style={styles.iconBasic} icon={icon} size={Measurement.Icon} />
					<Typography type="Body2" style={[styles.fieldBasic, value ? null : styles.fieldPlaceholder]}>
						{value ? moment(value).format("DD. MM. YYYY") : placeholder}
					</Typography>
					{visible && <DateTimePicker value={value || new Date()} mode="date" display="calendar" onChange={this.handleChange} />}
				</View>
			</TouchableWithoutFeedback>
		);
	}

	/**
	 * Zmena datumu
	 *
	 * @param {Event} evt Udalost
	 * @param {Date} date Vybrane datum
	 */
	private handleChange = (evt: Event, date: Date): void => {
		this.setState(
			{
				value: date,
				visible: false
			},
			() => {
				this.props.onChange(date, { filled: true, valid: true });
			}
		);
	};

	/**
	 * Otevreni vyberu data
	 */
	private handleOpen = (): void => {
		this.setState({
			visible: true
		});
	};
}
