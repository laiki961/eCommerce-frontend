import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import "./style.css";
import RefreshImg from "./refresh.svg";
import { ForecastWeather } from '../../../domain/weatherDos';
import OpenWeatherExtService from '../../../extService/OpenWeatherExtService';
import React from 'react';
import WeatherChart, { ChartData } from '../../component/WeatherChart';

type Props = {};
type State = {
    lastUpdateTime: Date,
    forecast?: ForecastWeather
};

export default class WeatherForecasrPage extends React.Component<Props, State> {
    state = {
        lastUpdateTime: new Date()
    } as State;

    constructor(props: Props) {
        super(props);

        this.onLoadedForecast = this.onLoadedForecast.bind(this);
        this.onClickedRefresh = this.onClickedRefresh.bind(this);
    }

    componentDidMount() {
        OpenWeatherExtService.getForecast(1819729, this.onLoadedForecast);
    }

    onLoadedForecast(data: ForecastWeather) {
        this.setState({forecast: data});
    }

    onClickedRefresh(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        this.setState({
            lastUpdateTime: new Date(),
            forecast: undefined
        }, () => {
            OpenWeatherExtService.getForecast(1819729, this.onLoadedForecast);
        });
    }

    getFormattedDate(date: Date) {
        return ('0' + date.getDate()).slice(-2) + "/" + ('0' + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
    }

    getFormattedTime(date: Date) {
        return ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2);
    }

    renderTable() {
        if (!this.state.forecast) {
            return "Loading...";
        }

        const rows: JSX.Element[] = [];
        for (let item of this.state.forecast.list) {
            const date = new Date(item.dt * 1000);
            const formattedDate = this.getFormattedDate(date);
            const formattedTime = this.getFormattedTime(date);
            rows.push(
                <tr>
                    <td>{formattedDate}</td>
                    <td>{formattedTime}</td>
                    <td>{item.main.temp_min}/{item.main.temp_max}</td>
                    <td>{item.main.humidity}%</td>
                    <td className="icon"><img src={"http://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png"}/></td>
                </tr>
            );
        }

        return (
            <Table id="forecastTable" striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Temperature (Min/Max)</th>
                        <th>Humidity (%)</th>
                        <th>Weather</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }

    render() {
        const date = this.state.lastUpdateTime;
        const formattedDate = this.getFormattedDate(date);
        const formattedTime = this.getFormattedTime(date);

        const chartData: ChartData[] = [];
        if (this.state.forecast) {
            for (let item of this.state.forecast.list) {
                const date = new Date(item.dt * 1000);
                const formattedDate = this.getFormattedDate(date);
                const formattedTime = this.getFormattedTime(date);
                chartData.push({
                    name: formattedDate + " " + formattedTime,
                    temperature: item.main.temp,
                    humidity: item.main.humidity
                });
            }
        }

        return (
            <div className="content">
                <Container>
                    <header>
                        <Row>
                            <Col md={8}>
                                <span id="title">5 Day / 3 Hour Forecast</span><br/>
                                <span id="location">Hong Kong</span>
                            </Col>
                            <Col id="lastUpdateTimeContainer" md={4}>
                                <div id="lastUpdateText">
                                    Last Update Time:<br/>
                                    {formattedDate} {formattedTime}
                                </div>

                                <div id="refreshButton" onClick={this.onClickedRefresh}>
                                    <img src={RefreshImg}/>
                                </div>
                            </Col>
                        </Row>
                        
                    </header>
                    
                    <div id="weatherChartContainer">
                        <WeatherChart
                            data={chartData}
                        />
                    </div>

                    {this.renderTable()}
                </Container>
            </div>
        );
    }
}