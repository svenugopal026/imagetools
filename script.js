function resizeImage() {
    const imageInput = document.getElementById('imageInput');
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    const imageSizeElement = document.getElementById('imageSize');

    if (!imageInput.files[0]) {
        alert('Please select an image file.');
        return;
    }
    if (!width || !height) {
        alert('Please enter both width and height.');
        return;
    }

    const file = imageInput.files[0];

    // Display file size in KB
    const fileSizeKB = (file.size / 1024).toFixed(2); // Convert size to KB
    imageSizeElement.textContent = `Image Size: ${fileSizeKB} KB`;

    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            const resizedImageURL = canvas.toDataURL('image/png');
            document.getElementById('resizedImage').src = resizedImageURL;

            // Enable download button with the resized image URL
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = resizedImageURL;
            downloadLink.style.display = 'inline';
        };
    };

    reader.readAsDataURL(file);
}
