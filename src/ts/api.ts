import IProducto from './interfaces/IProducto';

const urlGet: string = "http://dtai.uteq.edu.mx/~crupal192/mercaganga/index.php/producto";
const urlPost: string = "http://dtai.uteq.edu.mx/~crupal192/mercaganga/index.php/producto/";
const urlPut: string = "http://dtai.uteq.edu.mx/~crupal192/mercaganga/index.php/producto/update/";
const urlDelete: string = "http://dtai.uteq.edu.mx/~crupal192/mercaganga/index.php/producto/delete/";

export async function get() {
    return new Promise((resolve, reject) => {
        const headers = {
            "Content-Type": "application/json"
        };

        fetch(urlGet, {
            method: "GET",
            headers: headers,
            mode: "cors"
        })
            .then(resp => resp.json())
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function create(data: IProducto) {
    return new Promise((resolve, reject) => {
        const headers = {
            "Content-Type": "application/json"
        };
        const body = JSON.stringify(data);

        fetch(urlPost, {
            method: "POST",
            headers: headers,
            body: body,
            mode: "cors"
        })
            .then(resp => resp.json())
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function update(id: number, data: IProducto) {
    return new Promise((resolve, reject) => {
        const headers = {
            "Content-Type": "application/json"
        };
        const body = JSON.stringify(data);

        fetch(urlPut + id, {
            method: "POST",
            headers: headers,
            body: body,
            mode: "cors"
        })
            .then(resp => resp.json())
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function del(id: number) {
    return new Promise((resolve, reject) => {
        const headers = {
            "Content-Type": "application/json"
        };

        fetch(urlDelete + id, {
            method: "GET",
            headers: headers,
            mode: "cors"
        })
            .then(resp => resp.json())
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}