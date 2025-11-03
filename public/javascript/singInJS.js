document.querySelector(".signin-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // ป้องกันการ reload หน้า

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log("in 1");
  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log("in 2");
    console.log("data: ", data);
    console.log("data userID: ", data.userID);

    if (data.token) {
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('userID', data.userID)
          const value = localStorage.getItem('userID');
          console.log('value of userID from storage:', value);
          // window.location.href = `/information/getUser/${value}`;
          window.location.href = `/infouser`;
        });
    } else {
        Swal.fire({
          icon: "error",
          title: "ไม่สำเร็จ",
          text: data.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
      })
    }
  } catch (err) {
    Swal.fire({
        icon: "error",
        title: "ไม่สำเร็จ",
        text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้"
    })
  }
});

document.querySelector(".btn-singUp").addEventListener("click", () => {
  window.location.href = "/signup";
});
