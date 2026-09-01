const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-800">
      <div className="flex w-full flex-col gap-4 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">
            <span className="text-white">before</span>
            <span className="text-green-500">SHOW</span>
          </p>
          <p className="mt-1 text-gray-500">
            Discover stories worth remembering.
          </p>
        </div>

        <div className="text-left md:text-center">
          <p className="text-gray-400">
            Want to see your organization on beforeSHOW?
          </p>
          <p className="mt-1 text-gray-500">
            For movie or organization additions, contact{" "}
            <a
              href="mailto:beforeshow@gmail.com"
              className="text-green-500 transition hover:text-green-400"
            >
              beforeshow@gmail.com
            </a>
          </p>
        </div>

        <p className="text-gray-600">
          © 2026 beforeSHOW
        </p>
      </div>
    </footer>
  );
};

export default Footer;