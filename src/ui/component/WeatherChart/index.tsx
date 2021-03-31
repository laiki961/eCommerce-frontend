import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export type ChartData = {
    name: string,
    temperature: number,
    humidity: number
};

type Props = {
    data?: ChartData[]
};
type State = {};

export default class WeatherChart extends React.Component<Props, State> {
    render() {
        if (!this.props.data) {
            return null;
        }

        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={this.props.data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}