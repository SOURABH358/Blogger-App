const signup = document.getElementById('signup')
const login = document.getElementById('login')
const signupForm = document.getElementById('signup__form')
const loginForm = document.getElementById('login__form')
const layover = document.querySelector('.layover')
const close = document.querySelectorAll('.close')

signup.addEventListener('click',()=>{
    signupForm.classList.add('show__form')
    layover.classList.add('show__layover')    
})

login.addEventListener('click',()=>{
    loginForm.classList.add('show__form')
    layover.classList.add('show__layover')    
})

close.forEach(ele=>{
        ele.addEventListener('click',()=>{
        signupForm.classList.remove('show__form')
        loginForm.classList.remove('show__form')
        layover.classList.remove('show__layover')
    })
})