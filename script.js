// Input data
const dayInput = document.getElementById("day");
const yearInput = document.getElementById("year");
const monthInput = document.getElementById("month");

// Output data
const daysOutput = document.querySelector(".days");
const monthsOutput = document.querySelector(".months");
const yearsOutput = document.querySelector(".years");

const alertDiv = document.querySelector(".alert");
const button = document.getElementById("button")


// Function validation input
const validateInputs = (date, month, year) => {
   // Mengkonversi nilai kesebuah number sebelum diesksekusi
   if (isNaN(date) || isNaN(month) || isNaN(year)) {
      return "Please Enter Valid Values....";
   }

   // Validation usia / date
   if (date < 1 || date > 31) {
      return "Day must be between 1 and 31."
   }

   // Validation bulan / month
   if (month < 1 || month > 12) {
      return "Month must be between 1 and 12."
   }

   // Validation tahun / year
   // year tidak boleh lebih dari tahun sekarang
   if (year > new Date().getFullYear()) {
      return "The Year Entered Cannot Exceed The Current Year"
   }

   return null
}


// Calculation age / usia
const calculateAge = (birthDay, birthMonth, birthYear, currentDate) => {
   const { day, month, year } = currentDate;

   let age = year - birthYear;
   if (birthMonth > month || (birthMonth === month && birthDay > day)) {
      age--
   }
   return age;
}

// Calculation month
const calculateMonths = (birthDay, birthMonth, currentDate) => {
   const { day, month } = currentDate;

   let months;
   if (birthMonth < month) {
      //  Bulan lahir sudah lewat
      months = month - birthMonth
   } else if (birthMonth > month) {
      // Bulan lahir belum lewat
      months = (12 - birthMonth) + month
   } else {
      if (birthDay > day) {
         months = 0;
      } else {
         months = month - birthMonth;
      }
   }
   return months;
};

// Calculation hari / days 
const calculateDays = (birthDay, currentDate) => {
   const { day, month, year } = currentDate;

   let days;
   if (birthDay < day) {
      days = day - birthDay
   }
   // Jika hari tanggal lahir lebih besar dari hari saat ini
   else if (birthDay > day) {
      day = (numDays(year, month) - birthDay) + day
   } else {
      day = 0
   }

   return days;
};

// Function Menghitung jumlah hari dalam bulan tertentu
const numDays = (y, m) => {
   new Date(y, m, 0).getDate();
}

// y = years
// m = month
// 0 = ini memberikan  tanggal terakhir dari bulan sebelumnya.


// Function Display Alert
const displayAlert = (text, content) => {
   alertDiv.textContent = text;
   alertDiv.classList.add(`${content}`);

   // remove alert
   setTimeout(() => {
      alertDiv.textContent = "";
      alertDiv.classList.remove(`${content}`);
   }, 1000)
}

// Function utama untuk menangani handle click
const handleClick = () => {
   // Mengambil nilai dari inputan
   const birthDay = parseInt(dayInput.value);
   const birthMonth = parseInt(monthInput.value);
   const birthYear = parseInt(yearInput.value);

   // Memanggil function validation input
   const errorMessage = validateInputs(birthDay, birthMonth, birthYear);
   if (errorMessage) {
      displayAlert(errorMessage, "danger");
      return;
   }

   const currentDate = {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
   }

   const age = calculateAge(birthDay, birthMonth, birthYear, currentDate);
   const months = calculateMonths(birthDay, birthMonth, currentDate);
   const days = calculateDays(birthDay, currentDate);

   yearsOutput.textContent = age;
   monthsOutput.textContent = months;
   daysOutput.textContent = days;
}

// event Utama
button.addEventListener("click", handleClick);