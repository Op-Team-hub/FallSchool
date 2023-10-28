function show_contact_check () {
    let tg = telegram_full.value;
    let pn = phone_number_full.value;
    if (tg && pn && telegram_check(tg) && phone_number_check(pn)) {
        button_show_contact.disabled = false;
        display_telegram.innerHTML = tg;
        display_phone_number.innerHTML = pn;
        button_show_contact.style.opacity = 1;
    } else {
        button_show_contact.style.opacity = 0.2;
        button_show_contact.disabled = true;
        display_show_contact.style.display = "none";
    }
}

function continue_check () {
    for (let [key, value] of checklist) {
        if (!value) {
            //console.log(key);
            button_continue.style.opacity = 0.2;
            button_continue.disabled = true;
            return
        }
    }
    button_continue.style.opacity = 1;
    button_continue.disabled = false;
}

function age_text(age) {
    count = age % 100;
    if (count >= 5 && count <= 20) {
        return ' лет';
    } else {
        count = count % 10;
        if (count == 1) {
            return ' год';
        } else if (count >= 2 && count <= 4) {
            return ' года';
        } else {
            return ' лет';
        }
    }
}
    
function name_check(name) {
    if (name.search(/\d/) != -1) {
        return false;
    } else if (name.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) != -1) {
        return false;
    }
    return true;
}

function age_det (date) {
    let now = new Date();
    let age = now.getFullYear() - Number(date.substring(0,4));
    if (age < 0) {
        return -1;
    } else {
        if (Number(date.substring(5,7))-1 > now.getMonth()) {
            age--;
        } else if (Number(date.substring(5,7))-1 == now.getMonth()) {
            if(Number(date.substring(8,10)) > now.getDate()) {
                age--;
            }
        }
    }
    return age;
}

function telegram_check (telegram) {
    if (telegram[0] == "@") {
        return true;
    } else {
        return false;
    }
}

function phone_number_check (phone_number) {
    if (phone_number.search(/[A-Za-z]/) != -1) {
        return false;
    } else {
        return true;
    }
}


let user_name_full = document.querySelector('#name');
let user_name_error_format = document.querySelector('#name_error_format');
let user_name_error_empty = document.querySelector('#name_error_empty');

let date_full = document.querySelector('#input_date');
let date_error_format = document.querySelector('#date_error_format');
let date_error_empty = document.querySelector('#date_error_empty');

let telegram_full = document.querySelector('#telegram_id');
let telegram_error_format = document.querySelector('#telegram_error_format');
let telegram_error_empty = document.querySelector('#telegram_error_empty');

let phone_number_full = document.querySelector('#phone_number');
let phone_error_format = document.querySelector('#phone_error_format');
let phone_error_empty = document.querySelector('#phone_error_empty');

let bio_full = document.querySelector('#bio');
let bio_error_empty = document.querySelector('#bio_error_empty');

let gender = document.querySelectorAll('input[name=gender]');
let gender_lables = document.querySelectorAll('label[name=gender]');

let display_ellipse = document.querySelectorAll('#ellipse');
let display_show_contact = document.querySelector('#contact_info');
let display_user_name = document.querySelector('.id_card_name');
let display_gender = document.querySelector('#gender_show');
let display_age = document.querySelector('#age');
let display_phone_number = document.querySelector('#phone_number_info');
let display_telegram = document.querySelector('#telegram_info');
let display_bio = document.querySelector('#bio_show');

let button_expand = document.querySelector('#expand_button');
let icon_expand = document.querySelector('#expand_icon');
let bool_expanded = true;

let button_show_contact = document.querySelector('.button_show_contact');
let button_continue = document.querySelector('.button_continue');

let checklist = new Map();
checklist.set("name", false);
checklist.set("gender", false);
checklist.set("date", false);
checklist.set("tg", false);
checklist.set("phone", false);
checklist.set("bio", false);


user_name_full.onblur = function () {
    // console.log("blur");
    continue_check();
    if (user_name_full.value){
        user_name_error_empty.hidden = true;
        if (name_check(user_name_full.value)) {
            user_name_full.classList.remove('invalid');
            display_user_name.innerHTML = user_name_full.value;
            checklist.set("name", true);
            user_name_error_format.hidden = true;
        } else {
            // console.log("name error");
            checklist.set("name", false);
            user_name_error_format.hidden = false;
            user_name_full.classList.add('invalid');
        }
    } else {
        user_name_error_format.hidden = true;
        checklist.set("name", false);
        // console.log("empty");
        user_name_full.classList.add('invalid');
        user_name_error_empty.hidden = false;
    } 
}

