import { api, headerAPI} from "../configs/axios";
import { IPersona } from "../interfaces/Persona";

export class PersonaService{
    private apiURL = "v1/personas";

    public async getAll(){
        try {
            console.log("consulta")
            const response = await api.get<IPersona[]>(`${this.apiURL}`)
            return await response.data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async post(data:IPersona){
        try {
            const response = await api.post<IPersona>(`${this.apiURL}`,data, headerAPI)
            return await response.data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async getById(id:number){
        try {
            const response = await api.get<IPersona>(`${this.apiURL}/${id}`,headerAPI)
            const data: IPersona = response.data
            return data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async put(data:IPersona){
        try {
            const response = await api.put<IPersona>(`${this.apiURL}/${data.id}`, data, headerAPI)
            return await response.data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async delete(data:IPersona){
        try {
            const response = await api.delete<IPersona>(`${this.apiURL}/${data.id}`, headerAPI)
            return await response.data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}