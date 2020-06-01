const createColumns = (array)=>{
    let [c1,c2,c3,c4] = [[],[],[],[]]
    for (let i = 0 ; i<array.length; i++){
        switch(i%4){
            case 0 : c1.push(array[i]);break;
            case 1 : c2.push(array[i]);break;
            case 2 : c3.push(array[i]);break;
            case 3 : c4.push(array[i]);break;
            default : return ''
        }
    }
    return [c1,c2,c3,c4]
}

export default createColumns