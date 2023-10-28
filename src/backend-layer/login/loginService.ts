import { BASE_URL, getAxios } from "../utils/axiosWrapper";

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface UserDto {
    name: string;
    surname: string;
    email: string;
    id: number;
}

export function login() {
    return (user: LoginUserDto) => getAxios()
        .post(`${BASE_URL}/auth`, user)
        .then((response) => {
            console.log('Uspjesno logovan')
            console.log(response.data)
            localStorage.setItem("token", response.data)
        })
        .catch(() => {
        console.log('Neuspjesno registrovan');
        
        });
}