

export function APIRequest(URL, OPTION){
    fetch(URL, OPTION).then((responseObj) => {
        const jsonData =  responseObj.json();
        console.log(jsonData);
        if(responseObj.ok){ 
            return {"result" : true, 'jsonData' : jsonData};
        }else{
            return {"result" : false, 'jsonData' : jsonData};
        }
    });
}