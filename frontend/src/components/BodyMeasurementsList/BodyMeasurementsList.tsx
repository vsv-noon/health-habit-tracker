import { Link } from 'react-router-dom';
import type { CalendarEventProps } from '../../pages/MeasurementsPage/MeasurementsPage';

function BodyMeasurementsList({ sessions }: { sessions: CalendarEventProps[] }) {
  return (
    <>
      <div>
        <h2>Body Measurements List</h2>
        <ul className="bodyMeasurementsList">
          {sessions &&
            sessions.map((el, i) => (
              <li key={i}>
                <Link
                  to={`body-measurements-details/${el.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {el.session_date}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default BodyMeasurementsList;
