let carts = [];

let lst = {};
/*
    Tivi: 1
    Mobile: 2
    Food: 3
*/

const capNhatSoluong=(key,tagSoluong)=>{
    //console.log(`${key} - ${tagSoluong.value}`);
    let soLuongMoi=tagSoluong.value;
    carts = JSON.parse(sessionStorage.getItem("carts"));
    let vt=carts.findIndex(item=>item.maso==key);
    carts[vt].soluong=soLuongMoi
    let thanhTien=soLuongMoi* carts[vt].dongiaban;
    // Cập nhật lại cart sessionStorage
    sessionStorage.setItem("carts",JSON.stringify(carts));
    document.getElementById(`tt${key}`).innerHTML=`${thanhTien.toLocaleString()}<sup>đ</sup>`
    tongThanhtien();
}

const xoaGiohang=()=>{
    sessionStorage.removeItem("carts");
    window.history.back();
}

const xoaSanpham=(key)=>{
    //console.log(key);
    carts = JSON.parse(sessionStorage.getItem("carts"));
    let vt=carts.findIndex(item=>item.maso==key);
    // Xóa Key cart
    carts.splice(vt,1);
    // Cập nhật lại cart sessionStorage
    sessionStorage.setItem("carts",JSON.stringify(carts));
    // Xuất Cart
    if(carts.length!=0){
        xuatSanphamMua(carts, thSanPhamMua);
    }else{
        xoaGiohang();
    }
}

const tongThanhtien = () => {
    let tong = 0
    carts = JSON.parse(sessionStorage.getItem("carts"));
    carts.forEach(item => {
        tong += Number(item.soluong) * Number(item.dongiaban);
    })
    Th_Tong.innerHTML = `Tổng thành tiền:${tong.toLocaleString()}<sup>đ</sup>`
}

const openCart = () => {
    if (sessionStorage.getItem("carts") != undefined) {
        window.location = `../cart/`
    }
}

const xuatSanphamMua = (carts = [], tag) => {
    let html = ``;
    carts.forEach((item) => {
        let thanhTien = item.soluong * item.dongiaban
        html += `
        <tr class="text-nowrap">
              <td scope="row" class="text-center" style="width:10%">
                <img class="img-fluid" src="${urlImages}/${item.maso}.png" alt="">
              </td>
              <td>${item.ten}</td>
              <td class="text-right">
                <input type="number" onchange="capNhatSoluong('${item.maso}',this)" min="1" max="10" value="${item.soluong}">
              </td>
              <td class="text-right">
              ${item.dongiaban.toLocaleString()}<sup>đ</sup>
              </td>
              <td class="text-right" id="tt${item.maso}">
              ${thanhTien.toLocaleString()}<sup>đ</sup>
              </td>
              <td class="text-center">
                <button class="btn btn-danger btn-sm" onclick="xoaSanpham('${item.maso}')">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
        `
    })
    html += `
    <tr class="text-nowrap">
        <td colspan="6" class="text-right text-danger">
            <span id="Th_Tong" style="font-weight: bold;">Tổng Thành tiền:19.000.000<sup>đ</sup></span>
        </td>
    </tr>
    `
    tag.innerHTML = html;
    tongThanhtien();
}

const addToCart = (key, nhom) => {
    let result = (nhom == 1) ? lst.tivi : (nhom == 2) ? lst.mobile : lst.food;

    let maso = key;
    let value = 1
    let vt = -1;
    //console.log(`Mã số:${maso} - Nhóm: ${nhom} - số lượng: ${value}`);

    // Lưu vào sessionStorage
    if (sessionStorage.getItem("carts") != undefined) {
        carts = JSON.parse(sessionStorage.getItem("carts"))
        vt = carts.findIndex(item => item.maso == key);
    }

    if (vt == -1) {
        let tmp = result.find(x => x.Ma_so == key);
        let cart = {
            maso: key,
            soluong: value,
            ten: tmp.Ten,
            dongiaban: Number(tmp.Don_gia_Ban),
            nhom: nhom
        }

        carts.push(cart) // Thêm
    } else {
        //carts.splice(vt, 1) // Xóa
        carts[vt].soluong += value // Cập nhật lại số lượng
    }
    console.log(carts);

    if (carts.length > 0) {
        sessionStorage.setItem("carts", JSON.stringify(carts));
    } else {
        sessionStorage.removeItem("carts");
    }

    Th_Gio_hang.innerHTML = carts.length;

}

getAPI("Cuahang").then((result) => {
    cuaHang = result[0];
    xuatCuahang(cuaHang, thCuahang);
    if (sessionStorage.getItem("carts") != undefined) {
        carts = JSON.parse(sessionStorage.getItem("carts"));
        xuatSanphamMua(carts, thSanPhamMua);
    }

})


const datHang = () => {
    let dsDonHang = []
    carts = JSON.parse(sessionStorage.getItem("carts"));
    let Khach_hang = {
        "Ho_ten": document.querySelector("#Th_Ho_ten").value,
        "Dien_thoai": document.querySelector("#Th_Dien_thoai").value,
        "Email": document.querySelector("#Th_Email").value,
        "Dia_chi": document.querySelector("#Th_Dia_chi").value
    }
    carts.forEach(item => {
        let donDathang = {
            "Ngay_Dat_hang": new Date().toLocaleDateString(),
            "Ngay_Giao_hang": document.querySelector("#Th_Ngay_Giao_hang").value,
            "So_luong": Number(item.soluong),
            "Don_gia_Ban": Number(item.dongiaban),
            "Tien": Number(item.soluong) * Number(item.dongiaban),
            "Trang_thai": "CHUA_GIAO_HANG",
            "Khach_hang": Khach_hang
        };
        let maso = item.maso;
        let donhang = {
            nhom:item.nhom,
            key: maso,
            dathang: donDathang
        }
        dsDonHang.push(donhang)
        console.log(dsDonHang);
    })
    // Gọi API 
    apiDathang(dsDonHang).then(result=>{
        console.log(result);
        alert('Đơn đặt hàng thành công...')
        xoaGiohang();
    }).catch(err=>{
        console.log(err);
    })
}