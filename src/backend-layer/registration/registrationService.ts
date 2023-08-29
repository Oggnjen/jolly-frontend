import { BASE_URL, getAxios } from "../utils/axiosWrapper";

export interface RegisterUserDto {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export function register() {
    return (user: RegisterUserDto) => getAxios()
        .post(`${BASE_URL}/registration`, user)
        .then(() => {
        console.log('Uspjesno registrovan')
        })
        .catch(() => {
        console.log('Neuspjesno registrovan');
        
        });
}