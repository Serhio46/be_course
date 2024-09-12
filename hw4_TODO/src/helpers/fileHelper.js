const fs = require('fs');

class FileHelper {
	readFile(path) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, 'UTF-8', (err, data) => {
				if (err) {
					console.log(err);
					reject(err);
				}
				resolve(JSON.parse(data));
			});
		});
	}

	readFileSync(path) {
		const file = fs.readFileSync(path, 'UTF-8');
		return JSON.parse(file);
	}

	writeFile(path, data) {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, JSON.stringify(data), err => {
				if (err) {
					console.log(err);
					reject(err);
				}
				resolve(data);
			});
		});
	}

	writeFileSync(path, date) {
		fs.writeFileSync(path, JSON.stringify(data));
	}
}

module.exports = new FileHelper();
