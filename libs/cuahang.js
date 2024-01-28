let cuaHang={};

const xuatCuahang=(obj,tag)=>{
    let html=``;
    html+=`
    <h1 class="display-3">${obj.Ten}</h1>
    <p class="lead">${obj.Dia_chi}</p>
    <hr class="my-2">
    <p>${obj.Dien_thoai} - ${obj.Email}</p>
    <p class="lead">
        <a class="btn btn-primary btn-lg" href="Jumbo action link" role="button">Read More</a>
    </p>
    `
    tag.innerHTML=html;
}