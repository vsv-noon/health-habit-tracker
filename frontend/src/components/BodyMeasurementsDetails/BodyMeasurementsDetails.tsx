import { useEffect, useState } from 'react';
import { apiFetch } from '../../services/api/api';
import { useOutletContext, useParams } from 'react-router-dom';

import './style.css';

export interface MeasurementsProps {
  label: string;
  measured_value: number;
  unit: string;
}

export interface BodyMeasurementDetailsProps {
  session_date: string;
  recorded_at: string;
  measurements: MeasurementsProps[];
}

function BodyMeasurementDetails() {
  const { handleCloseDetails } = useOutletContext<{ handleCloseDetails: () => void }>();
  const [value, setValue] = useState<BodyMeasurementDetailsProps>();

  const { id } = useParams();
  useEffect(() => {
    try {
      if (!id) return;
      async function load() {
        const data = await apiFetch(`/measurement-sessions/${id}`);
        setValue(data as BodyMeasurementDetailsProps);
      }
      load();
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  return (
    <div className="bodyMeasurementsDetails">
      <button onClick={handleCloseDetails}>Close</button>
      <h2>Body Measurements Details</h2>
      <h4>{value && value.session_date}</h4>
      <h5>{value && new Date(value.recorded_at).toLocaleString()}</h5>
      <ul className="bodyMeasurementsDetailsList">
        {value &&
          value.measurements.map((el, i) => (
            <li key={i}>
              <span>{el.label}</span>
              <span>
                {el.measured_value} {el.unit}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default BodyMeasurementDetails;
