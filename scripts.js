
const uploadImage = document.getElementById('upload-image');
const canvas = document.getElementById('canvas');
canvas.width = 1920;
canvas.height = 1080;
const ctx = canvas.getContext('2d');
const apiKey = 'mTcYkqWABT2RVjFn6c7n7b8j'; 

let image = new Image();
const textInputs = document.querySelectorAll('.text-inputs input'); // Move this line up
const labelTemplate = new Image();
labelTemplate.src = 'data:image/jpeg;base64,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'; // Use forward slashes

labelTemplate.onload = () => {
    ctx.drawImage(labelTemplate, 0, 0, canvas.width, canvas.height); // Adjust position/size as needed
};

// Image upload
uploadImage.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        const removedBgImage = await removeBackground(file); 
        console.log('Removed background image URL:', removedBgImage); 
        if (removedBgImage) {
            image.src = removedBgImage; //main image
            image.onload = function() {
                redrawImage(); // kid's photo
            };
        }
    }
});


// Remove background
async function removeBackground(file) {
    const formData = new FormData();
    formData.append('image_file', file); 

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
            },
            body: formData, 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.blob(); 
        const imgUrl = URL.createObjectURL(data); 
        return imgUrl; 
    } catch (error) {
        console.error(error);
        return null; // error
    }
}

let scale = 1;
let rotation = 0;
let flipH = 1;  // 1 normal, -1 horizontal 
let flipV = 1;  
let xPos = 0;
let yPos = 0;
let isDragging = false;
let textX = 50; 
let textY = 50; 
let fontSize = 20;

canvas.addEventListener('mousedown', (event) => {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    
    if (mouseX >= textX && mouseX <= textX + ctx.measureText(text1.value).width && mouseY >= textY - fontSize && mouseY <= textY) {
        isDragging = true;
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
        textX = event.offsetX;
        textY = event.offsetY;
    }   
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

function redraw() {
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    redrawImage();

    ctx.fillStyle = "black"; 
    ctx.font = `${fontSize}px Arial`; 

    // Draw text from all text inputs
    textInputs.forEach((input, index) => {
        const text = input.value;
        ctx.fillText(text, textX, textY + index * (fontSize + 10)); 
    });
}

redraw();

function redrawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(labelTemplate, 0, 0, canvas.width, canvas.height); 

    ctx.drawImage(image, xPos, yPos, image.width * scale, image.height * scale);  // Adjust position and size

    
    ctx.fillStyle = 'red'; 
    textInputs.forEach((input, index) => {
        const text = input.value;
        ctx.fillText(text, 20, 30 + index * 150); 
    });
}


// Zoom in/out
document.getElementById('zoom-in').addEventListener('click', () => {
    scale += 0.1;
    redrawImage();
});

document.getElementById('zoom-out').addEventListener('click', () => {
    if (scale > 0.2) scale -= 0.1;
    redrawImage();
});

// Clockwise, anti-clockwise rotation
document.getElementById('rotate-cw').addEventListener('click', () => {
    rotation += 5;
    redrawImage();
});

document.getElementById('rotate-ccw').addEventListener('click', () => {
    rotation -= 5;
    redrawImage();
});

// Flip 
document.getElementById('flip-horizontal').addEventListener('click', () => {
    flipH *= -1;
    redrawImage();
});

document.getElementById('flip-vertical').addEventListener('click', () => {
    flipV *= -1;
    redrawImage();
});

// Move
document.getElementById('move-left').addEventListener('click', () => {
    xPos -= 5;
    redrawImage();
});

document.getElementById('move-right').addEventListener('click', () => {
    xPos += 5;
    redrawImage();
});

document.getElementById('move-up').addEventListener('click', () => {
    yPos -= 5;
    redrawImage();
});

document.getElementById('move-down').addEventListener('click', () => {
    yPos += 5;
    redrawImage();
});

document.getElementById('download-btn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'comic_sticker.png'; 
    link.href = canvas.toDataURL('image/png'); 
    link.click(); 
});

// Font size
document.getElementById('increase-font').addEventListener('click', () => {
    fontSize += 2;
    redraw();
});

document.getElementById('decrease-font').addEventListener('click', () => {
    if (fontSize > 10) fontSize -= 2;
    redraw();
});

// Text input handling
textInputs.forEach(input => {
    input.addEventListener('input', () => {
        redrawImage();
    });
});


const zip = new JSZip();
zip.file("final_sticker.png", canvas.toDataURL("image/png").split(',')[1], {base64: true});

zip.generateAsync({type:"blob"})
.then(function(content) {
    
    saveAs(content, "stickers.zip"); 
});

const draggables = document.querySelectorAll('.draggable');

draggables.forEach(draggable => {
    draggable.addEventListener('mousedown', onMouseDown);

    function onMouseDown(event) {
        let offsetX = event.clientX - draggable.getBoundingClientRect().left;
        let offsetY = event.clientY - draggable.getBoundingClientRect().top;

        function onMouseMove(event) {
            draggable.style.position = 'absolute'; 
            draggable.style.left = event.clientX - offsetX + 'px';
            draggable.style.top = event.clientY - offsetY + 'px';
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
});
