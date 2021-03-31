export type DayWeather= {
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

export type ForecastWeather = {
    list: DayWeather[]
}