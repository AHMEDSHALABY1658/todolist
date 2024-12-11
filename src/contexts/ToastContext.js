import { createContext , useState} from "react";
import Todolist from "../Componets/Todolist";
import MySnackBar from "../Componets/MySnackBar";


export const ToastContext = createContext({})

export const ToastProvider = ({children}) =>{

    const [open, setOpen] = useState(false);
    const [Message, setMessage] = useState("");
    function ShowHideToast(Message) {
        setOpen(true)
        setMessage(Message)
        setTimeout(() => {
            setOpen(false)
        }, 2000)
    }

    return(
        <ToastContext.Provider value ={{ ShowHideToast }}>
            <MySnackBar open={open} Message={Message} />
            {children}  
        </ToastContext.Provider>
    )
}
