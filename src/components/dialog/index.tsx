import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { Header } from "..";
import { Color } from "../../styles";
import Icon from "../icon";
import Typography from "../typography";
import styles from "./styles";

/**
 * Dostupne vlastnosti
 */
export interface IDialog {
	/**
	 * Otevreno
	 */
	opened: boolean;

	/**
	 *
	 */
	onToggle: (opened: boolean) => void;

	/**
	 * Nadpis
	 */
	title?: string;

	/**
	 * Cela obrazovka
	 */
	fullscreen?: boolean;
}

/**
 * Dialogove okno
 */
export default class Dialog extends React.PureComponent<IDialog> {
	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { children, fullscreen, onToggle, opened, title } = this.props;
		// sestaveni a vraceni
		return (
			<Modal animationType="fade" transparent={true} visible={opened} onRequestClose={() => onToggle(false)}>
				{fullscreen && (
					<Header
						title={title}
						actionRight={{
							icon: faTimes,
							onPress: () => onToggle(false)
						}}
					/>
				)}
				<View style={[styles.wrapper, fullscreen ? styles.wrapperFullscreen : null]}>
					<View style={[styles.contentWrapper, fullscreen ? styles.contentWrapperFullscreen : null]}>
						{title && (
							<View style={styles.contentTitle}>
								<Typography type="Headline6">{title}</Typography>
								<TouchableOpacity onPress={() => onToggle(false)}>
									<Icon icon={faTimes} color={Color.Base} />
								</TouchableOpacity>
							</View>
						)}
						<View style={styles.contentChildren}>{children}</View>
					</View>
				</View>
			</Modal>
		);
	}
}
