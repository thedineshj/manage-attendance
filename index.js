class AttendanceApp {

    constructor() {
        this.form = document.getElementById("form");
        this.totalClasses = document.getElementById("totalClasses");
        this.classesMissed = document.getElementById("classesMissed");
        this.attendance = document.getElementById("attendance");
    }

    localStorageIsSupported() {
        return (typeof(Storage) !== "undefined" && typeof(localStorage) !== "undefined");
    }
    noDataExists() {
        return (window.localStorage.getItem("data") === null);
    }
    calculateAttendance(totalClasses, classesMissed) {
        return (((totalClasses - classesMissed) / totalClasses) * 100).toFixed(2);
    }
    savaData(totalClasses, classesMissed) {
        const data = {
            totalClasses: totalClasses,
            classesMissed: classesMissed,
            lastUpdated: (new Date().toUTCString())
        };
        window.localStorage.setItem("data", JSON.stringify({
            "data": data
        }));
    }
    retrieveData() {
        return JSON.parse(window.localStorage.getItem("data"));
    }
    setTotalClasses(value) {
        this.totalClasses.value = value;
    }
    getTotalClasses() {
        return this.totalClasses.value;
    }
    setClassesMissed(value) {
        this.classesMissed.value = value;
    }
    getClassesMissed() {
        return this.classesMissed.value;
    }
    displayAttendance(attendance, lastUpdated) {
        this.attendance.classList.add("active");
        this.attendance.innerHTML = `
        <p> Attendance - ${attendance}</p>
        <p> Last updated on - ${lastUpdated}</p>
        <p style="cursor:pointer;text-decoration:underline;" onclick="window.localStorage.removeItem('data');"> clear data </p>
        `;
    }
    formSubmit() {
        if (!this.localStorageIsSupported) {
            window.alert("Sorry your browser doesn't support HTML5 Localstorage");
            return;
        }
        let totalClasses = this.getTotalClasses();
        let classesMissed = this.getClassesMissed();
        this.displayAttendance(
            this.calculateAttendance(totalClasses, classesMissed),
            (new Date().toUTCString())
        );
        this.savaData(totalClasses, classesMissed);
    }
    initialize() {
        window.onload = () => {
            if (!this.noDataExists()) {
                let data = this.retrieveData().data;
                this.displayAttendance(
                    this.calculateAttendance(data.totalClasses, data.classesMissed),
                    data.lastUpdated
                );
                this.setTotalClasses(data.totalClasses);
                this.setClassesMissed(data.classesMissed);
            }
        }
        form.onsubmit = (e) => {
            e.preventDefault();
            this.formSubmit();
        }
    }
}

const a = new AttendanceApp();
a.initialize();