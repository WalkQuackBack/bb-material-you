import {
	readFileSync,
	writeFile,
	existsSync,
	mkdirSync,
} from 'fs';
import { join } from 'path';
import { compileAsync } from 'sass';
import { transform } from 'lightningcss';

const IN = './sass/variants';
const OUT = './dist';

const THEME_PREFIX = 'bbm3-';
const PROJECT_NAME_PRETTY = 'Material You ';
const VERSION = '0.1.0';

const AUTHOR =
	process.env.USER ||
	process.env.USERNAME ||
	'';

const TEMPLATE = JSON.parse(
	readFileSync('./template.bbtheme')
);
const THUMBNAIL = transform({
	minify: true,
	code: Buffer.from(
		readFileSync('./thumbnail.css')
	),
}).code.toString();

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
	misc: [
		'tokensOnlyBbBlueDark',
		'tokensOnlyBbBlueLight',
	],
};

if (!existsSync(OUT)) {
	mkdirSync(OUT, {
		recursive: true,
	});
}

// build
const compileToTheme = async (
	inputPath,
	variant
) => {
	const compiled = await compileAsync(
		inputPath
	);
	const result = transform({
		minify: true,
		code: Buffer.from(compiled.css),
	});

	const themeData = TEMPLATE;
	themeData.name =
		PROJECT_NAME_PRETTY +
		variant.replaceAll('-', ' ');
	themeData.author = AUTHOR;
	themeData.css =
		`
    /*
      ${PROJECT_NAME_PRETTY}
      Variant ${variant}
      Version ${VERSION}
      Compiled on: ${new Date().toUTCString()}
    */
   ` + result.code.toString();

	themeData.thumbnail = THUMBNAIL;

	writeFile(
		join(
			OUT,
			`${THEME_PREFIX + variant}.bbtheme`
		),
		JSON.stringify(themeData),
		(err) => {
			if (err) throw err;
			console.log(`Built ${variant}`);
		}
	);
};

const createFoldersAndCompile = (
	structure,
	basePath
) => {
	for (const [
		folderName,
		contents,
	] of Object.entries(structure)) {
		const newBasePath = join(
			basePath,
			folderName
		);

		if (Array.isArray(contents)) {
			contents.forEach((file) => {
				const inputFile = join(
					newBasePath,
					`${file}.sass`
				);
				const variant =
					newBasePath
						.replaceAll('\\', '-')
						.substring(14) +
					'-' +
					file;
				compileToTheme(
					inputFile,
					variant
				);
			});
		} else {
			createFoldersAndCompile(
				contents,
				newBasePath
			);
		}
	}
};

createFoldersAndCompile(folders, IN);
