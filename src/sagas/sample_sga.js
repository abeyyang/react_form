import { call, put, select, takeEvery, takeLatest, compose,fork } from 'redux-saga/effects';

function* doSomething(obj){
    console.log("++++Test: doSomething is triggered. ", obj);
}

export default function*(){
    yield [
        takeEvery("sample_addRecord",doSomething)
    ]
}