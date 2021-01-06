/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 */

import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { Link, NativeRouter, Route, RouteComponentProps } from "react-router-native";

const Home = (): JSX.Element => <Text style={{ color: "#ff0000" }}>Home</Text>;

const About = (): JSX.Element => <Text style={{ color: "#00ff00" }}>About</Text>;

const Topic = ({ match }: RouteComponentProps): JSX.Element => <Text style={{ color: "#aaaaaa", fontFamily: "monospace" }}>{JSON.stringify(match)}</Text>;

const App = (): JSX.Element => {
	return (
		<NativeRouter>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<View>
					<Link to="/" underlayColor="#ff0000">
						<Text>Home</Text>
					</Link>
					<Link to="/about" underlayColor="#00ff00">
						<Text>About</Text>
					</Link>
					<Link to="/topic" underlayColor="#aaaaaa">
						<Text>Topic</Text>
					</Link>
				</View>

				<View>
					<Route exact={true} path="/" component={Home} />
					<Route path="/about" component={About} />
					<Route path="/topic" component={Topic} />
				</View>

				<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
					<Header />
					<View style={styles.body}>
						<FontAwesomeIcon icon={faCoffee} />

						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitle}>Step One</Text>
							<Text style={styles.sectionDescription}>
								Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to see your edits.
							</Text>
						</View>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitle}>See Your Changes</Text>
							<Text style={styles.sectionDescription}>
								<ReloadInstructions />
							</Text>
						</View>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitle}>Debug</Text>
							<Text style={styles.sectionDescription}>
								<DebugInstructions />
							</Text>
						</View>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitle}>Learn More</Text>
							<Text style={styles.sectionDescription}>Read the docs to discover what to do next:</Text>
						</View>
						<LearnMoreLinks />
					</View>
				</ScrollView>
			</SafeAreaView>
		</NativeRouter>
	);
};

const styles = StyleSheet.create({
	body: {
		backgroundColor: "white"
	},
	engine: {
		position: "absolute",
		right: 0
	},
	footer: {
		color: "black",
		fontSize: 12,
		fontWeight: "600",
		padding: 4,
		paddingRight: 12,
		textAlign: "right"
	},
	highlight: {
		fontWeight: "700"
	},
	scrollView: {
		backgroundColor: "white"
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24
	},
	sectionDescription: {
		fontSize: 18,
		fontWeight: "400",
		marginTop: 8
	},
	sectionTitle: {
		color: "blue",
		fontSize: 24,
		fontWeight: "600"
	}
});

export default App;
