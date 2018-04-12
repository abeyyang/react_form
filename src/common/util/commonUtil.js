export const isEmpty=function(str){
    return null===str||str===undefined||((typeof str === 'string')&&str.trim.length===0)||((typeof str === 'array')&& str.length===0) ;
}
export const isNotEmpty=function(str){
    return !isEmpty(str)
}
	
export const isBlank=function(str){
    return null===str||str===undefined||((typeof str === 'string')&&str.trim.length===0)||((typeof str === 'array')&& str.length===0) ;
}
export const isNotBlank=function(str){
    return !isBlank(str);
} 