import axios from 'axios';
import React from 'react';
import config from '../config/config';
import { UserInfo } from '../domain/backendAuthDos';
import { UserInfoResponseDto } from '../domain/dto/backendAuthDto';

export default class BackendExtService {
    static getMyUserInfo(idToken: string, callback: (data: UserInfo) => void){
        axios.get<UserInfoResponseDto>(config().backend.baseUrl +"/user/info/me", {
            headers: {
                Authorization: "Bearer " + idToken
            }
        })
            .then((response)=>{
                callback(response.data as UserInfo);
            });
    }
}