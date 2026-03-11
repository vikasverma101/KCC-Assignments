const form = document.getElementById("registrationForm")

const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const phoneInput = document.getElementById("phone")
const passwordInput = document.getElementById("password")

const nameError = document.getElementById("nameError")
const emailError = document.getElementById("emailError")
const phoneError = document.getElementById("phoneError")
const passwordError = document.getElementById("passwordError")

const strengthBar = document.getElementById("strengthBar")
const togglePassword = document.getElementById("togglePassword")

// Name validation
nameInput.addEventListener("input", () => {

if(nameInput.value.length < 3){
nameError.textContent = "Name must be at least 3 characters"
}else{
nameError.textContent = ""
}

})


// Email validation
emailInput.addEventListener("input", () => {

const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

if(!emailPattern.test(emailInput.value)){
emailError.textContent = "Invalid email"
}else{
emailError.textContent = ""
}

})


// Phone validation
phoneInput.addEventListener("input", () => {

const phonePattern = /^[0-9]{10}$/

if(!phonePattern.test(phoneInput.value)){
phoneError.textContent = "Phone must be 10 digits"
}else{
phoneError.textContent = ""
}

})


// Password strength meter
passwordInput.addEventListener("input", () => {

let password = passwordInput.value
let strength = 0

if(password.length >= 6) strength++
if(/[A-Z]/.test(password)) strength++
if(/[0-9]/.test(password)) strength++
if(/[^A-Za-z0-9]/.test(password)) strength++

if(strength == 1){
strengthBar.style.width = "25%"
strengthBar.style.background = "red"
}

if(strength == 2){
strengthBar.style.width = "50%"
strengthBar.style.background = "orange"
}

if(strength == 3){
strengthBar.style.width = "75%"
strengthBar.style.background = "yellowgreen"
}

if(strength == 4){
strengthBar.style.width = "100%"
strengthBar.style.background = "green"
}

})


// Show hide password
togglePassword.addEventListener("click", () => {

if(passwordInput.type === "password"){
passwordInput.type = "text"
togglePassword.textContent = "Hide"
}else{
passwordInput.type = "password"
togglePassword.textContent = "Show"
}

})


// Submit form
form.addEventListener("submit", function(e){

e.preventDefault()

if(nameError.textContent || emailError.textContent || phoneError.textContent){
return
}

const data = {
name: nameInput.value,
email: emailInput.value,
phone: phoneInput.value,
password: passwordInput.value
}

let submissions = JSON.parse(localStorage.getItem("submissions")) || []

submissions.push(data)

localStorage.setItem("submissions", JSON.stringify(submissions))

document.getElementById("success").textContent = "Registration Successful!"

form.reset()
strengthBar.style.width = "0%"

})