import {
	writeFileSync,
	existsSync,
	mkdirSync,
} from 'fs';
import { join } from 'path';
import { compile } from 'sass';

const baseDir = './sass/variants';
const outputDir = './dist';

// Define your folder structure
const folders = {
	highContrast: {
		dark: [
			'bb-blue',
			'lime',
			'purple',
			'red',
		],
		light: [
			'bb-blue',
			'lime',
			'purple',
			'red',
		],
	},
	mediumContrast: {
		dark: [
			'bb-blue',
			'lime',
			'purple',
			'red',
		],
		light: [
			'bb-blue',
			'lime',
			'purple',
			'red',
		],
	},
	normalContrast: {
		dark: [
			'bb-blue',
			'lime',
			'purple',
			'red',
		],
		light: [
			'bb-blue',
			'lime',
			'purple',
			'red',
		],
	},
};

// Compile each Sass file
const compileSass = (inputPath, outputPath) => {
	const result = compile({
		file: inputPath,
	});
	writeFileSync(outputPath, result + '.css');
	console.log(
		`Compiled ${inputPath} to ${outputPath}`
	);
};

const createFoldersAndCompile = (
	structure,
	basePath,
	outputPath
) => {
	for (const [
		folderName,
		contents,
	] of Object.entries(structure)) {
		const newBasePath = join(
			basePath,
			folderName
		);
		const newOutputPath = join(
			outputPath,
			folderName
		);

		if (!existsSync(newOutputPath)) {
			mkdirSync(newOutputPath, {
				recursive: true,
			});
		}

		if (Array.isArray(contents)) {
			contents.forEach((file) => {
				const inputFile = join(
					newBasePath,
					`${file}.sass`
				);
				const outputFile = join(
					newOutputPath,
					`${file}.css`
				);
				compileSass(
					inputFile,
					outputFile
				);
			});
		} else {
			createFoldersAndCompile(
				contents,
				newBasePath,
				newOutputPath
			);
		}
	}
};

createFoldersAndCompile(
	folders,
	baseDir,
	outputDir
);

// for (const folder of fs.readdirSync("../")) {
//   const theme = path.join("..", folder, "theme.bbtheme")
//   if (fs.existsSync(theme)) {
//     console.log('Theme path found: ' + theme)

//     const css = path.join("..", folder, CSS_FILE_NAME + ".css")
//     const thumbnail = THUMB_FILE_LOCATION
//     const output = path.join("..", folder + ".bbtheme")

//     if (!fs.existsSync(css) && !fs.existsSync(thumbnail)) {
//       console.warn("!!!     Couldn't find CSS or thumbnail file, skipping compile")
//       fs.copyFileSync(theme, output)
//     } else {
//       const themeData = JSON.parse(fs.readFileSync(theme))
//       themeData.name = folder

//       if (fs.existsSync(css)) {
//         const cssData = fs.readFileSync(css, "utf-8")
//         themeData.css =
//           `/*\n\n${themeData.name}\nBy ${themeData.author}/\n*/\n` +
//         transform({
//               code: Buffer.from(cssData),
//               minify: true
//         }).code.toString()
//       }
//       if (fs.existsSync(thumbnail)) {
//         const thumbnailData = fs.readFileSync(thumbnail, "utf-8")
//         themeData.thumbnail = transform({
//           code: Buffer.from(thumbnailData),
//           minify: true,
//           include: Features.Nesting
//         }).code.toString()
//       }

//       fs.writeFileSync(output, JSON.stringify(themeData, null, 2))
//     }
//   }
// }
