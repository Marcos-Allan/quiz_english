const btn_iniciar = document.querySelector(".btn_iniciar")
const question = document.querySelector(".question")
const answers = document.querySelector(".answers")
const spnQtd = document.querySelector(".spnQtd")
const textFinish = document.querySelector(".finish span")
const content = document.querySelector(".content")
const contentFinish = document.querySelector(".finish")
const btnRestart = document.querySelector(".finish button")

const acerts = document.querySelector(".correct_symbol_p")
const errors = document.querySelector(".error_symbol_p")
const message = document.querySelector(".message") 

const p_timer = document.querySelector('.timer')

const secondsP = document.querySelector('.seconds')
const minutesP = document.querySelector('.minutes')
const hourP = document.querySelector('.hours')

let timer

import questions from "./questions.js"

let currentIndex = 0
let questionsCorrect = 0
let questionsError = 0

btn_iniciar.addEventListener('click', () => {
  let hour = 0
  let minute = 0
  let second = 0

  btn_iniciar.style.display = "none"

  timer = setInterval(() => {
    second++
    if(Number(second) >= 0 && Number(second) <= 9){
      secondsP.innerHTML = `0${second}`
    }else{
      secondsP.innerHTML = second
    }
    if(Number(minute) >= 0 && Number(minute) <= 9){
      minutesP.innerHTML = `0${minute}`
    }else{
      minutesP.innerHTML = minute
    }
    if(Number(hour) >= 0 && Number(hour) <= 9){
      hourP.innerHTML = `0${hour}`
    }else{
      hourP.innerHTML = hour
    }
    if(second == 60){
      second = 0
      minute++
    }
    if(minute == 60){
      minute == 0
      hour++
    }
  }, 1000);
  loadQuestion()
})

function nextQuestion(e) {
  if(e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++
    acerts.innerHTML = questionsCorrect
    e.target.classList.add('animation_correct')
  }else{
    questionsError++
    errors.innerHTML = questionsError
    e.target.classList.add('animation_erro')
  }

  e.target.removeEventListener('click', nextQuestion)

  if(currentIndex < questions.length - 1){
    setTimeout(() => {
      currentIndex++
      loadQuestion()
    }, 500);
  }else {
    setTimeout(() => {
      finish()
    }, 500);
  }
}

function stopGame() {
  const gamed = localStorage.getItem('game_english')
  const gamed_timing = localStorage.getItem('game_english_timing')
  const gamed_acerts = localStorage.getItem('game_english_acerts')
  const gamed_errors = localStorage.getItem('game_english_errors')
  if(gamed){
    message.style.display = 'block'
  }
  if(gamed_timing){
    p_timer.innerHTML = gamed_timing
  }
  if(gamed_acerts){
    acerts.innerHTML = gamed_acerts
  }
  if(gamed_errors){
    errors.innerHTML = gamed_errors
  }
  if(gamed && gamed_timing && gamed_acerts && gamed_errors){
    btn_iniciar.style.display = "none"
  }
}

document.addEventListener('DOMContentLoaded', stopGame)

function finish() {
  localStorage.setItem('game_english', 'true')
  localStorage.setItem('game_english_acerts', `${questionsCorrect}`)
  localStorage.setItem('game_english_errors', `${questionsError}`)
  localStorage.setItem('game_english_timing', `${hourP.innerHTML}:${minutesP.innerHTML}:${secondsP.innerHTML}`)

  textFinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`
  content.style.display = "none"
  contentFinish.style.display = "flex"
  clearInterval(timer)
}

btnRestart.onclick = () => {
  content.style.display = "flex"
  contentFinish.style.display = "none"
  
  currentIndex = 0
  questionsCorrect = 0
  questionsError = 0
  
  question.style.display = "none"
  answers.style.display = "none"
  spnQtd.style.display = "none"

  acerts.innerHTML = questionsCorrect
  errors.innerHTML = questionsError

  stopGame()
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`
  const item = questions[currentIndex]
  answers.innerHTML = ""
  question.innerHTML = item.question

  item.answers.forEach((answer) => {
    const div = document.createElement("div")

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div)
  })

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion)
  })
}

// loadQuestion()

//ABA DO QRCODE E FUNCIONALIDADES DAS MESMAS
const div_qrCode = document.querySelector('.comp')
const aba_comp = document.querySelector('.compartilhar_site')
aba_comp.addEventListener('click',()=>{
  div_qrCode.style.left="0"
})
const btnFec = document.querySelector('.btn_fec')
btnFec.addEventListener('click',()=>{
  div_qrCode.style.left="-100vw"
})