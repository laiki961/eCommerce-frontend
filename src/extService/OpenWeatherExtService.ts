import React from 'react';
import axios from 'axios';
import { ForecastWeather } from '../domain/weatherDos';
import { OpenWeatherForecastResponseDto } from '../domain/dto/openWeatherDtos';

export default class OpenWeatherExtService {
    static getForecast(cityId: number, callback: (data: ForecastWeather) => void) {
        axios.get<OpenWeatherForecastResponseDto>('https://api.openweathermap.org/data/2.5/forecast?id=' + cityId + '&units=metric&appid=f79f22971ef877fdd833f19f9e7af4ab')
            .then(response => {
                if (response.status === 200) {
                    callback(response.data as ForecastWeather);
                }
            })
        
    }
}