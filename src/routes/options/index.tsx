import { faChevronLeft, faGlassWhiskey, faTags } from "@fortawesome/free-solid-svg-icons";
import { GoogleSignin, GoogleSigninButton, User } from "@react-native-community/google-signin";
import React from "react";
import { Input, Route, Tags, Typography } from "../../components";
import { IOptions } from "../../types/options";
import google from "../../utils/google";
import storage from "../../utils/storage";
import strings from "../../utils/strings";

interface IOptionsState {
	values: IOptions;
	tag: string;
	loaded: boolean;
	google: {
		signed: boolean;
		user: User;
	};
}

/**
 * Nastaveni
 */
export default class Options extends Route.Content<unknown, IOptionsState> {
	/**
	 * Vychozi stav
	 */
	public state: IOptionsState = {
		google: {
			signed: false,
			user: null
		},
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
		// nacteni dat
		storage.options.read().then((values) => {
			this.setState({
				loaded: true,
				values
			});
		});

		// pridat do state ze je pihlaseno, pak nezobrazovat button pro prihlaseni ale jen nejakou statistiku zalohy
		// vymyslet jak to udelat s obrazkama

		this.getGoogleState().then(() => {
			google.drive.list().then((metadata) => {
				console.log("LIST", metadata);
			});

			/*
			storage.stringify().then((stringified) => {
				console.log("STRING", stringified);

				drive.update("185k-JFCJomVoBiCVh9PDOKOjfWazrZ4cuKqJDI6RHRr0CIuE", stringified, { name: "records.json" }).then((metadata) => {
					console.log("UPDATE", metadata);
				});
			});
*/
			google.drive.download("185k-JFCJomVoBiCVh9PDOKOjfWazrZ4cuKqJDI6RHRr0CIuE").then((data) => {
				console.log("DOWNLOAD", data);
			});
		});
	}

	private async getGoogleState(): Promise<void> {
		// overeni prihlaseni
		const signedIn = await google.auth.isSignedIn();
		// pokud je OK
		if (signedIn) {
			// nacteni dat
			await google.auth.getToken();
			const user = await google.auth.getCurrentUser();
			// aktualizace stavu
			this.setState({
				google: {
					signed: true,
					user
				}
			});
		}
	}

	/**
	 * Render
	 *
	 * @returns {JSX.Element} Element
	 */
	public render(): JSX.Element {
		// rozlozeni propts
		const { loaded, values } = this.state;
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
				<Typography type="Headline5">prihlaseni google</Typography>
				<GoogleSigninButton
					size={GoogleSigninButton.Size.Standard}
					color={GoogleSigninButton.Color.Light}
					disabled={this.state.google.signed}
					onPress={() => {
						GoogleSignin.signIn().then((user) => {
							this.setState({
								google: {
									signed: true,
									user
								}
							});
						});
					}}
				/>

				{/* velikost panaku */}
				<Typography type="Headline5">velikost frtanu</Typography>
				<Input.Number icon={faGlassWhiskey} placeholder="dram" value={values.dram} onChange={this.handleDram} />

				{/* senzoricke tagy */}
				<Typography type="Headline5">senzoricke tagy</Typography>
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
