import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faChevronLeft, faFlask, faGlassCheers, faGlassWhiskey, faPalette } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { connect, DispatchProp } from "react-redux";
import { Button, ButtonGroup, Grid, Input, Route, Spacer, Tags, Typography } from "../../components";
import { signResolved } from "../../redux/actions/google";
import { updateOptions } from "../../redux/actions/options";
import { IDataOptions, IDataOptionsProperties } from "../../types/data";
import { IReduxGoogle, IReduxStore } from "../../types/redux";
import fs from "../../utils/file-system";
import ga, { IGoogleDriveFile } from "../../utils/google";
import storage from "../../utils/storage";
import strings from "../../utils/strings";

interface IOptionsState {
	tag: Record<IDataOptionsProperties, string>;
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
		tag: {
			aroma: null,
			color: null,
			taste: null
		}
	};

	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		this.loadBackupFiles();
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni props
		const { backupWorking } = this.state;
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
				scrollable={true}
			>
				{/* google ucet */}
				{this.renderGoogleSignin()}
				{/* google drive */}
				{this.renderGoogleDrive()}
				{/* velikost panaku */}
				{this.renderDram()}
				{/* senzoricke tvlastnosti */}
				{this.renderProperties()}
			</Route.Wrapper>
		);
	}

	/**
	 * Prihlaseni Google
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderGoogleSignin(): JSX.Element {
		// rozlozeni props
		const { dispatch, google } = this.props;
		// sestaveni a vraceni
		return (
			<Grid.Wrapper>
				<Grid.Title>{strings("optionsGoogleTitle")}</Grid.Title>
				{google.signed && (
					<Grid.Row>
						<Grid.Column flex={0}>
							<Image source={{ uri: google.user.photo }} style={styles.googleAvatar} />
						</Grid.Column>
						<Grid.Column vertical="center">
							<Typography type="Headline6">{google.user.name}</Typography>
							<Typography type="Body1">{google.user.email}</Typography>
						</Grid.Column>
					</Grid.Row>
				)}
				<Grid.Row>
					<Grid.Column horizontal="center">
						<Button
							icon={faGoogle}
							label={strings("optionsGoogleSignin")}
							disabled={google.signed}
							onPress={() => {
								ga.auth.signIn().then((user) => {
									dispatch(signResolved(user));
									this.loadBackupFiles();
								});
							}}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid.Wrapper>
		);
	}

	/**
	 * Nacteni souboru zalohy
	 */
	private loadBackupFiles(): void {
		ga.drive.list().then((files) => {
			this.setState({
				backupFiles: files,
				backupWorking: false
			});
		});
	}

	/**
	 * Google Drive
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderGoogleDrive(): JSX.Element {
		// rozlozeni props
		const { google } = this.props;
		const { backupDownload, backupFiles, backupUpload, backupWorking } = this.state;
		// pokud je prihlaseny google ucet
		if (google.signed) {
			return (
				<Grid.Wrapper>
					<Grid.Title>{strings("optionsDriveTitle")}</Grid.Title>
					<Grid.Row>
						<Grid.Column>
							<ButtonGroup>
								<Button label={strings("optionsDriveBackup")} disabled={backupWorking} busy={backupUpload} onPress={this.backupUpload} />
								<Button
									label={strings("optionsDriveRestore")}
									disabled={backupWorking || backupFiles.length === 0}
									busy={backupDownload}
									onPress={this.backupDownload}
								/>
							</ButtonGroup>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column horizontal="center">
							<Typography type="Body2">{backupFiles.length === 0 ? strings("optionsDriveEmpty") : JSON.stringify(backupFiles)}</Typography>
						</Grid.Column>
					</Grid.Row>
				</Grid.Wrapper>
			);
		}
		// jinak se nic nezobrazuje
		return null;
	}

	/**
	 * Panak
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderDram(): JSX.Element {
		// rozlozeni props
		const { options } = this.props;
		// sestaveni a vraceni
		return (
			<Grid.Wrapper>
				<Grid.Title>{strings("optionsDramTitle")}</Grid.Title>
				<Grid.Row>
					<Grid.Column>
						<Input.Number icon={faGlassWhiskey} placeholder="dram" value={options.dram} unit="ml" onChange={this.handleDram} />
					</Grid.Column>
				</Grid.Row>
			</Grid.Wrapper>
		);
	}

	/**
	 * Senzoricke vlastnosti
	 *
	 * @returns {JSX.Element} Element
	 */
	private renderProperties(): JSX.Element {
		// rozlozeni props
		const { options } = this.props;
		// sestaveni a vraceni
		return (
			<Grid.Wrapper>
				<Grid.Title>{strings("optionsPropertiesTitle")}</Grid.Title>
				{/* barva */}
				<Grid.Row>
					<Grid.Column>
						<Input.Text
							icon={faPalette}
							placeholder={strings("createCharacteristicsColor")}
							onChange={this.handleTagChange.bind(this, "color")}
							onSubmit={{
								blur: false,
								handler: this.handleTagAdd.bind(this, "color"),
								reset: true
							}}
						/>
						{options.properties.color.length > 0 && (
							<React.Fragment>
								<Spacer />
								<Tags items={options.properties.color} onDelete={this.handleTagRemove.bind(this, "color")} />
							</React.Fragment>
						)}
					</Grid.Column>
				</Grid.Row>
				{/* cich */}
				<Grid.Row>
					<Grid.Column>
						<Input.Text
							icon={faFlask}
							placeholder={strings("createCharacteristicsAroma")}
							onChange={this.handleTagChange.bind(this, "aroma")}
							onSubmit={{
								blur: false,
								handler: this.handleTagAdd.bind(this, "aroma"),
								reset: true
							}}
						/>
						{options.properties.aroma.length > 0 && (
							<React.Fragment>
								<Spacer />
								<Tags items={options.properties.aroma} onDelete={this.handleTagRemove.bind(this, "aroma")} />
							</React.Fragment>
						)}
					</Grid.Column>
				</Grid.Row>
				{/* chut */}
				<Grid.Row>
					<Grid.Column>
						<Input.Text
							icon={faGlassCheers}
							placeholder={strings("createCharacteristicsTaste")}
							onChange={this.handleTagChange.bind(this, "taste")}
							onSubmit={{
								blur: false,
								handler: this.handleTagAdd.bind(this, "taste"),
								reset: true
							}}
						/>
						{options.properties.taste.length > 0 && (
							<React.Fragment>
								<Spacer />
								<Tags items={options.properties.taste} onDelete={this.handleTagRemove.bind(this, "taste")} />
							</React.Fragment>
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid.Wrapper>
		);
	}

	// zrevidovat - aby to pracovalo i s obrazkama

	private backupDownload = async (): Promise<void> => {
		// rozlozeni props
		const { backupFiles } = this.state;

		const records = backupFiles.find((file) => file.name === "data.json");

		const data = await ga.drive.download(records.id);
		const store = JSON.parse(data) as IReduxStore;

		/*
		for (const record of store.collection.records) {

			const content = ga.drive.download(record.id);
			
			fs.save({ name: record.image.filename})
		}
*/

		/*
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
		*/
	};

	private async processFile(asset: string, files: IGoogleDriveFile[], base64: boolean): Promise<void> {
		// definice
		const content = await fs.read(asset);
		const name = asset.split("/").pop();
		const index = files.findIndex((backup) => backup.name === name);
		const meta = files[index];
		// zpracovani
		if (index > -1) {
			await ga.drive.update(meta, content, base64);
		} else {
			await ga.drive.create({ name }, content, base64);
		}
	}

	private async processUpload(): Promise<IGoogleDriveFile[]> {
		// rozlozeni props
		const { backupFiles } = this.state;
		// zpracovani assetu
		const assets = await storage.readAssets();
		for (const asset of assets.collection) {
			await this.processFile(asset, backupFiles, true);
		}
		// zpracovani databaze
		await this.processFile("data.json", backupFiles, false);
		// vraceni seznamu
		return await ga.drive.list();
	}

	private backupUpload = (): void => {
		this.setState(
			{
				backupUpload: true
			},
			() => {
				this.processUpload().then((files) => {
					this.setState({
						backupFiles: files,
						backupUpload: false
					});
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

	private handleTagChange(section: IDataOptionsProperties, value: string): void {
		this.setState({
			tag: {
				...this.state.tag,
				[section]: value
			}
		});
	}

	private handleTagAdd(section: IDataOptionsProperties): void {
		this.props.dispatch(
			updateOptions({
				properties: {
					[section]: [this.state.tag[section]]
				}
			})
		);
	}

	private handleTagRemove(section: IDataOptionsProperties, value: string): void {
		const current = this.props.options.properties[section].slice(0);
		const index = current.findIndex((item) => value === item);
		current.splice(index, 1);

		this.props.dispatch(
			updateOptions({
				properties: {
					[section]: current
				}
			})
		);
	}
}

export default connect((store: IReduxStore) => ({
	google: store.google,
	options: store.options.values
}))(Options);
