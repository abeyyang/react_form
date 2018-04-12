import qasService from './qasService'


export const qasController = (params) =>{
    let result;
    result=qasService.process(params);
    return result
}