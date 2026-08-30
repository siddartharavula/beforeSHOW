const Profile = () => {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">

      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">

        <p className="text-sm uppercase tracking-widest text-green-500">
          Profile
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Your Profile
        </h1>

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          <div className="rounded-xl bg-gray-950 p-5">
            <p className="text-sm text-gray-500">
              Username
            </p>
            <p className="mt-1 font-medium">
              — 
            </p>
          </div>

          <div className="rounded-xl bg-gray-950 p-5">
            <p className="text-sm text-gray-500">
              Email
            </p>
            <p className="mt-1 font-medium">
              —
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Profile;