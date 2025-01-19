"use client"

export const DateInput = ({birthDate}) => {

    const changeDateType = (e)=>{
        e.target.type = 'date'
    }
    const changeTextType = (e)=>{
        e.target.type = 'text'
    }
    return ( 
        
        <input type="text" name="birthDate" required placeholder={`${birthDate?birthDate:"تاریخ تولد "}`} onFocus={changeDateType} onBlur={changeTextType}  className=" h-12 rounded-xl font-Dana p-2 outline-none bg-transparent border border-greenDark/20 text-greenDark placeholder:text-white/50 focus:text-xl" />
        
     );
}
 
export const RegistryInput = ({registryDate}) => {

    const changeDateType = (e)=>{
        e.target.type = 'date'
    }
    const changeTextType = (e)=>{
        e.target.type = 'text'
    }
    return ( 
        
        <input type="text" name="registryDate" required placeholder={`${registryDate?registryDate:"تاریخ شروع همکاری "}`} onFocus={changeDateType} onBlur={changeTextType}  className=" h-12 rounded-xl font-Dana p-2 outline-none bg-transparent border border-greenDark/20 text-greenDark placeholder:text-white/50 focus:text-xl" />
        
     );
}

export const StudentsRegistryInput = ({registryDate}) => {

    const changeDateType = (e)=>{
        e.target.type = 'date'
    }
    const changeTextType = (e)=>{
        e.target.type = 'text'
    }
    return ( 
        
        <input type="text" name="registryDate" required placeholder={`${registryDate?registryDate:"تاریخ  عضویت "}`} onFocus={changeDateType} onBlur={changeTextType}  className=" h-12 rounded-xl font-Dana p-2 outline-none bg-transparent border border-greenDark/20 text-greenDark placeholder:text-white/50 focus:text-xl" />
        
     );
}
