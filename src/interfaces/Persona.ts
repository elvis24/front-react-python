export interface IPersona{
    id?: number | null,
    name: string,
    addres: string,
    phone: number,
    createdAt: Date | null,
    updatedAt: Date | null
}

export class Persona implements IPersona{
    public id:null;
    public name: string;
    public addres: string;
    public phone: number;
    public createdAt: Date | null;
    public updatedAt: Date | null;

    /**
     *
     */
    constructor() {
        this.id = null;
        this.name = "";
        this.addres = "";
        this.phone = 0;
        this.createdAt = null;
        this.updatedAt = null;
    }
}