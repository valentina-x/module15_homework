const btn = document.querySelector('.button');

btn.addEventListener('click', showSizes);

function showSizes() {
	const width = document.documentElement.clientWidth;
	const height = document.documentElement.clientHeight;
	const maxHeight = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);	
	return alert(`Ширина видимой области за вычетом ширины скролла - ${width}; Высота видимой области - ${height}; Максимальная высота с учётом скролла - ${maxHeight};`)
}