telegram_full.onblur = function () {
    show_contact_check();
    continue_check();
    checklist.set("tg", false);
    if (telegram_full.value) {
        telegram_error_empty.hidden = true;
        if (telegram_check(telegram_full.value)) {
            telegram_full.classList.remove('invalid');
            display_telegram.innerHTML = telegram_full.value;
            checklist.set("tg", true);
            telegram_error_format.hidden = true;
        } else {
            telegram_error_format.hidden = false;
            telegram_full.classList.add('invalid');
        }        
    } else {
        telegram_error_format.hidden = true;
        telegram_full.classList.add('invalid');
        telegram_error_empty.hidden = false;
    }
}

phone_number_full.onblur = function () {
    show_contact_check();
    continue_check();
    checklist.set("phone", false);
    if (phone_number_full.value) {
        phone_error_empty.hidden = true;
        if (phone_number_check(phone_number_full.value)) {
            phone_number_full.classList.remove('invalid');
            display_phone_number.innerHTML = phone_number_full.value;
            checklist.set("phone", true);
            phone_error_format.hidden = true;
        } else {
            phone_error_format.hidden = false;
            phone_number_full.classList.add('invalid');
        }        
    } else {
        phone_error_format.hidden = true;
        phone_number_full.classList.add('invalid');
        phone_error_empty.hidden = false;
    }
}

gender_lables.forEach(onclick = function () {
    continue_check();
    if (gender[0].checked) {
        display_gender.innerHTML = "Парень";
        display_ellipse[0].hidden = false;
        checklist.set("gender", true);
    } else if (gender[1].checked) {
        display_gender.innerHTML = "Девушка";
        display_ellipse[0].hidden = false;
        checklist.set("gender", true);
    }
});

date_full.onblur = function () {
    continue_check();
    checklist.set("date", false);
    if (date_full.value) {
        let date = age_det(date_full.value);
        if ((date != -1) && (date <= 200)) {
            date_error_empty.hidden = true;
            date_error_format.hidden = true;
            date_full.classList.remove('invalid');
            display_age.innerHTML = date  + age_text(date);
            checklist.set("date", true);
            display_ellipse[1].hidden = false;
        } else {
            date_error_empty.hidden = true;
            date_error_format.hidden = false;
            date_full.classList.add('invalid');
        }
    } else {
        date_error_format.hidden = true;
        date_error_empty.hidden = false;
        date_full.classList.add('invalid');
    }
}

bio_full.onblur = function () {
    continue_check();
    checklist.set("bio", false);
    if (bio_full.value != '') {
        bio_error_empty.hidden = true;
        bio_full.classList.remove('invalid');
        checklist.set("bio", true);
        if (bio_full.value.length < 62) {
            display_bio.innerHTML = bio_full.value
            button_expand.hidden = true;
            icon_expand.hidden = true;
        } else {
            display_bio.innerHTML = bio_full.value.substring(0, 62) + "...";
            button_expand.hidden = false;
            icon_expand.hidden = false;
        }

        button_expand.onclick = function () {
            if (bool_expanded) {
                bool_expanded = false;
                button_expand.innerHTML = "Свернуть";
                display_bio.innerHTML = bio_full.value;
                icon_expand.src="icons/Arrow_up.svg";
            } else {
                bool_expanded = true;
                button_expand.innerHTML = "Развернуть";
                display_bio.innerHTML = bio_full.value.substring(0, 62) + "...";
                icon_expand.src="icons/Arrow_down.svg";
            }
        }

    } else {
        bio_error_empty.hidden = false;
        bio_full.classList.add('invalid');
    }
}

button_continue.onclick = function () {
    let user_name = user_name_full.value;
    let telegram = telegram_full.value;
    let phone_number = phone_number_full.value;
    let date = date_full.value;

    if (telegram && phone_number) {
        display_telegram.innerHTML = telegram;
        display_phone_number.innerHTML = phone_number;
        button_show_contact.style.opacity = 1;
    }

    if (user_name){
        display_user_name.innerHTML = user_name;
    }
    
    if (date) {
        display_age.innerHTML = age_det(date);
        display_ellipse[1].hidden = false;
    }
    
    if (gender[0].checked) {
        display_gender.innerHTML = "Парень";
        display_ellipse[0].hidden = false;
    } else if (gender[1].checked) {
        display_gender.innerHTML = "Девушка";
        display_ellipse[0].hidden = false;
    }

    // console.log(date);
    // console.log(user_name, telegram, phone_number, date)
}

button_show_contact.onclick = function () {
    if (display_show_contact.style.display == "none") {
        display_show_contact.style.display = "flex";
    } else {
        display_show_contact.style.display = "none";
    }
}
