export const yearOptions = () => {
	let yearOptions = [];
	const startYear = '2022';
	for (let i = startYear; yearOptions.length < 12; i++) {
		yearOptions.push({
			label: `${i}`,
			value: `${i}`,
		});
	}
	return yearOptions;
};

const createData = (id, month, expenses, revenue, profit) => {
	return { id, month, expenses, revenue, profit };
};

export const rows = (data) => {
	let options = [];

	data?.forEach((item) => {
		options.push(
			createData(item._id, item.name, item.expenses, item.revenue, item.profit)
		);
	});

	return options;
};

export const doTheMath = (arr) => {
	let forMath = [];
	arr.forEach((item) => {
		forMath.push(parseFloat(item.amount));
	});
	const math = forMath.reduce((a, b) => a + b, 0);
	return math.toFixed(2);
};

export const profit = (rev, exp) => {
	const pro = rev - exp;
	return pro.toFixed(2);
};

export const totalRev = (arr) => {
	let forMath = [];
	arr.forEach((item) => {
		forMath.push(parseFloat(item.revenue.split('$')[1]));
	});
	const math = forMath.reduce((a, b) => a + b, 0);
	return math.toFixed(2);
};

export const totalExp = (arr) => {
	let forMath = [];
	arr.forEach((item) => {
		forMath.push(parseFloat(item.expenses.split('$')[1]));
	});
	const math = forMath.reduce((a, b) => a + b, 0);
	return math.toFixed(2);
};

export const totalProfit = (arr) => {
	let forMath = [];
	arr.forEach((item) => {
		forMath.push(parseFloat(item.profit.split('$')[1]));
	});
	const math = forMath.reduce((a, b) => a + b, 0);
	return math.toFixed(2);
};
