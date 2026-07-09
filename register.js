const form = document.querySelector(".register-form");

const password = document.querySelectorAll('input[type="password"]')[0];
const confirmPassword = document.querySelectorAll('input[type="password"]')[1];

const fileInput = document.querySelector('input[type="file"]');

const submitBtn = document.querySelector('button[type="submit"]');

const uploadLabel = document.querySelector(".upload-box label");

const strength = document.createElement("small");

strength.style.display = "block";
strength.style.marginTop = "10px";
strength.style.color = "#94a3b8";

password.parentElement.insertAdjacentElement("afterend", strength);

function addToggle(input){

    const icon = document.createElement("i");

    icon.className = "fa-solid fa-eye";

    icon.style.cursor = "pointer";

    input.parentElement.appendChild(icon);

    icon.addEventListener("click",()=>{

        if(input.type==="password"){

            input.type="text";
            icon.className="fa-solid fa-eye-slash";

        }

        else{

            input.type="password";
            icon.className="fa-solid fa-eye";

        }

    });

}

addToggle(password);
addToggle(confirmPassword);

password.addEventListener("input",()=>{

    const value=password.value;

    if(value.length<6){

        strength.textContent="Weak Password";
        strength.style.color="#ef4444";

    }

    else if(value.length<10){

        strength.textContent="Medium Password";
        strength.style.color="#f59e0b";

    }

    else{

        strength.textContent="Strong Password";
        strength.style.color="#22c55e";

    }

});

fileInput.addEventListener("change",()=>{

    if(fileInput.files.length>0){

        uploadLabel.innerHTML=`<i class="fa-solid fa-circle-check"></i> ${fileInput.files[0].name}`;

    }

});

document.querySelectorAll(".input-box input").forEach(input=>{

    input.addEventListener("focus",()=>{

        input.parentElement.style.transform="translateY(-2px)";

    });

    input.addEventListener("blur",()=>{

        input.parentElement.style.transform="translateY(0)";

    });

});

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const inputs=document.querySelectorAll(".input-box input");

    for(let input of inputs){

        if(input.value.trim()===""){

            alert("Please fill all fields.");
            return;

        }

    }

    if(password.value!==confirmPassword.value){

        alert("Passwords do not match.");
        return;

    }

    if(!document.querySelector(".terms input").checked){

        alert("Please accept the Terms & Conditions.");
        return;

    }

    submitBtn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

    submitBtn.disabled=true;

    setTimeout(()=>{

        alert("Account created successfully!");

        window.location.href="login.html";

    },1800);

});