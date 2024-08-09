import { IPersona, Persona } from "../../interfaces/Persona";
import { useDispatch, useSelector } from "react-redux";
import { PersonaState, setData, setPersona } from '../../features/persona/personaSlice';
import { PersonaService } from "../../services/persona.service";
import Swal from "sweetalert2";
import { useState } from "react";

export const Form = () => {

    const { persona } = useSelector((state:{ persona: PersonaState }) => state);
    
    const [ errorForm, setErrorForm ] = useState({
        name: false,
        addres: false,
        phone: false
    })

    const dispatch = useDispatch();

    const personaService = new PersonaService();
  
    const setFormValue = (event:React.ChangeEvent<HTMLInputElement>) => { 
        dispatch(setData({ ... persona.data, [event.target.id]: event.target.value }))
	}

    const isValidForm = ( ) => {
   
        const error = { name: false, addres: false, phone: false }

        if(!persona.data.name) error.name = true 
        if(!persona.data.addres) error.addres = true; 
        if(!persona.data.phone) error.phone = true; 

        setErrorForm(error) 

        return error.name || error.addres || error.phone;
    }

    const fetchUpdate = async (event:React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault() 
            const data:IPersona = await personaService.put(persona.data)
            // add item
            const dataArray:IPersona[] =  [...persona.list]  
            // search index 
            let index:number = dataArray.findIndex((item:IPersona)=>item.id === data.id )
            // replace item 
            dataArray.splice(index, 1, data); 
            //update item
            dispatch(setPersona(dataArray))
            // for clean form
            dispatch(setData(new Persona()))
 
            Swal.fire({ 
                icon: 'success',
                title: 'The data has been updated' 
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCreate = async (event:React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault() 
            // valid fields 
            if(isValidForm()) return null;

            const data:IPersona = await personaService.post(persona.data)
            // for clean form
            dispatch(setData(new Persona()))
            // add item
            const dataArray:IPersona[] = [ ... persona.list ]
            dataArray.push(data)
            dispatch(setPersona(dataArray))

            Swal.fire({ 
                icon: 'success',
                title: 'The data has been saved' 
            })
        } catch (error) {
            console.log(error)
        }
    }

    const inputCSS = "block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 "
    const inputError ="border-red-400"
    
    return (
    <div className="px-8 py-4 pb-8 rounded-lg bg-gray-50">
 
        <form onSubmit={(e)=>persona.data.id?fetchUpdate(e):fetchCreate(e)}>
            
            <div className="mt-4">
                <label className="mb-2  text-gray-800">Name</label>
                <input 
                    id="name"
                    type="text" 
                    placeholder="Artyom Developer"
                    value={persona.data.name}
                    onChange={(e)=>setFormValue(e)}
                    className={errorForm.name?inputCSS+inputError:inputCSS } />
                    {errorForm.name && <p className="mt-1 text-m text-red-400">This is field is required</p>}  
            </div>

            <div className="mt-4">
                <label className="mb-2  text-gray-800">Address</label>
                <input 
                    id="address"
                    type="text" 
                    placeholder="California Cll 100"
                    value={persona.data.addres}
                    onChange={(e)=>setFormValue(e)}
                    className={errorForm.addres?inputCSS+inputError:inputCSS } />
                    {errorForm.addres && <p className="mt-1 text-m text-red-400">This is field is required</p>}  
            </div>

            <div className="mt-4">
                <label className="mb-2  text-gray-800">Phone</label>
                <input 
                    id="phone"
                    type="text" 
                    placeholder="88888888" 
                    value={persona.data.phone}
                    onChange={(e)=>setFormValue(e)}
                    className={errorForm.phone?inputCSS+inputError:inputCSS } />
                    {errorForm.phone && <p className="mt-1 text-m text-red-400">This is field is required</p>}  
            </div>

            <button className="w-full mt-8 bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg">
                {persona.data.id?"Save":"Create"}
            </button>
        </form>
    </div>
    )
}