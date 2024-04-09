let accordian = document.getElementsByClassName("FAQ__title");

for (let i = 0; i < accordian.length; i++) {
  accordian[i].addEventListener("click", function () {
    if (this.childNodes[1].classList.contains("fa-plus")) {
      this.childNodes[1].classList.remove("fa-plus");
      this.childNodes[1].classList.add("fa-times");
    } else {
      this.childNodes[1].classList.remove("fa-times");
      this.childNodes[1].classList.add("fa-plus");
    }

    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

function validateForm() {
  var emailInput = document.querySelectorAll('.email__input')[1];
  var inputValue = emailInput.value.toLowerCase(); // Convert input to lowercase
  console.log(emailInput);
  // Validate if inputValue contains 'moyna'
  if (inputValue=='moyna') {
    window.location.href = "secret2.html";

  } else {
    // If 'moyna' is not found, display an error message
    alert('Your nickname is not correct.');
    return false;
  }
}
function validateForm2() {
  var inputValue = document.querySelectorAll('.email__input')[0]; 
  console.log(inputValue); // Changed from 'emailInput' to 'inputValue'
  
  // Validate if inputValue contains '16-04-2022'
  if (inputValue.value === '16-04-2022') {
    window.location.href = "secret.html";
  } else {
    // If '16-04-2022' is not found, display an error message
    alert('Your answer is not correct. LOL');
    return false;
  }
}

// helper functions
const PI2 = Math.PI * 2
const random = (min, max) => Math.random() * (max - min + 1) + min | 0
const timestamp = _ => new Date().getTime()

// container
class Birthday {
  constructor() {
    this.resize()

    // create a lovely place to store the firework
    this.fireworks = []
    this.counter = 0

  }
  
  resize() {
    this.width = canvas.width = window.innerWidth
    let center = this.width / 2 | 0
    this.spawnA = center - center / 4 | 0
    this.spawnB = center + center / 4 | 0
    
    this.height = canvas.height = window.innerHeight
    this.spawnC = this.height * .1
    this.spawnD = this.height * .5
    
  }
  
  onClick(evt) {
     let x = evt.clientX || evt.touches && evt.touches[0].pageX
     let y = evt.clientY || evt.touches && evt.touches[0].pageY
     
     let count = random(3,5)
     for(let i = 0; i < count; i++) this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        x,
        y,
        random(0, 260),
        random(30, 110)))
          
     this.counter = -1
     
  }
  
  update(delta) {
    ctx.globalCompositeOperation = 'hard-light'
    ctx.fillStyle = `rgba(20,20,20,${ 0.001 * delta })`
    ctx.fillRect(0, 0, this.width, this.height)

    ctx.globalCompositeOperation = 'lighter'
    for (let firework of this.fireworks) firework.update(delta)

    // if enough time passed... create new new firework
    this.counter += delta * 3 // each second
    if (this.counter >= 1) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        random(0, this.width),
        random(this.spawnC, this.spawnD),
        random(0, 360),
        random(30, 110)))
      this.counter = 0
    }

    // remove the dead fireworks
    if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

  }
}

class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false
    this.offsprings = offsprings

    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY

    this.shade = shade
    this.history = []
  }
  update(delta) {
    if (this.dead) return

    let xDiff = this.targetX - this.x
    let yDiff = this.targetY - this.y
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
      this.x += xDiff * 2 * delta
      this.y += yDiff * 2 * delta

      this.history.push({
        x: this.x,
        y: this.y
      })

      if (this.history.length > 20) this.history.shift()

    } else {
      if (this.offsprings && !this.madeChilds) {
        
        let babies = this.offsprings / 2
        for (let i = 0; i < babies; i++) {
          let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
          let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

          birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))

        }

      }
      this.madeChilds = true
      this.history.shift()
    }
    
    if (this.history.length === 0) this.dead = true
    else if (this.offsprings) { 
        for (let i = 0; this.history.length > i; i++) {
          let point = this.history[i]
          ctx.beginPath()
          ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
          ctx.arc(point.x, point.y, 1, 0, PI2, false)
          ctx.fill()
        } 
      } else {
      ctx.beginPath()
      ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
      ctx.arc(this.x, this.y, 1, 0, PI2, false)
      ctx.fill()
    }

  }
}

let canvas = document.getElementById('birthday')
let ctx = canvas.getContext('2d')

let then = timestamp()

let birthday = new Birthday
window.onresize = () => birthday.resize()
document.onclick = evt => birthday.onClick(evt)
document.ontouchstart = evt => birthday.onClick(evt)

  ;(function loop(){
  	requestAnimationFrame(loop)

  	let now = timestamp()
  	let delta = now - then

    then = now
    birthday.update(delta / 1000)
  	

  })()

  function handleFireworksButtonClick(evt) {
    console.log('Button clicked');
    let canvas = document.getElementById('birthday');
    if (canvas.style.display === 'none') {
      canvas.style.display = 'block'; // Show the canvas
      canvas.style.position= 'fixed';
        canvas.style.top= '0';
        canvas.style.left= '0';
        canvas.style.width= '100%';
        canvas.style.height= '100%'; 
        setTimeout(() => {
          canvas.style.display = 'none'; 
        }, 7000);
    } else {
      canvas.style.display = 'none'; 
    }
  }

  // Get the button element
  let fireworksButton = document.getElementById('fireworksButton');

  // Add event listener to the button to trigger fireworks
  fireworksButton.addEventListener('click', handleFireworksButtonClick);