import { useEffect, useState } from 'react';
import { apiFetch } from '../../services/api/api';
import {
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface ApiResponse {
  target: string;
  result: number[];
}

type MeasurementPoint = {
  date: string;
  value: number;
};

type Target = {
  target_value: number;
};

type AnalyticsResponse = {
  target: Target | null;
  result: Record<string, MeasurementPoint[]>;
};

type ChartDataPoint = {
  date: string;
  [key: string]: string | number | undefined;
};

function BodyMeasurementsChart() {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [targetValue, setTargetValue] = useState<Target | null>(null);
  const [selectorType, setSelectorType] = useState('weight');

  const from = '2009-01-01';
  const to = '2027-01-01';

  useEffect(() => {
    async function load() {
      const { target, result } = await apiFetch<AnalyticsResponse>(
        `/measurements/analytics?type=${selectorType}&from=${from}&to=${to}`,
      );

      const map: Record<string, ChartDataPoint> = {};

      for (const typeKey in result) {
        result[typeKey].forEach((point) => {
          if (!map[point.date]) {
            map[point.date] = { date: point.date };
          }

          map[point.date][typeKey] = point.value;
        });
      }

      setData(Object.values(map));
      setTargetValue(target);
    }
    load();
  }, [selectorType]);

  return (
    <div>
      BodyMeasurementsChart
      <select value={selectorType} onChange={(e) => setSelectorType(e.target.value)}>
        <option value="weight">Weight</option>
        <option value="chest">Chest</option>
        <option value="waist">Waist</option>
        <option value="abdominal">Abdominal</option>
        <option value="hips">Hips</option>
      </select>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis scale="log" type="number" domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey={selectorType} />
          {targetValue && (
            <ReferenceLine y={targetValue.target_value} stroke="red" strokeDasharray="3 3">
              <Label value={targetValue.target_value} position="bottom" />
            </ReferenceLine>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BodyMeasurementsChart;
