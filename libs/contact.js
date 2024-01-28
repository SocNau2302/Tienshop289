getAPI("Cuahang").then((result) => {
    //console.log(result);
    cuaHang = result[0];
    // console.log(cuaHang);
    xuatCuahang(cuaHang, thCuahang)
}).catch((err) => {
    console.log(err);
})

CKEDITOR.replace("thNoidung", {
    customConfig: "contact.js"
})

const sendContact = () => {
    let noidung = CKEDITOR.instances.thNoidung.getData();
    let subject = document.querySelector("#thTieude").value;
    let hoten = document.querySelector("#thHoten").value;
    let email = document.querySelector("#thEmail").value;
    let tel = document.querySelector("#thDienthoai").value;

    let html = `<h4>Họ tên: ${hoten}</h4>Email: ${email} - Tel: ${tel} <br /><p><b>Nội dung Liên hệ</b></p>`;
    html += `${noidung}`

    let thongTin = {
        tieude: subject,
        noidung: html
    }
    //console.log(thongTin);
    // Gọi API
    apiLienhe(thongTin).then(result=>{
        alert(`Cám ơn bạn. Chúng tôi sẽ trả lời sớm nhất cho bạn`)
        console.log(result);
        window.history.back();
    })

}