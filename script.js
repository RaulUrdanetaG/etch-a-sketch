const grid = document.getElementById('grid');
const blackModeBtn = document.getElementById('black-mode-button');
const rainbowModeBtn = document.getElementById('rainbow-mode-button');
const eraseModeBtn = document.getElementById('erase-button');
const clearModeBtn = document.getElementById('clear-button');
const slider = document.querySelector('.slider');
const sliderText = document.querySelector('.slider-box h3');

var drawMode = '';
var actualGridSize = 0;

blackModeBtn.onclick = () => (setMode('black'));
rainbowModeBtn.onclick = () => (setMode('rainbow'));
eraseModeBtn.onclick = () => (setMode('erase'));
clearModeBtn.onclick = () => (resetGrid());
slider.onmousemove = (e) => (setGridTextSize(e.target.value));
slider.onmouseup = (e) => (createGrid(e.target.value))

function setGridTextSize(gridSize){
    sliderText.innerHTML = `${gridSize} x ${gridSize}`;
}

function setMode(newMode) {
    drawMode = newMode;
    console.log(drawMode);
}

function resetGrid(){
    eraseGrid();
    createGrid(actualGridSize);
}

function eraseGrid() {
    grid.innerHTML = '';
}

function createGrid(gridSize) {
    eraseGrid();
    grid.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
    grid.style.gridTemplateRows = `repeat(${gridSize},1fr)`
    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        grid.appendChild(gridElement);
    }
    actualGridSize = gridSize;
}


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
