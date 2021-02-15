import { faChevronLeft, faGlassWhiskey, faTags } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Input, Route, Tags, Typography } from "../../components";
import { IOptions } from "../../types/options";
import storage from "../../utils/storage";
import strings from "../../utils/strings";

interface IOptionsState {
	values: IOptions;
	tag: string;
}

/**
 * Nastaveni
 */
export default class Options extends Route.Content<unknown, IOptionsState> {
	/**
	 * Vychozi stav
	 */
	public state: IOptionsState = {
		tag: null,
		values: null
	};

	/**
	 * Pripojeni komponenty
	 */
	public componentDidMount(): void {
		storage.options.read().then((values) => {
			this.setState({
				values
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
		const { values } = this.state;
		// sestaveni a vraceni
		return (
			<Route.Wrapper
				busy={values === null}
				header={{
					actionLeft: {
						icon: faChevronLeft,
						onPress: () => this.redirect("/overview")
					},
					title: strings("optionsTitle")
				}}
			>
				<Typography type="Headline5">velikost frtanu</Typography>
				<Input.Number icon={faGlassWhiskey} placeholder="dram" value={values?.dram} onChange={this.handleDram} />
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
				<Tags items={values?.properties} onPress={this.handleTagRemove} />
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
