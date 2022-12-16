export function showError(mainMessage = 'ERROR',message= 'error'){
    document.getElementById('error').innerHTML = `<strong class="mx-2">${mainMessage}</strong> ${message}`;
    document.getElementById('error').setAttribute('style', 'display:flex !important');
}

export function jobUpdated(){
    document.getElementById('dataUpdated').setAttribute('style', 'display:flex !important');
    setTimeout(()=>{
        document.getElementById('dataUpdated').setAttribute('style', 'display:none !important');
    }, 1800);
}