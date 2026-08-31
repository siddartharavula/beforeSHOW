const Profile = () => {
  return (
    <section className="w-full px-8 py-12 md:px-16 lg:px-24">

      <div className="max-w-3xl">

        <p className="text-sm uppercase tracking-[0.3em] text-green-500">
          beforeSHOW
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Profile
        </h1>

        <div className="mt-10 grid gap-5 md:grid-cols-2">

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-500">
              Username
            </p>

            <p className="mt-2 font-medium">
              —
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="mt-2 font-medium">
              —
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Profile;