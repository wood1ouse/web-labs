const generateCells = (table, rows, columns) => {
	table.style.gridTemplateColumns = `repeat(${columns}, 40px)`;

	for (let i = 1; i <= rows * columns; i++) {
		const cell = document.createElement("div");
		cell.innerHTML = i;
		table.appendChild(cell);
	}
};

const table = document.querySelector(".table");
const ROWS = 6;
const COLUMNS = 6;

const VARIANT = "28";

const getRandomColor = () => {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const setRandomColor = (element) => {
	element.style.background = getRandomColor();
};

const setPaletteColor = (element) => {
	const palette = document.querySelector(".palette");

	element.style.background = palette.value;
};

const colorColumns = (element, rows, columns) => {
	const columnsToColor = getNeededColumns(
		Number(element.innerHTML),
		rows,
		columns,
	);

	table.childNodes.forEach((cell) => {
		[].concat(...columnsToColor).includes(Number(cell.innerHTML)) &&
			setRandomColor(cell);
	});
};

const getNeededColumns = (cell, rows, columns) => {
	const neededColumns = [];
	const currentColumn = [];

	currentColumn.push(cell);

	let i = cell;

	while (true) {
		i -= columns;

		if (i < 0) {
			while (true) {
				cell += columns;
				if (cell > rows * columns) {
					break;
				}
				currentColumn.push(cell);
			}
			break;
		}

		currentColumn.push(i);
	}

	neededColumns.push(currentColumn);

	let columnNumber = currentColumn.sort((a, b) => a - b)[0];

	for (let i = columnNumber + 2; i <= columns; i += 2) {
		let nextColumn = [];
		for (let j = i; j <= rows * columns - columns + i; j += columns) {
			nextColumn.push(j);
		}
		neededColumns.push(nextColumn);
	}

	return neededColumns;
};

generateCells(table, ROWS, COLUMNS);

table.childNodes.forEach((cell) => {
	if (cell.innerHTML === VARIANT) {
		cell.addEventListener("mouseenter", (event) => {
			setRandomColor(event.target);
		});
		cell.addEventListener("click", (event) => {
			setPaletteColor(event.target);
		});
		cell.addEventListener("dblclick", (event) => {
			colorColumns(event.target, ROWS, COLUMNS);
		});
	}
});
