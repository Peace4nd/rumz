import React from "react";
import { TouchableOpacity, View } from "react-native";
import strings from "../../../utils/strings";
import Dialog from "../../dialog";
import Typography from "../../typography";
import styles from "../styles";

interface IEditableField {
	/**
	 * Hodnota
	 */
	value?: unknown;

	/**
	 * Placeholder
	 */
	placeholder?: unknown;
}

interface IEditableState<F extends IEditableField> {
	value: F["value"];
	opened: boolean;
}

/**
 * Dostupne vlastnosti
 */
export interface IEditable<F extends IEditableField> {
	/**
	 * Popisek
	 */
	label: string;

	/**
	 * Vychozi hodnota
	 */
	value?: F["value"];

	/**
	 * Zmena hodnoty
	 */
	onChange: (value: F["value"]) => void;

	/**
	 * Vlastnosti vstupniho pole
	 */
	field?: Omit<F, "value" | "onChange" | "highlight" | "onSubmit" | "placeholder" | "returnKey" | "validator" | "unit">;

	/**
	 * Jednotka
	 */
	unit?: string;

	/**
	 * Placeholder
	 */
	placeholder?: F["placeholder"];
}

/**
 * Editacni pole
 */
export default abstract class EditableBase<F extends IEditableField> extends React.PureComponent<IEditable<F>, IEditableState<F>> {
	/**
	 * Vychozi stav
	 */
	public state: IEditableState<F> = {
		opened: false,
		value: this.props.value
	};

	/**
	 * Vychozi vlastnosti
	 */
	public static defaultProps: IEditable<IEditableField> = {
		label: null,
		onChange: null,
		value: 0
	};

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { label } = this.props;
		const { opened } = this.state;
		// sestaveni a vraceni
		return (
			<View style={styles.wrapper}>
				<TouchableOpacity onPress={this.handleToggle}>
					<Typography type="Headline6" style={styles.label}>
						{label}
					</Typography>
					{this.renderValue()}
				</TouchableOpacity>
				<Dialog
					opened={opened}
					onToggle={this.handleToggle}
					title={strings("editTitle")}
					button={{
						label: strings("editSave"),
						onPress: this.handlePress
					}}
				>
					{this.renderField()}
				</Dialog>
			</View>
		);
	}

	protected abstract renderField(): JSX.Element;

	protected abstract renderValue(): JSX.Element;

	private handleToggle = (): void => {
		this.setState({
			opened: !this.state.opened
		});
	};

	private handlePress = (): void => {
		this.setState(
			{
				opened: false
			},
			() => {
				this.props.onChange(this.state.value);
			}
		);
	};

	protected handleChange = (value: F["value"]): void => {
		this.setState({
			value
		});
	};

	protected handleSave = (value: F["value"]): void => {
		this.setState(
			{
				value
			},
			() => {
				this.props.onChange(this.state.value);
			}
		);
	};
}
