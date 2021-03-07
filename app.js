


document.addEventListener('DOMContentLoaded', function () { 
    

    const form_RegistrarID = document.querySelector('#registrar');  
    const input_formRegistrarID = document.querySelector('input');  

    const div_mainCLASS = document.querySelector('div .main');  

    const div_filterGuestsID = document.createElement('div');  
    div_mainCLASS.insertBefore( div_filterGuestsID, document.querySelector('#invitedList') );  

    const label_filterGuestsID = document.createElement('label');  
    label_filterGuestsID.textContent = `Hide those who haven't confirmed their attendance:`;  
    div_filterGuestsID.appendChild(label_filterGuestsID);  

    const checkbox_filterGuestsID = document.createElement('input');  
    checkbox_filterGuestsID.type = 'checkbox';  
    div_filterGuestsID.appendChild(checkbox_filterGuestsID);  

    const ul = document.querySelector('#invitedList');  


    function create_listItem(text) { 

        const li = document.createElement('li');  

        const span = document.createElement('span');  
        span.textContent = `${text} `;  
        li.appendChild(span);  

        input_formRegistrarID.value = ''; 
        
        const label = document.createElement('label');  
        li.appendChild(label); 

        const span_label = document.createElement('span');  
        span_label.textContent = `Confirm Attendance:`;  
        label.appendChild(span_label);  
        
        const checkbox = document.createElement('input');  
        checkbox.type = 'checkbox';  
        label.appendChild(checkbox);  

        const button_Edit = document.createElement('button');  
        button_Edit.className = "buttonEdit";  
        button_Edit.textContent = 'Edit';  
        li.appendChild(button_Edit);  

        const button_Remove = document.createElement('button');  
        button_Remove.className = "buttonRemove";  
        button_Remove.textContent = 'Remove';  
        li.appendChild(button_Remove);  

        return li;  

    }


    form_RegistrarID.addEventListener('submit', function (e) { 
        
        e.preventDefault();  

        if ( input_formRegistrarID.value != '' ) {  
            const text = input_formRegistrarID.value;  
            ul.appendChild( create_listItem(text) );  
        } 

    }); 


    checkbox_filterGuestsID.addEventListener('change', function (e) {
        
        const isChecked = e.target.checked;  
        const listOfAttendees = ul.children;  

        if ( isChecked ) { 

            for ( let i = 0; i < listOfAttendees.length; i++ ) { 

                let li = listOfAttendees[i];  

                if ( li.className === 'responded' ) { 
                    li.style.display = '';  
                } else { 
                    li.style.display = 'none';  
                }

            }

        } else { 

            for ( let i = 0; i < listOfAttendees.length; i++ ) { 

                let li = listOfAttendees[i];  
                li.style.display = ''; 

            }

        }

    });  


    ul.addEventListener('change', function (e) { 

        const checkbox = e.target;  
        const checked = checkbox.checked;  
        const span_label = checkbox.parentNode.querySelector('span');  
        const listItem = checkbox.parentNode.parentNode;  

        if (checked) { 
            listItem.className = 'responded';  
            span_label.textContent = `Attendance Confirmed:`; 
        } else { 
            listItem.className = '';  
            span_label.textContent = `Confirm Attendance:`; 
        }

    });  


    ul.addEventListener('click', function (e) { 

        const li = e.target.parentNode;  
        const ul = li.parentNode; 

        const buttons_EditSaveRemove = { 
            Edit: () => {
                const span = li.firstElementChild;  
                const input = document.createElement('input');  
                input.type = 'text'; 
                input.value = span.textContent;   
                li.insertBefore(input, span);  
                li.removeChild(span);  
                e.target.textContent = 'Save';  
                e.target.className = 'buttonSave'; 
            }, 
            Save: () => { 
                const input = li.firstElementChild;  
                const span = document.createElement('span');  
                span.textContent = input.value;  
                li.insertBefore(span, input);  
                li.removeChild(input);  
                e.target.textContent = 'Edit';  
                e.target.className = 'buttonEdit'; 
            }, 
            Remove: () => {
                ul.removeChild(li);  
            }
        }

        if (e.target.className === 'buttonEdit') { 
            buttons_EditSaveRemove.Edit();  
        } else if (e.target.className === 'buttonSave') { 
            buttons_EditSaveRemove.Save();  
        } else if (e.target.className === 'buttonRemove') { 
            buttons_EditSaveRemove.Remove();  
        }  

    }); 


    ul.addEventListener('keydown', function (e) { 

        const li = e.target.parentNode;  
        const ul = li.parentNode; 

        if (e.target.tagName === 'INPUT' && e.key === 'Enter') { 

            const input = li.firstElementChild;  

            const span = document.createElement('span');  
            span.textContent = input.value;  

            li.insertBefore(span, input);  
            li.removeChild(input);  

            li.querySelector('.buttonSave').textContent = 'Edit';  
            li.querySelector('.buttonSave').className = 'buttonEdit';  

        }

    });  


}); 