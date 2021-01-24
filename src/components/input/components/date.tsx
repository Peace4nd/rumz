import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React from "react";
import { Text, View } from "react-native";
import { Measurement } from "../../../styles";
import Button from "../../button";
import styles from "../styles";

interface IInputDateState {
	visible: boolean;
	value: Date;
}

/**
 * Dostupne vlastnosti
 */
export interface IInputDate {
	placeholder: string;
	value: Date;
	onChange: (value: Date) => void;
}

/**
 * Textovy vstup
 *
 * @param {IInputDate} props Vlastnosti
 * @returns {JSX.Element} Element
 */
export default class InputDate extends React.Component<IInputDate, IInputDateState> {
	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IInputDate = {
		onChange: null,
		placeholder: null,
		value: new Date()
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
		const { placeholder } = this.props;
		const { value, visible } = this.state;
		// sestaveni a vraceni
		return (
			<View style={styles.wrapperBasic}>
				<FontAwesomeIcon style={styles.iconBasic} icon={faCalendarAlt} size={Measurement.Icon} />
				<Text style={styles.fieldBasic}>{value ? moment(value).format("DD. MM. YYYY") : placeholder}</Text>
				<Button.Touchable
					icon={faCalendarAlt}
					onPress={() => {
						this.setState({
							visible: true
						});
					}}
				/>
				{visible && <DateTimePicker value={value} mode="date" display="calendar" onChange={this.handleChange} />}
			</View>
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
				this.props.onChange(date);
			}
		);
	};
}
