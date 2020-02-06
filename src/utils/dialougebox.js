import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export function dialougeBox(httpcall){
    confirmAlert({
        title:'Confirm to submit',
        message:'Are you sure to do this',
        closeOnEscape: true,
        closeOnClickOutside: true,
        buttons:[
            {
                label:'Delete',
                onClick:() =>  { 
                    httpcall
                         
                    }
                                    
            },                       
                                {
                                    label:'Cancel',
                                    onClick:() => {console.log("NOt deleted")}
                                }
                            ]
                        });
    

}
