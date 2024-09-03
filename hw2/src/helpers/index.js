const modifyUser = (allUsers, id, newData, field) => {
	return allUsers.map(user => {
		if (user.id === +id) {
			return {
				id: user.id,
				...user,
				...(field ? { [field]: newData } : newData),
			};
		}
		return user;
	});
};

module.exports = { modifyUser };
