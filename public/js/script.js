const signup = document.getElementById('signup')
const login = document.getElementById('login')
const signupForm = document.getElementById('signup__form')
const loginForm = document.getElementById('login__form')
const layover = document.querySelector('.layover')
const close = document.querySelectorAll('.close')


function hideAlert (){
    const alert = document.querySelector('.alert')
    document.body.removeChild(alert)
}
function showAlert (type, message){
    const alert = document.createElement("div")
    alert.innerText = message;
    alert.classList.add(`alert`)
    alert.classList.add(type)
    document.body.appendChild(alert)
}

signup.addEventListener('click', () => {
    signupForm.classList.add('show__form')
    layover.classList.add('show__layover')
})

login.addEventListener('click', () => {
    loginForm.classList.add('show__form')
    layover.classList.add('show__layover')
})

close.forEach(ele => {
    ele.addEventListener('click', () => {
        signupForm.classList.remove('show__form')
        loginForm.classList.remove('show__form')
        layover.classList.remove('show__layover')
    })
})

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.querySelector('#loginemail input').value
    const password = document.querySelector('#loginpassword input').value
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/blogger/user/login',
            data: {
                email,
                password
            }
        })
        if (res.data.status === 'success') {
            showAlert('success', 'Logged In Successfully')
            loginForm.classList.remove('show__form')
            layover.classList.remove('show__layover')
            window.setTimeout(() => {
                hideAlert();
                location.assign('/blogger/home')
                
            }, 1500)
        }
    } catch (error) {
        console.log(error)
        showAlert('error', error.response.data.error)
        window.setTimeout(()=>{
            hideAlert();
        },1500)
    }

})
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();


    try {
        const userName = document.querySelector('#name input').value
        const password = document.querySelector('#signuppassword input').value
        const confirmPassword = document.querySelector('#confirm_password input').value
        const email = document.querySelector('#signupemail input').value
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/blogger/user/signup',
            data: {
                userName,
                email,
                password,
                confirmPassword
            }
        })
        if (res.data.status === 'success') {
            showAlert('success', 'Signed In Successfully')
            signupForm.classList.remove('show__form')
            layover.classList.remove('show__layover')
            window.setTimeout(() => {
                hideAlert();
                location.assign('/blogger/home')
            }, 1500);
        }
    } catch (error) {
        showAlert('error', error.response.data.message)
        window.setTimeout(()=>{
            hideAlert()
        },1500)
    }
})