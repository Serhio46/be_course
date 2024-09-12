class DbHelper {
	addNewEntry(db, value, field) {
		return {
			...db,
			[field]: [...(db[field] || []), value],
		};
	}

	updateEntry(db, value, field) {
		const updates = db[field].map(entry => (entry.id !== value.id ? entry : { ...entry, ...value }));
		return { ...db, [field]: updates };
	}

	deleteEntry(db, id, field) {
		const updatedDb = db[field].filter(entry => entry.id !== id);
		return { ...db, [field]: updatedDb };
	}
}

module.exports = new DbHelper();
