const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'black';

const grid = document.getElementById('grid');
const colorPicker = document.getElementById('color-picker');
const colorModeBtn = document.getElementById('color-mode-button');
const rainbowModeBtn = document.getElementById('rainbow-mode-button');
const shadeModeButton = document.getElementById('shade-mode-button');
const eraseModeBtn = document.getElementById('erase-button');
const clearModeBtn = document.getElementById('clear-button');
const slider = document.querySelector('.slider');
const sliderText = document.querySelector('.slider-box h3');

var drawMode = '';
var actualGridSize = 0;
var actualColor = '';
var r, g, b = 0;

colorPicker.oninput = (e) => (setColor(e.target.value))
colorModeBtn.onclick = () => (setMode('color'));
rainbowModeBtn.onclick = () => (setMode('rainbow'));
eraseModeBtn.onclick = () => (setMode('erase'));
clearModeBtn.onclick = () => (resetGrid());
slider.onmousemove = (e) => (setGridTextSize(e.target.value));
slider.onmouseup = (e) => (createGrid(e.target.value))

function setColor(pickedColor) {
    actualColor = pickedColor;
}

function setGridTextSize(gridSize) {
    sliderText.innerHTML = `${gridSize} x ${gridSize}`;
}

function setMode(newMode) {
    drawMode = newMode;
    r = 0;
    g = 0;
    b = 0;
    if (drawMode === 'color') {
        colorModeBtn.classList.add('active');
        rainbowModeBtn.classList.remove('active');
        eraseModeBtn.classList.remove('active');
    }
    if (drawMode === 'rainbow') {
        colorModeBtn.classList.remove('active');
        rainbowModeBtn.classList.add('active');
        eraseModeBtn.classList.remove('active');
    }
    if (drawMode === 'erase') {
        colorModeBtn.classList.remove('active');
        rainbowModeBtn.classList.remove('active');
        eraseModeBtn.classList.add('active');
    }
}

function resetGrid() {
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
        gridElement.addEventListener('mouseover', colorGridElement);
        gridElement.addEventListener('mousedown', colorGridElement);
        grid.appendChild(gridElement);
    }
    actualGridSize = gridSize;
}

function colorGridElement(e) {
    if (e.type === 'mouseover' && !mouseDown) {
        return
    } else if (drawMode === 'color') {
        e.target.style.backgroundColor = `${actualColor}`;
    } else if (drawMode === 'erase') {
        e.target.style.backgroundColor = 'white';
    } else if (drawMode === 'rainbow') {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);

        e.target.style.backgroundColor = `rgb(${r},${g},${b})`
    }
}


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


window.onload = () => {
    createGrid(DEFAULT_SIZE);
    setGridTextSize(DEFAULT_SIZE);
    setMode(DEFAULT_MODE);
    setColor(DEFAULT_COLOR);
}