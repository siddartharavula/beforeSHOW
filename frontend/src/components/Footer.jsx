const Footer = () => {
  return (
    <footer className="mt-8 border-t border-gray-800 sm:mt-12 md:mt-20">
      <div className="flex w-full flex-col gap-3 px-4 py-5 text-xs sm:gap-4 sm:px-6 sm:py-8 sm:text-sm md:flex-row md:items-center md:justify-between md:gap-4 md:py-10">

        <div>
          <p className="text-base font-semibold text-white sm:text-lg">
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