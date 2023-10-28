function job_check (job) {
    return true; // нет условий формата
}

let status = document.querySelectorAll('input[name=status]');
let status_labels = document.querySelectorAll('label[name=status]');

let course_select = document.querySelectorAll('input[name=course]');
let course_labels = document.querySelectorAll('label[name=course]');
let course = "";

let degree_select = document.querySelector('#degree_select');
let degree_label = document.querySelector('#degree_lable');
let degree = "";

let faculty_select = document.querySelector('#faculty_select');
let faculty_label = document.querySelector('#faculty_label');
let faculty = "";

// здесь должен быть выбор ОП
let course_4 = "";

let display_course = document.querySelector('#study_show');

let job_full = document.querySelector('#job');
let job_error_format = document.querySelector('#job_error_format');
let job_error_empty = document.querySelector('#job_error_empty');
let display_job = document.querySelector('#job_show');

course_labels.forEach(onclick = function () {
    for(let i=0; i<6; i++) {
        if (course_select[i].checked) {
            course = (i + 1) + " курс";
        }
    }
    if (course_select[6].checked) {
        course = "Уже окончил";
    }
    display_course.innerHTML = course + degree + faculty + course_4;
});

degree_select.onmouseup = function() {
    if (degree_select.value != "empty") {
        degree_label.hidden = true;
        if (degree_select.value == "bachelor") {
            degree = " бакалавриат";
        } else if (degree_select.value == "specialist") {
            degree = " специалитет";
        } else if (degree_select.value == "master") {
            degree = " магистратуру";
        } else if (degree_select.value == "graduate") {
            degree = " аспирантуру";
        }
    } else {
        degree_label.hidden = false;
        degree = "";
    }
    display_course.innerHTML = course + degree + faculty + course_4;
}

faculty_select.onmouseup = function() {
    if (faculty_select.value != "empty") {
        faculty_label.hidden = true;
        if (faculty_select.value == "first") {
            faculty = " МИЭМ";
        } else if (faculty_select.value == "second") {
            faculty = " ВШБ";
        } else if (faculty_select.value == "third") {
            faculty = " ФКН";
        } else if (faculty_select.value == "last") {
            faculty = " ШИЯ";
        }
    } else {
        faculty_label.hidden = false;
        faculty = "";
    }
    display_course.innerHTML = course + degree + faculty + course_4;
}

job_full.onblur = function () {
    if (job_full.value){
        job_error_empty.hidden = true;
        if (job_check(job_full.value)) {
            job_full.classList.remove('invalid');
            display_job.innerHTML = job_full.value;
            job_error_format.hidden = true;
        } else {
            job_error_format.hidden = false;
            job_full.classList.add('invalid');
        }
    } else {
        job_error_format.hidden = true;
        job_full.classList.add('invalid');
        job_error_empty.hidden = false;
    } 
}