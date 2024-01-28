const xuatQuangcao=(ds=[],tag)=>{
    let html=``;
    html+=`<div id="carouselId" class="carousel slide" data-ride="carousel">`;
    html+=`<div class="carousel-inner" role="listbox">`
    ds.slice(0,3).forEach((item,index)=>{
        let clsActive=(index==0)?"active":"";
        html+=`
        <div class="carousel-item ${clsActive}">
            <img src="${urlImages}/${item.Ma_so}.png" alt="First slide" class="img-fluid">
            <div class="carousel-caption d-none d-md-block">
                <h3>${item.Ten}</h3>
                <p>${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup> </p>
            </div>
        </div>
        `
    })  
    html+=`
    
    </div>
        <a class="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselId" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    `
    tag.innerHTML=html;
}

