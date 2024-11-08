import { ProgressSpinner } from 'primereact/progressspinner';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <ProgressSpinner aria-label="Loading" />
    </div>
  );
  export default LoadingSpinner;