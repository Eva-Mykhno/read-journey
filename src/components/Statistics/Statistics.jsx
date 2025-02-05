import { useSelector } from "react-redux";
import { selectReadingBook } from "../../redux/books/selectors";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Statistics = () => {
  const readingBook = useSelector(selectReadingBook);

  if (!readingBook) return <p>No data available</p>;

  const data = {
    labels: readingBook.progress.map((_, index) => `Session ${index + 1}`),
    datasets: [
      {
        label: "Reading Speed (pages/min)",
        data: readingBook.progress.map((entry) => entry.speed),
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h4>Reading Statistics</h4>
      <Line data={data} />
    </div>
  );
};

export default Statistics;
