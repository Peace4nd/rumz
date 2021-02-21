import { faChevronLeft, faGlassWhiskey, faTags } from "@fortawesome/free-solid-svg-icons";
import { GoogleSigninButton } from "@react-native-community/google-signin";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { connect, DispatchProp } from "react-redux";
import { Button, Input, Route, Tags, Typography } from "../../components";
import { signResolved } from "../../redux/actions/google";
import { IReduxGoogle, IReduxStore } from "../../types/redux";
import { IStorageOptions } from "../../types/storage";
import ga, { IGoogleDriveFile } from "../../utils/google";
import storage from "../../utils/storage";
import strings from "../../utils/strings";
interface IOptionsState {
	values: IStorageOptions;
	tag: string;
	loaded: boolean;
	backupFiles: IGoogleDriveFile[];
	backupBusy: boolean;
}

interface IOptionsProps {
	google: IReduxGoogle;
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
class Options extends Route.Content<IOptionsProps & DispatchProp, IOptionsState> {
	/**
	 * Vychozi stav
	 */
	public state: IOptionsState = {
		backupBusy: false,
		backupFiles: null,
		loaded: false,
		tag: null,
		values: {
			dram: 0,
			properties: []
		}
	};

	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		Promise.all([storage.options.read(), ga.drive.list()]).then((data) => {
			this.setState({
				backupFiles: data[1],
				loaded: true,
				values: data[0]
			});
		});

		// console.log(this.props.google);

		// pridat do state ze je pihlaseno, pak nezobrazovat button pro prihlaseni ale jen nejakou statistiku zalohy
		// vymyslet jak to udelat s obrazkama

		/*
			
			storage.stringify().then((stringified) => {
				console.log("STRING", stringified);

				drive.update("185k-JFCJomVoBiCVh9PDOKOjfWazrZ4cuKqJDI6RHRr0CIuE", stringified, { name: "data.json" }).then((metadata) => {
					console.log("UPDATE", metadata);
				});
			});

			google.drive.download("185k-JFCJomVoBiCVh9PDOKOjfWazrZ4cuKqJDI6RHRr0CIuE").then((data) => {
				console.log("DOWNLOAD", data);
			});
			*/
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { dispatch, google } = this.props;
		const { backupBusy, backupFiles, loaded, values } = this.state;

		console.log(backupFiles);

		// sestaveni a vraceni
		return (
			<Route.Wrapper
				busy={!loaded}
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

				<Image source={{ uri: google.user.photo }} style={styles.googleAvatar} />
				<Typography type="Subtitle1">{google.user.name}</Typography>
				<Typography type="Subtitle2">{google.user.email}</Typography>

				<Button label="zalohovat" busy={backupBusy} onPress={this.handleBackup} />
				<Button label="obnovit" busy={backupBusy} onPress={this.handleRestore} />

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
				<Input.Number icon={faGlassWhiskey} placeholder="dram" value={values.dram} onChange={this.handleDram} />

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
				<Tags items={values.properties} onDelete={this.handleTagRemove} />
			</Route.Wrapper>
		);
	}

	private handleRestore = (): void => {
		this.setState(
			{
				backupBusy: true
			},
			() => {
				const records = this.state.backupFiles.find((file) => file.name === "data.json");

				ga.drive.download(records.id).then((data) => {
					this.setState(
						{
							backupBusy: false
						},
						() => {
							const ccc = JSON.parse(data);

							console.log(ccc);
						}
					);
				});
			}
		);
	};

	private handleBackup = (): void => {
		this.setState(
			{
				backupBusy: true
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
								backupBusy: false,
								backupFiles: files
							});
						});
					} else {
						ga.drive.create({ name: "data.json" }, stringified).then((file) => {
							// aktualizace stavu
							this.setState({
								backupBusy: false,
								backupFiles: [...this.state.backupFiles, file]
							});
						});
					}
				});
			}
		);
	};

	private handleDram = (value: number): void => {
		this.setState(
			{
				values: {
					...this.state.values,
					dram: value
				}
			},
			() => {
				storage.options.update({ dram: this.state.values.dram });
			}
		);
	};

	private handleTagChange = (value: string): void => {
		this.setState({
			tag: value
		});
	};

	private handleTagAdd = (): void => {
		this.setState(
			{
				values: {
					...this.state.values,
					properties: [...this.state.values.properties, this.state.tag]
				}
			},
			() => {
				storage.options.update({ properties: this.state.values.properties });
			}
		);
	};

	private handleTagRemove = (value: string): void => {
		const current = this.state.values.properties.slice(0);
		const index = current.findIndex((item) => value === item);
		current.splice(index, 1);

		this.setState(
			{
				values: {
					...this.state.values,
					properties: current
				}
			},
			() => {
				storage.options.update({ properties: this.state.values.properties });
			}
		);
	};
}

export default connect((store: IReduxStore) => ({
	google: store.google
}))(Options);
