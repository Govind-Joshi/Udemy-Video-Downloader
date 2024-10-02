console.log('inject');
window.onload =()=>{
function redirectlogin(){
    const imageUrl = chrome.runtime.getURL('imges/udmy_icon.png');
return(
    `<div id="loginPopup" class="popup">
    <div class="popup-content">
        <span class="close" id="closepopup">&times;</span>
        <img src="${imageUrl}" alt="Udemy Logo" class="logo">
        <p>Please log in to continue the download</p>
      
        <button class="login-btn" id ="login_btn1" >Login</button>
    </div>
</div>`
)
}
// setTimeout(()=>{
//     document.body.innerHTML += redirectlogin();
// },5000)
// let divv = document.createElement('div')
// document.body.append(divv);
// divv.innerHTML = redirectlogin;
var flg = "none"
chrome.runtime.onMessage.addListener((res, sender, sendResponse) => {
    if (res.msg === 'renderlogin') {
        console.log('login click before')
        const popup = document.querySelector('.popup');
        if(!popup){
            console.log('login click before')
        // document.body.innerHTML += redirectlogin();
        document.getElementsByClassName('ud-main-content-wrapper')[0].innerHTML += redirectlogin();
        setTimeout(()=>{
    if(document.getElementById('login_btn1')){
        document.getElementById('login_btn1').addEventListener('click',()=>{
            console.log('login click')
            window.location.href = 'https://www.udemy.com/join/login-popup/?locale=en_US&response_type=html&next=https%3A%2F%2Fwww.udemy.com%2Fcourse%2Fthe-complete-web-development-bootcamp%2F%3FcouponCode%3DOF52424';
            // document.querySelectorAll('.ud-header.ud-text-sm.desktop-header-module--header--a5wri.desktop-header-module--flex-middle--k0Teb .desktop-header-module--gap-auth-button--f25sS a')[0].click();
        })
      
        document.getElementById('closepopup').addEventListener('click',()=>{
            const popup = document.querySelector('.popup');
                // document.body.removeChild(popup);
                document.getElementsByClassName('ud-main-content-wrapper')[0].removeChild(popup)
        })

    }
    },2000) 

        }
        
    }
});


// function closePopup() {
//     const popup = document.querySelector('.popup');
//     document.body.removeChild(popup);
//     // document.getElementById('loginPopup').style.display = "none";
// }




}

