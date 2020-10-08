import {atom} from 'recoil'


export  const userState=atom({
    default:{},
    key:'userState'
})
export  const searchLocationState=atom({
    default:[],
    key:'searchLocationState'
})