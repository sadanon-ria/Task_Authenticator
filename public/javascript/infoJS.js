window.addEventListener('DOMContentLoaded', async () => {
    try {
        const havetoken = localStorage.getItem('token');
        const idUser = localStorage.getItem('userID')
        console.log(idUser)
        console.log("get Token from localStorage:", havetoken)

        if (!havetoken || !idUser){
            Swal.fire({
                icon: "error",
                title: "ไม่สำเร็จ",
                text: "ไม่มีสิทธ์ในการเข้าถึง กรุณา login ก่อน",
            }).then(() => { window.location.href = "/"; });
            return;
        }
        const apiUrl = `http://localhost:5000/information/getUser/${idUser}`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: { 
                'Authorization': `Bearer ${havetoken}` 
            }
        });

        const data = await response.json();
        console.log("response message from fetch api: "+ data.message);
        console.log("response from fetch api: ", data);
        if (data.data && data.data.username) {
            document.getElementById('username').value = data.data.username;
            document.getElementById('user-type').value = data.data.user_type;
            document.getElementById('full-name').value = data.data.fullname;
            document.getElementById('address-no').value = data.data.address_no;
            document.getElementById('address-moo').value = data.data.address_moo;
            document.getElementById('address-village').value = data.data.address_village;
            document.getElementById('address-soi').value = data.data.address_soi;
            document.getElementById('address-road').value = data.data.address_road;
            document.getElementById('subdistrict').value = data.data.subdistrict;
            document.getElementById('district').value = data.data.district;
            document.getElementById('province').value = data.data.province;
            document.getElementById('postal-code').value = data.data.postal_code;
            document.getElementById('contact-title').value = data.data.contact_title;
            document.getElementById('contact-firstname').value = data.data.contact_firstname;
            document.getElementById('contact-lastname').value = data.data.contact_lastname;
            document.getElementById('contact-phone').value = data.data.contact_phone;
            document.getElementById('contact-email').value = data.data.contact_email;
            document.getElementById('ref-code').value = data.data.ref_code;
        } else {
            Swal.fire({
                icon: "error",
                title: "ไม่สำเร็จ",
                text: data.message,
            }).then(() => { window.location.href = "/"; });
            console.error("err from authmiddleware: "+ data.message);
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
        }

    } catch (err) {
        console.error(err);
        Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลผู้ใช้ได้"
    });
    }

    document.getElementById("btn-logout").addEventListener("click", () => {
        Swal.fire({
            icon: "warning",
            title: "ต้องการออกจากระบบหรือไม่",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "ใช่",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if(result.isConfirmed){
                localStorage.removeItem("token");
                localStorage.removeItem("userID");
            
                window.location.href = `/`;
            }
        });
    });
})

