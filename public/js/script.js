
const signup = document.getElementById('signup')
const login = document.getElementById('login')
const signupForm = document.getElementById('signup__form')
const loginForm = document.getElementById('login__form')
const layover = document.querySelector('.layover')
const close = document.querySelectorAll('.close')
const logOut = document.querySelector('.update__links .logOut')
const changeInfo = document.querySelector('.changeInfo')
const userInfoForm = document.querySelector('.user_info')
const deleteAccount = document.querySelector('.update__links .delete')
const changedPasswordForm = document.getElementById('change_password')
const changePassword = document.querySelector('.update__links .ChangePassword')
const createForm = document.querySelector('#create__form')

function hideAlert() {
    const alert = document.querySelector('.alert')
    document.body.removeChild(alert)
}
function showAlert(type, message) {
    const alert = document.createElement("div")
    alert.innerText = message;
    alert.classList.add(`alert`)
    alert.classList.add(type)
    document.body.appendChild(alert)
}

if (signup) {

    signup.addEventListener('click', () => {
        signupForm.classList.add('show__form')
        layover.classList.add('show__layover')
    })
}
if (login) {
    login.addEventListener('click', () => {
        loginForm.classList.add('show__form')
        layover.classList.add('show__layover')
    })

}
// changeInfo.addEventListener('click', () => {
//     userInfoForm.classList.add('show__form')
//     layover.classList.add('show__layover')
// })
if(deleteAccount){

    deleteAccount.addEventListener('click',async ()=>{
        try{
            const res = await axios({
                method: 'DELETE',
                url: 'http://127.0.0.1:3000/blogger/user/deleteuser'
            })
            if(res.data.status = 'success')
            {
                showAlert('success', 'User successfully deleted!')
                window.setTimeout(()=>{
                    hideAlert();
                    location.assign('/blogger/home')
                },1500)
            }
        }catch(error)
        {
            showAlert('error', error.response.data.error)
            window.setTimeout(() => {
                hideAlert();
            }, 1500)
        }
    })
}

if(changePassword)
{
    changePassword.addEventListener('click', () => {
        changedPasswordForm.classList.add('show__form')
        layover.classList.add('show__layover')
    })   
}

close.forEach(ele => {
    ele.addEventListener('click', () => {
        signupForm.classList.remove('show__form')
        loginForm.classList.remove('show__form')
        // userInfoForm.classList.remove('show__form')
        changedPasswordForm.classList.remove('show__form')
        layover.classList.remove('show__layover')
    })
})

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        const email = document.querySelector('#loginemail input').value
        const password = document.querySelector('#loginpassword input').value
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
        showAlert('error', error.response.data.error)
        window.setTimeout(() => {
            hideAlert();
        }, 1500)
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
        window.setTimeout(() => {
            hideAlert()
        }, 1500)
    }
})

if(logOut){
    logOut.addEventListener('click', async () => {
        try {
            const res = await axios({
                method: 'GET',
                url: 'http://127.0.0.1:3000/blogger/user/logout',
            })
            if (res.data.status === 'success') {
                showAlert('success', 'User successfully logged Out!');
                window.setTimeout(() => {
                    hideAlert();
                    location.assign('/blogger/home')
                }, 1500);
            }
        } catch (error) {
    
        }
    })

}

if(userInfoForm)
{
    userInfoForm.addEventListener('submit',async (e)=>{
        e.preventDefault();
    
        try{
            const userName = document.querySelector('#userName input').value
            const website = document.querySelector('#website input').value
            const country = document.querySelector('#country input').value
            const state = document.querySelector('#state input').value
            const city = document.querySelector('#city input').value
            const linkedin = document.querySelector('#linkedin input').value
            const twitter = document.querySelector('#twitter input').value
            const instagram = document.querySelector('#instagram input').value
            const github = document.querySelector('#github input').value
            if(userName==='')
            {
                throw 'Please provie userName'
            }
            else{
                const res = await axios({
                    method: 'PATCH',
                    url: 'http://127.0.0.1:3000/blogger/user/updateuser',
                    data:{
                        userName,website,country,state,city,linkedin,twitter, instagram, github
                    }
                    
                })
                if(res.data.status === 'success')
                {
                    showAlert('success', 'Data Updated Successfully!')
                    window.setTimeout(() => {
                        hideAlert();
                        location.assign('/blogger/account')
                    }, 1500);
                }
            }
        }catch(error){
            console.log(error)
            showAlert('error', error);
            window.setTimeout(()=>{
                hideAlert()
            },1500)
        }
    })
}

if(changedPasswordForm)
{
    changedPasswordForm.addEventListener('submit',async (e)=>{
        e.preventDefault();
        try{
            const currentPassword = document.querySelector('.currentPassword input').value
            const newPassword = document.querySelector('.newPassword input').value
            const confirmNewPassword = document.querySelector('.confirmNewPassword input').value
            const res = await axios({
                method: 'PATCH',
                url: 'http://127.0.0.1:3000/blogger/user/changepassword',
                data:{
                    currentPassword, 
                    newPassword,
                    confirmNewPassword
                }
            })
            if(res.data.status === 'success')
            {
                showAlert('success', 'Password successfully updated')
                changedPasswordForm.classList.remove('show__form')
                window.setTimeout(()=>{
                    hideAlert();
                    location.assign('/blogger/account')
                },1500)
            }
        }catch(error){
            console.log(error)
            showAlert('error', error)
            window.setTimeout(() => {
                hideAlert();
            }, 1500);
        }
    })
}

if(createForm)
{
    createForm.addEventListener('submit',async (e)=>{
        e.preventDefault();
        try{
            const title = document.getElementById('title').value
            const tags = document.getElementById('tags').value
            .split(",").map(el=>{
                return el.split(" ").map(str=>{
                    return str[0].toUpperCase() + str.substr(1)
                }).join(" ")
            })
            const hero = document.getElementById('image').value
            const content = document.getElementById('content').value
            const res = await axios({
                method: 'POST',
                url: 'http://127.0.0.1:3000/blogger/user/createblog',
                data:{
                    title,
                    tags,
                    hero,
                    content
                },
            })
            if(res.data.status === 'success')
            {
                showAlert('success', 'Blog published successfully!')
                window.setTimeout(()=>{
                    hideAlert();
                    location.assign('/blogger/create')
                },1500)
            }
        }catch(error)
        {
            console.log(error)
            showAlert('error', error)
            window.setTimeout(()=>{
                hideAlert();
            },1500)
        }
    })
}