const clickable = document.getElementById("clickable");
const clickableQS = document.querySelector(".clickableQS");

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

const setRandomColor = (element) => {
    element.style.background = getRandomColor()
    element.style.color = getRandomColor()
}

[clickable, clickableQS].forEach(element => {
    element.addEventListener('click', () => setRandomColor(element))
});

const imageContainer = document.querySelector('.image-container')
const deleteButton = document.querySelector('.delete')
const scaleUp = document.querySelector('.scaleUp')
const scaleDown = document.querySelector('.scaleDown')
let scaleValue = 1;


document.getElementById('picField').onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            const img = document.createElement('img')
            img.src = fr.result
            imageContainer.appendChild(img)
        }
        fr.readAsDataURL(files[0]);
    }
}

deleteButton.addEventListener('click', () => {
    imageContainer.lastChild.remove()
})

scaleUp.addEventListener('click', () => {
    scaleValue += 0.1
    imageContainer.childNodes.forEach(img => {
        img.style.transform = `scale(${scaleValue})`
    })
})

scaleDown.addEventListener('click', () => {
    scaleValue -= 0.1
    imageContainer.childNodes.forEach(img => {
        img.style.transform = `scale(${scaleValue})`
    })
})

