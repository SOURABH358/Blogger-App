
console.log(axios)
const signup = document.getElementById('signup')
const login = document.getElementById('login')
const signupForm = document.getElementById('signup__form')
const loginForm = document.getElementById('login__form')
const layover = document.querySelector('.layover')
const close = document.querySelectorAll('.close')

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
            alert('success')
            location.assign('/blogger/blogs')
        }
    } catch (error) {
        alert(error)

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
            alert('success')
            location.assign('/blogger/home')
        }
    } catch (error) {
        console.log(error)
    }
})