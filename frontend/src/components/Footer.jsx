const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-800 sm:mt-20">
      <div className="flex w-full flex-col gap-6 px-5 py-8 text-sm sm:px-6 sm:py-10 md:flex-row md:items-center md:justify-between md:gap-4">

        {/* BRAND */}

        <div className="text-center md:text-left">
          <p className="text-lg font-semibold text-white">
            <span className="text-white">before</span>
            <span className="text-green-500">SHOW</span>
          </p>

          <p className="mt-1 text-gray-500">
            Discover stories worth remembering.
          </p>
        </div>

        {/* CONTACT */}

        <div className="text-center md:text-center">
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

        {/* COPYRIGHT */}

        <p className="text-center text-gray-600 md:text-right">
          © 2026 beforeSHOW
        </p>

      </div>
    </footer>
  );
};

export default Footer;