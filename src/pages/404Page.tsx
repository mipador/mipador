import { Link, useParams } from "react-router-dom";

const NotFound: React.FC = () => {
  const { lang } = useParams();

  const base = `/${lang || "en"}`;

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center px-6 font-sans">
      <main className="text-center">
        <h2 className="text-[120px] font-light leading-none text-[#3D1A12]/10 mb-4">
          404
        </h2>

        <h3 className="text-2xl md:text-3xl font-normal text-[#3D1A12] mb-4">
          This path wasn't chosen with intention.
        </h3>

        <p className="text-[#3D1A12]/70 max-w-md mx-auto mb-10 leading-relaxed">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to={base}
          className="inline-block bg-[#3D1A12] text-[#F7F7F7] px-10 py-3 text-sm rounded-sm"
        >
          Back to Home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
