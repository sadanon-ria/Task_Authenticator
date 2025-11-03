document.querySelector(".register-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // ป้องกันการ reload หน้า

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user_type = document.getElementById("user-type").value;
  const fullname = document.getElementById("full-name").value;
  const address_no = document.getElementById("address-no").value;
  const address_moo = document.getElementById("address-moo").value;
  const address_village = document.getElementById("address-village").value;
  const address_soi = document.getElementById("address-soi").value;
  const address_road = document.getElementById("address-road").value;
  const subdistrict = document.getElementById("subdistrict").value;
  const district = document.getElementById("district").value;
  const province = document.getElementById("province").value;
  const postal_code = document.getElementById("postal-code").value;
  const contact_title = document.getElementById("contact-title").value;
  const contact_firstname = document.getElementById("contact-firstname").value;
  const contact_lastname = document.getElementById("contact-lastname").value;
  const contact_phone = document.getElementById("contact-phone").value;
  const contact_email = document.getElementById("contact-email").value;
  const ref_code = document.getElementById("ref-code").value;

  try {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, user_type, fullname, address_no,
        address_moo , address_village, address_soi, address_road,
        subdistrict, district, province, postal_code, contact_title,
        contact_firstname, contact_lastname, contact_phone, contact_email, ref_code }),
    });

    const data = await response.json();

    if ( response.ok ) {
        Swal.fire({
          icon: "success",
          title: data.message,
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          window.location.href = "/";});
        } else {
          Swal.fire({
            icon: "error",
            title: "ไม่สำเร็จ",
            text: data.error || "Fail to create user"
          })
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "ไม่สำเร็จ",
          text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้"
        })
      }
    }
  );

document.querySelector(".btn-cancel").addEventListener("click", () => {
  window.location.href = "/";
});
