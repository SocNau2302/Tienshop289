const urlService = `http://localhost:8080`;
const urlImages = `http://localhost:8080`;

const getAPI=(apiName)=> {
    return new Promise((resolve, reject) => {
        const Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Doi_tuong_Kq = JSON.parse(Xu_ly_HTTP.responseText)
            resolve(Doi_tuong_Kq)
        }
        let endPoint = apiName
        Xu_ly_HTTP.open("GET", `${urlService}/${endPoint}`)
        Xu_ly_HTTP.send()
    })
}

const randomColor = () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return `#${color}`;
}


const apiLienhe=(thongTin)=>{
    return new Promise((resolve, reject) => {
        let Du_lieu = {}
        let Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText
            Du_lieu = JSON.parse(Chuoi_JSON)
            resolve(Du_lieu)
        }
        let endPoint = 'SendMail'
        
        Xu_ly_HTTP.open("POST", `${urlService}/${endPoint}`)
        Xu_ly_HTTP.send(JSON.stringify(thongTin))
    })
}

const apiDathang=(donDathang)=>{
    return new Promise((resolve, reject) => {
        let Du_lieu = {}
        let Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText
            Du_lieu = JSON.parse(Chuoi_JSON)
            resolve(Du_lieu)
        }
        let endPoint = 'Dathang';
        
        Xu_ly_HTTP.open("POST", `${urlService}/${endPoint}`)
        Xu_ly_HTTP.send(JSON.stringify(donDathang))
    })
}
