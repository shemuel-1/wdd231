// ******************** NAVIGATION *********************

const navButton = document.getElementById("ham-button");
const navMenu = document.getElementById("nav-bar");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    navMenu.classList.toggle("show");
});



// ******************* COURSES ARRAY ********************

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]



// *********************** FILTERED ARRAYS *************************

// Filter Completed Courses
const completedCourses = courses.filter(course => course.completed);
// Filter WDD Courses
const wddCourses = courses.filter(course => course.subject === 'WDD');
// Filter CSE Courses
const cseCourses = courses.filter(course => course.subject === 'CSE');



// *********************  DISPLAY COURSES ********************

// HTML element selectors
const courseLists = document.getElementById("courseCards");
const wddContainer = document.getElementById("wddContainer");
const cseContainer = document.getElementById("cseContainer");
const allContainer = document.getElementById("allContainer");

// Display All courses by default


// Display all courses by default (inline logic)
courseLists.innerHTML = "";
let totalAll = 0;
courses.forEach(course => {
    const courseList = document.createElement('li');
    if (course.completed) {
        courseList.textContent = `${course.subject} ${course.number} \u2713`;
    } else {
        courseList.textContent = `${course.subject} ${course.number}`;
    }
    courseLists.appendChild(courseList);
    totalAll += course.credits;
});
document.getElementById('totalCredits').textContent = `Total Credits Displayed Above: ${totalAll}`;

// Click Event listener for WDD Courses


wddContainer.addEventListener("click", () => {
    courseLists.innerHTML = "";
    let totalWdd = 0;
    wddCourses.forEach(wddCourse => {
        const courseList = document.createElement('li');
        if (wddCourse.completed) {
            courseList.textContent = `${wddCourse.subject} ${wddCourse.number} \u2713`;
        } else {
            courseList.textContent = `${wddCourse.subject} ${wddCourse.number}`;
        }
        courseLists.appendChild(courseList);
        totalWdd += wddCourse.credits;
    });
    document.getElementById('totalCredits').textContent = `Total Credits Displayed Above: ${totalWdd}`;
});

// Click Event listener for CSE Courses


cseContainer.addEventListener("click", () => {
    courseLists.innerHTML = "";
    let totalCse = 0;
    cseCourses.forEach(cseCourse => {
        const courseList = document.createElement('li');
        if (cseCourse.completed) {
            courseList.textContent = `${cseCourse.subject} ${cseCourse.number} \u2713`;
        } else {
            courseList.textContent = `${cseCourse.subject} ${cseCourse.number}`;
        }
        courseLists.appendChild(courseList);
        totalCse += cseCourse.credits;
    });
    document.getElementById('totalCredits').textContent = `Total Credits Displayed Above: ${totalCse}`;
});

// Click Event listener for All Courses


allContainer.addEventListener("click", () => {
    courseLists.innerHTML = "";
    let totalAll = 0;
    courses.forEach(course => {
        const courseList = document.createElement('li');
        if (course.completed) {
            courseList.textContent = `${course.subject} ${course.number} \u2713`;
        } else {
            courseList.textContent = `${course.subject} ${course.number}`;
        }
        courseLists.appendChild(courseList);
        totalAll += course.credits;
    });
    document.getElementById('totalCredits').textContent = `Total Credits Displayed Above: ${totalAll}`;
});





// ************************ Date and Last Modified For Footer ****************

// select the DOM elements for output
const year = document.querySelector('#currentYear');
const date = document.querySelector('#lastModified');

// Get the date using the Date object
const today = new Date();

year.innerHTML = today.getFullYear();
date.innerHTML = document.lastModified;







