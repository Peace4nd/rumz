// FILE PICKER: https://github.com/rnmods/react-native-document-picker
export {};

/*
import RNFS from "react-native-fs";

export function getFiles() {
	// get a list of files and directories in the main bundle
	RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
		.then((result) => {
			console.log("GOT RESULT", result);

			// stat the first file
			return Promise.all([RNFS.stat(result[0].path), result[0].path]);
		})
		.then((statResult) => {
			if (statResult[0].isFile()) {
				// if we have a file, read it
				return RNFS.readFile(statResult[1], "utf8");
			}

			return "no file";
		})
		.then((contents) => {
			// log the file contents
			console.log(contents);
		})
		.catch((err) => {
			console.log(err.message, err.code);
		});
}

export function deleteFile() {
	return (
		RNFS.unlink(path)
			.then(() => {
				console.log("FILE DELETED");
			})
			// `unlink` will throw an error, if the item to unlink does not exist
			.catch((err) => {
				console.log(err.message);
			})
	);
}

export function uploadFile() {
	const uploadUrl = "http://requestb.in/XXXXXXX"; // For testing purposes, go to http://requestb.in/ and create your own link
	// create an array of objects of the files you want to upload
	const files = [
		{
			name: "test1",
			filename: "test1.w4a",
			filepath: RNFS.DocumentDirectoryPath + "/test1.w4a",
			filetype: "audio/x-m4a"
		},
		{
			name: "test2",
			filename: "test2.w4a",
			filepath: RNFS.DocumentDirectoryPath + "/test2.w4a",
			filetype: "audio/x-m4a"
		}
	];

	const uploadBegin = (response) => {
		const jobId = response.jobId;
		console.log("UPLOAD HAS BEGUN! JobId: " + jobId);
	};

	const uploadProgress = (response) => {
		const percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
		console.log("UPLOAD IS " + percentage + "% DONE!");
	};

	// upload files
	RNFS.uploadFiles({
		toUrl: uploadUrl,
		files: files,
		method: "POST",
		headers: {
			Accept: "application/json"
		},
		fields: {
			hello: "world"
		},
		begin: uploadBegin,
		progress: uploadProgress
	})
		.promise.then((response) => {
			if (response.statusCode == 200) {
				console.log("FILES UPLOADED!"); // response.statusCode, response.headers, response.body
			} else {
				console.log("SERVER ERROR");
			}
		})
		.catch((err) => {
			if (err.description === "cancelled") {
				// cancelled by user
			}
			console.log(err);
		});
}
*/
