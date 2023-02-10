const pickColorBtn = document.querySelector('#colorPickerBtn');
const colorsList = document.querySelector('#colorsList');
const clearBtn = document.querySelector('.clearBtn');
const options = document.querySelector('.options');
const pickerList = JSON.parse(localStorage.getItem("picked-colors") || '[]');

const copyColor = ele => {
    navigator.clipboard.writeText(ele.dataset.color)
    ele.innerText = "COPIED";
    setTimeout(() => ele.innerText = ele.dataset.color, 800);
}

const showColors = () => {
    colorsList.innerHTML = pickerList.map(color => `
    <li class="color">
        <span class="rect" style="background: ${color}; border: 1px solid ${color === "#ffffff" ? "#ccc" : color}"></span>
        <span class="value" data-color=${color}>${color}</span>
        </li>
        `).join("");
        
    if(!pickerList.length) return;

    options.classList.remove('hide');

    document.querySelectorAll('.color').forEach(ele => {
        ele.addEventListener('click', e => copyColor(e.currentTarget.lastElementChild))
    })
}

const activateEyeDropper = () => {
    document.body.style.display = "none";
    setTimeout( async () => {
        try {
            const eyeDropper = new window.EyeDropper();
            const { sRGBHex } = await eyeDropper.open();
            

            if(!pickerList.includes(sRGBHex)){
                pickerList.push(sRGBHex);
                localStorage.setItem("picked-colors", JSON.stringify(pickerList));
                showColors();
            }
        } catch (error) {
            console.log(error)
        }
        document.body.style.display = "block";
    }, 10);
}

const clearColorsList = () => {
    pickerList.length = 0;
    localStorage.removeItem("picked-colors");
    options.classList.add('hide');
    showColors();
}

showColors();

pickColorBtn.addEventListener('click', activateEyeDropper);
clearBtn.addEventListener('click', clearColorsList);