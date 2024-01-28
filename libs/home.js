// Lưu vào sessionStorage
if (sessionStorage.getItem("carts") != undefined) {
    carts = JSON.parse(sessionStorage.getItem("carts"))
}
Th_Gio_hang.innerHTML = carts.length;


const xuatSanphamKhuyenmai=(ds=[],tag,nhom)=>{
    let html=``;
    ds.slice(0,4).forEach((item)=>{
        html+=`
    <div class="col-6 col-md-4 col-xl-3">
            <div class="card text-center">
                <img class="card-img-top" src="${urlImages}/${item.Ma_so}.png" alt="">
                <div class="card-body">
                    <h4 class="card-title">${item.Ten}</h4>
                    <p class="card-text text-danger">${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup> </p>
                </div>
                <div class="card-footer">
                    <a href="javaScript:void(0)" onclick="showModal(this)"  class="btn btn-sm btn-outline-info">
                        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="addToCart('${item.Ma_so}',${nhom})"  class="btn btn-sm btn-outline-danger">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
    })
    
    

    tag.innerHTML=html;
}

getAPI("Cuahang").then((result) => {
    //console.log(result);
    cuaHang = result[0];
    // console.log(cuaHang);
    xuatCuahang(cuaHang, thCuahang)
    getAPI("dsTivi").then((result) => {
        lst.tivi=result;
        xuatSanphamKhuyenmai(result, thTivi,1);
        getAPI("dsDienthoai").then((result) => {
            xuatSanphamKhuyenmai(result, thMobile,2);
            lst.mobile=result;
            getAPI("dsMathang").then((result) => {
                xuatSanphamKhuyenmai(result, thFood,3);
                lst.food=result;
                //console.log(lst)
                document.getElementById("thLoading").classList.add("d-none");
                document.getElementById("thMain").classList.remove("d-none");
                
            })
        })
    })
}).catch((err) => {
    console.log(err);
})