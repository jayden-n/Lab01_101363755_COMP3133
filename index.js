// imports
const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'input_countries.csv';
const canadaOutputFile = 'canada.txt';
const usaOutputFile = 'usa.txt';

const deleteFileIfExists = (filename) => {
	if (fs.existsSync(filename)) {
		fs.unlinkSync(filename);
		console.log(`${filename} deleted successfully`);
	}
};

deleteFileIfExists(canadaOutputFile);
deleteFileIfExists(usaOutputFile);

fs.createReadStream(inputFile)
	.pipe(csv())
	.on('data', (row) => {
		if (row.country === 'Canada') {
			fs.appendFileSync(canadaOutputFile, `${Object.values(row).join(',')}\n`);
		} else if (row.country === 'United States') {
			fs.appendFileSync(usaOutputFile, `${Object.values(row).join(',')}\n`);
		}
	})
	.on('end', () => {
		console.log('Successful!');
	});
