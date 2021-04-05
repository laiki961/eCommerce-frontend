export type OpenWeatherDayDto = {
    dt: number,
    main: {
        temp: number,
        temp_min: number,
        temp_max: number,
        humidity: number
    },
    weather: {
        icon: string
    }[]
}

export type OpenWeatherForecastResponseDto = {
    list: OpenWeatherDayDto[]
}