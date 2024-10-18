let uploadedImage = null;  
let scale = 1;             
let flipH = false;         
let flipV = false;         
let posX = 100;            
let posY = 100;            

const uploadImage = document.getElementById('upload-image');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const bgImagePath = "Picture1.png"; 

let imageX = 100, imageY = 100, imageWidth = 300, imageHeight = 300, rotation = 0;
let scaleX = 1, scaleY = 1; // Flipping variables

const background = new Image();
background.src = bgImagePath;

background.onload = function () {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawLabelText();
};
uploadedImage.onload = function() {
    drawImage();  // Draw the processed image once it’s loaded
};


uploadImage.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        removeBackground(file);
    }
});

function removeBackground(imageFile) {
    const formData = new FormData();
    formData.append('image_file', imageFile);

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': 'mTcYkqWABT2RVjFn6c7n7b8j', 
        },
        body: formData,
    })
    .then(response => {
        if (!response.ok) throw new Error('Error removing background');
        return response.blob();
    })
    .then(blob => {
        const imgUrl = URL.createObjectURL(blob);
        const img = new Image();
        img.src = imgUrl;

        uploadedImage.onload = function () {
            drawImage();
            
        };
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  

    if(!uploadedImage) return;

    ctx.save();  

    
    ctx.translate(posX + (uploadedImage.width * scale) / 2, posY + (uploadedImage.height * scale) / 2);

   
    ctx.rotate(rotation * Math.PI / 180);  
    ctx.scale(flipH ? -scale : scale, flipV ? -scale : scale);  


    ctx.drawImage(uploadedImage, -(uploadedImage.width / 2), -(uploadedImage.height / 2), uploadedImage.width, uploadedImage.height);

    ctx.restore();  
}

function drawLabelText() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    const name = document.getElementById('name').value || "Name";
    const standard = document.getElementById('standard').value || "Standard";
    const section = document.getElementById('section').value || "Section";
    const school = document.getElementById('school').value || "School";
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';  
    ctx.fillText(name, 150, 100);  
    ctx.fillText(standard, 150, 150);
    ctx.fillText(section, 150, 200);
    ctx.fillText(school, 150, 250);

}

document.querySelectorAll('.text-inputs input').forEach(input => {
    input.addEventListener('input', drawLabelText);
});


document.getElementById('zoom-in').addEventListener('click', () => {

    console.log(document.getElementById('zoom-in'));
    scale+=0.1;
    drawImage();
});

document.getElementById('zoom-out').addEventListener('click', () => {
  
    if (scale > 0.1) {
        scale -= 0.1; 
        drawImage();
    }

});

document.getElementById('rotate-cw').addEventListener('click', () => {
    rotation += 5;
    
    drawImage();
});

document.getElementById('rotate-ccw').addEventListener('click', () => {
    rotation -= 5;
   
    drawImage();
});

document.getElementById('flip-horizontal').addEventListener('click', () => {
    // scaleX *= -1;
    // redraw();
    flipH = !flipH;  // Toggle horizontal flip
    drawImage();

});

document.getElementById('flip-vertical').addEventListener('click', () => {
    // scaleY *= -1;
    // redraw();
    flipV = !flipV;  // Toggle vertical flip
    drawImage();
});

document.getElementById('move-left').addEventListener('click', () => {
    // imageX -= 5;
    // redraw();
    posX -= 5;  // Move left by 5 pixels
    drawImage();
});

document.getElementById('move-right').addEventListener('click', () => {
    // imageX += 5;
    // redraw();
    posX += 5;  // Move right by 5 pixels
    drawImage();
});

document.getElementById('move-up').addEventListener('click', () => {
    // imageY -= 5;
    // redraw();
    posY -= 5;  // Move up by 5 pixels
    drawImage();
});

document.getElementById('move-down').addEventListener('click', () => {
    // imageY += 5;
    // redraw();
    posY += 5;  // Move down by 5 pixels
    drawImage();
});

document.getElementById('name').addEventListener('input', drawLabelText);
document.getElementById('standard').addEventListener('input', drawLabelText);
document.getElementById('section').addEventListener('input', drawLabelText);
document.getElementById('school').addEventListener('input', drawLabelText);

// Download PNG
document.getElementById('download-btn').addEventListener('click', function () {
    const link = document.createElement('a');
    link.download = 'sticker.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

