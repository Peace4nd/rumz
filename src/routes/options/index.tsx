import { faChevronLeft, faGlassWhiskey, faTags } from "@fortawesome/free-solid-svg-icons";
import { GoogleSigninButton } from "@react-native-community/google-signin";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { connect, DispatchProp } from "react-redux";
import { Button, Input, Route, Tags, Typography } from "../../components";
import { loadRecords } from "../../redux/actions/collection";
import { signResolved } from "../../redux/actions/google";
import { updateOptions } from "../../redux/actions/options";
import { IDataOptions } from "../../types/data";
import { IReduxGoogle, IReduxStore } from "../../types/redux";
import ga, { IGoogleDriveFile } from "../../utils/google";
import storage from "../../utils/storage";
import strings from "../../utils/strings";
interface IOptionsState {
	tag: string;
	backupFiles: IGoogleDriveFile[];
	backupWorking: boolean;
	backupDownload: boolean;
	backupUpload: boolean;
}

interface IOptionsProps extends DispatchProp {
	google: IReduxGoogle;
	options: IDataOptions;
}

/**
 * Doplnkove styly
 */
const styles = StyleSheet.create({
	googleAvatar: {
		height: 64,
		width: 64
	}
});

/**
 * Nastaveni
 */
class Options extends Route.Content<IOptionsProps, IOptionsState> {
	/**
	 * Vychozi stav
	 */
	public state: IOptionsState = {
		backupDownload: false,
		backupFiles: [],
		backupUpload: false,
		backupWorking: true,
		tag: null
	};

	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		ga.drive.list().then((files) => {
			this.setState({
				backupFiles: files,
				backupWorking: false
			});
		});
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { dispatch, google, options } = this.props;
		const { backupDownload, backupFiles, backupUpload, backupWorking } = this.state;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				busy={backupWorking}
				header={{
					actionLeft: {
						icon: faChevronLeft,
						onPress: () => this.redirect("/overview")
					},
					title: strings("optionsTitle")
				}}
			>
				{/* google */}
				<Typography type="Headline6">prihlaseni google</Typography>

				{google.signed && (
					<React.Fragment>
						<Image source={{ uri: google.user.photo }} style={styles.googleAvatar} />
						<Typography type="Subtitle1">{google.user.name}</Typography>
						<Typography type="Subtitle2">{google.user.email}</Typography>

						<Button label="zalohovat" disabled={backupWorking} busy={backupUpload} onPress={this.backupUpload} />
						<Button label="obnovit" disabled={backupWorking || backupFiles.length === 0} busy={backupDownload} onPress={this.backupDownload} />
					</React.Fragment>
				)}

				<GoogleSigninButton
					size={GoogleSigninButton.Size.Standard}
					color={GoogleSigninButton.Color.Light}
					disabled={google.signed}
					onPress={() => {
						ga.auth.signIn().then((user) => {
							dispatch(signResolved(user));
						});
					}}
				/>

				{/* velikost panaku */}
				<Typography type="Headline6">velikost frtanu</Typography>
				<Input.Number icon={faGlassWhiskey} placeholder="dram" value={options.dram} onChange={this.handleDram} />

				{/* senzoricke tagy */}
				<Typography type="Headline6">senzoricke tagy</Typography>
				<Input.Text
					icon={faTags}
					onChange={this.handleTagChange}
					onSubmit={{
						blur: false,
						handler: this.handleTagAdd,
						reset: true
					}}
				/>
				<Tags items={options.properties} onDelete={this.handleTagRemove} />
			</Route.Wrapper>
		);
	}

	private backupDownload = (): void => {
		this.setState(
			{
				backupDownload: true
			},
			() => {
				const records = this.state.backupFiles.find((file) => file.name === "data.json");

				ga.drive.download(records.id).then((data) => {
					this.setState(
						{
							backupDownload: false
						},
						() => {
							const store = JSON.parse(data) as IReduxStore;

							this.props.dispatch(loadRecords(store.collection.records));

							this.props.dispatch(updateOptions(store.options.values));
						}
					);
				});
			}
		);
	};

	private backupUpload = (): void => {
		this.setState(
			{
				backupUpload: true
			},
			() => {
				storage.stringify().then((stringified) => {
					// nalezeni zaznamu
					const recordsIndex = this.state.backupFiles.findIndex((file) => file.name === "data.json");
					const recordsData = this.state.backupFiles[recordsIndex];
					// zpracovani
					if (recordsIndex > -1) {
						ga.drive.update(recordsData, stringified).then((file) => {
							// doplneni dat
							const files = this.state.backupFiles.slice(0);
							files[recordsIndex] = file;
							// aktualizace stavu
							this.setState({
								backupFiles: files,
								backupUpload: false
							});
						});
					} else {
						ga.drive.create({ name: "data.json" }, stringified).then((file) => {
							// aktualizace stavu
							this.setState({
								backupFiles: [...this.state.backupFiles, file],
								backupUpload: false
							});
						});
					}
				});
			}
		);
	};

	private handleDram = (value: number): void => {
		this.props.dispatch(
			updateOptions({
				dram: value
			})
		);
	};

	private handleTagChange = (value: string): void => {
		this.setState({
			tag: value
		});
	};

	private handleTagAdd = (): void => {
		this.props.dispatch(
			updateOptions({
				properties: [...this.props.options.properties, this.state.tag]
			})
		);
	};

	private handleTagRemove = (value: string): void => {
		const current = this.props.options.properties.slice(0);
		const index = current.findIndex((item) => value === item);
		current.splice(index, 1);

		this.props.dispatch(
			updateOptions({
				properties: current
			})
		);
	};
}

export default connect((store: IReduxStore) => ({
	google: store.google,
	options: store.options.values
}))(Options);
