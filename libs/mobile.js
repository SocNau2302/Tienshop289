let dsDienThoai = [];
let dsNhom = [];
let dsTmp = [];

// Lưu vào sessionStorage
if (sessionStorage.getItem("carts") != undefined) {
    carts = JSON.parse(sessionStorage.getItem("carts"))
}
Th_Gio_hang.innerHTML = carts.length;
// ###2cách###
 // const locGia=(tag)=>{
//     dsTmp.sort((a,b)=>{
//         return a.Don_gia_Ban - b.Don_gia_Ban;
//     })
//     let giaMin=dsTmp[0].Don_gia_Ban;
//     let giaMax=dsTmp[dsTmp.length-1].Don_gia_Ban;
//     let step=1000
//     tag.setAttribute("min",giaMin);
//     tag.setAttribute("max",giaMax);
//     tag.setAttribute("step",step);
    
//     document.getElementById("lblLocgia").innerHTML=`${Number(tag.value).toLocaleString()}<sup>đ</sup>`
// }
const locGia = (tag) => {
    dsTmp.sort((a, b) => {
        return a.Don_gia_Ban - b.Don_gia_Ban;
    })
    let giaMin = dsTmp[0].Don_gia_Ban;

    let giaMax = dsTmp[dsTmp.length - 1].Don_gia_Ban;
    let step = (giaMax - giaMin) / (dsTmp.length - 1);
    tag.setAttribute("min", giaMin);
    tag.setAttribute("max", giaMax);
    tag.setAttribute("step", step);
    tag.value = giaMax;

    document.getElementById("lblLocgia").innerHTML = `<= ${Number(tag.value).toLocaleString()}<sup>đ</sup>`
}

const xuatDienthoaitheogia = (tag) => {
    document.getElementById("lblLocgia").innerHTML = `<= ${Number(tag.value).toLocaleString()}<sup>đ</sup>`;
    let ds = dsTmp.filter(x => Number(x.Don_gia_Ban) <= Number(tag.value));
    xuatTivi(ds, thDienThoai);
}

const timTheoTen=(event)=>{
    //console.log(event.keyCode)
    
    if(event.keyCode==13){
        
        //console.log(event.target.value)
        let gtTim=event.target.value;
        console.log(gtTim.toLowerCase());
        
        let ds= dsTmp.filter(x=>x.Ten.toLowerCase().includes(gtTim.toLowerCase()));
        //console.log(ds.length);
        xuatDienThoai(ds, thDienThoai);
    }
}

const sapXepGia = (tag) => {
    let sort = tag.getAttribute("sort");
    //console.log(typeof sort);
    if (Number(sort) == 1) {
        // Tăng
        dsTmp.sort((a, b) => {
            return a.Don_gia_Ban - b.Don_gia_Ban;
        })
        tag.innerHTML = "Giá &Downarrow;"
        tag.setAttribute("sort", -1);
    } else {
        // Giảm
        dsTmp.sort((a, b) => {
            return b.Don_gia_Ban - a.Don_gia_Ban;
        })
        tag.innerHTML = "Giá &Uparrow;"
        tag.setAttribute("sort", 1);
    }
    xuatDienThoai(dsTmp, thDienThoai);

}
const sapXepTen = (tag) => {
    let sort = tag.getAttribute("sort");
    if (Number(sort) == 1) {
        // Tăng
        dsTmp.sort((a,b)=>{
            return a.Ten.toLowerCase().localeCompare(b.Ten.toLowerCase())
        })
        tag.innerHTML = "Tên &Downarrow;"
        tag.setAttribute("sort", -1);
    } else {
        // Giảm
        dsTmp.sort((a,b)=>{
            return b.Ten.toLowerCase().localeCompare(a.Ten.toLowerCase())
        })
        tag.innerHTML = "Tên &Uparrow;"
        tag.setAttribute("sort", 1);
    }
    xuatDienThoai(dsTmp, thDienThoai);

}

const xuatDienThoai = (ds = [], tag) => {
    let html = ``;
    ds.forEach((item) => {
        html += `
        <div class="col-6 col-md-4 col-xl-3 mb-4">
            <div class="card text-center h-100">
                <img class="card-img-top" src="${urlImages}/${item.Ma_so}.png" alt="">
                <div class="card-body">
                    <h4 class="card-title">${item.Ten} </h4>
                    <p class="card-text text-danger">${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup> </p>
                </div>
                <div class="card-footer">
                    <a href="#" class="btn btn-sm btn-outline-info">
                        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="addToCart('${item.Ma_so}',2)"  class="btn btn-sm btn-outline-danger">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
        
        
        `
    })
    tag.innerHTML = html
}

const taoNhom = () => {

    dsNhom = Array.from(new Set(dsDienThoai.map(x => x.Nhom.Ma_so))).map(Ma_so => {
        nhom = {
            Ma_so: Ma_so,
            Ten: dsDienThoai.find(x => x.Nhom.Ma_so == Ma_so).Nhom.Ten.toUpperCase(),
            Soluong: dsDienThoai.filter(x => x.Nhom.Ma_so == Ma_so).length
        }
        return nhom
    })

    dsNhom.unshift({
        "Ma_so": "ALL",
        "Ten": "ALL",
        "Soluong": dsDienThoai.length
    })
}

const xuatDienThoaiTheoNhom = (maNhom) => {
    if (maNhom != "ALL") {
        dsTmp = dsDienThoai.filter(x => x.Nhom.Ma_so == maNhom);
    } else {
        dsTmp = dsDienThoai
    }


    xuatDienThoai(dsTmp, thDienThoai);
    locGia(thLocGia);
}

const xuatNhom = (ds = [], tag) => {
    let html = ``;
    ds.forEach((item, index) => {
        let clsActive = (index == 0) ? "active" : ""
        let colorWhite = (index == 0) ? "text-white" : ""
        html += `
        <li class="list-group-item d-flex justify-content-between align-items-center ${clsActive}">
            <a href="javaScript:void(0)" onclick="xuatDienThoaiTheoNhom('${item.Ma_so}')" class="${colorWhite}" >${item.Ten}</a>
            <span class="badge badge-secondary badge-pill">${item.Soluong}</span>
        </li>
        `
    })
    tag.innerHTML = html;
}




// Call
getAPI("Cuahang").then((result) => {
    cuaHang = result[0];
    xuatCuahang(cuaHang, thCuahang)
    getAPI("dsDienthoai").then((result) => {
        lst.mobile = result;
        dsDienThoai = result;
        dsTmp = dsDienThoai;
        taoNhom();
        xuatNhom(dsNhom, thNhom)
        xuatDienThoai(dsDienThoai,thDienThoai)
        locGia(thLocGia)
        xuatQuangcao(dsDienThoai, thQuangcao)
    })
}).catch((err) => {
    console.log(err);
})