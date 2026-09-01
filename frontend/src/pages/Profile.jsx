import { useEffect, useState } from "react";

import {
  getMyProfile,
  updateMyProfile,
  changePassword,
} from "../services/api";

import { useAuth } from "../context/authContext.jsx";

const Profile = () => {
  const { accessToken } = useAuth();

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    familyName: "",
    userName: "",
    email: "",
    phoneNo: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyProfile(accessToken);

        console.log("PROFILE DATA:", data);

        setProfile(data);

        setForm({
          firstName: data.fullName?.firstName || "",
          familyName: data.fullName?.familyName || "",
          userName: data.userName || "",
          email: data.email || "",
          phoneNo: data.phoneNo || "",
        });
      } catch (err) {
        console.log("PROFILE ERROR:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setForm({
      firstName: profile?.fullName?.firstName || "",
      familyName: profile?.fullName?.familyName || "",
      userName: profile?.userName || "",
      email: profile?.email || "",
      phoneNo: profile?.phoneNo || "",
    });

    setEditing(true);
    setError("");
    setMessage("");
  };

  const handleCancel = () => {
    setForm({
      firstName: profile?.fullName?.firstName || "",
      familyName: profile?.fullName?.familyName || "",
      userName: profile?.userName || "",
      email: profile?.email || "",
      phoneNo: profile?.phoneNo || "",
    });

    setEditing(false);
    setError("");
    setMessage("");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      await updateMyProfile(
        {
          fullName: {
            firstName: form.firstName,
            familyName: form.familyName,
          },
          userName: form.userName,
          email: form.email,
          phoneNo: form.phoneNo,
        },
        accessToken
      );

      const data = await getMyProfile(accessToken);

      setProfile(data);

      setForm({
        firstName: data.fullName?.firstName || "",
        familyName: data.fullName?.familyName || "",
        userName: data.userName || "",
        email: data.email || "",
        phoneNo: data.phoneNo || "",
      });

      setEditing(false);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      setChangingPassword(true);
      setError("");
      setMessage("");

      await changePassword(
        passwordForm,
        accessToken
      );

      setPasswordForm({
        oldPassword: "",
        newPassword: "",
      });

      setMessage("Password changed successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-gray-500">
        Please login to view your profile.
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <section className="w-full px-8 py-12 md:px-16 lg:px-24">

      <div className="w-full">

        {/* HEADER */}

        <p className="text-sm uppercase tracking-[0.3em] text-green-500">
          beforeSHOW
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Your account details.
        </p>


        {/* 2/3 + 1/3 */}

        <div className="mt-10 grid gap-5 md:grid-cols-3">

          {/* LEFT — 2/3 */}

          <div className="md:col-span-2">

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 md:p-8">

              {!editing ? (

                <>
                  <h2 className="text-2xl font-bold">
                    Account
                  </h2>

                  <div className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2">

                    <div>
                      <p className="text-sm text-gray-500">
                        Full Name
                      </p>

                      <p className="mt-2 font-medium">
                        {profile?.fullName?.firstName || "—"}{" "}
                        {profile?.fullName?.familyName || ""}
                      </p>
                    </div>


                    <div>
                      <p className="text-sm text-gray-500">
                        Username
                      </p>

                      <p className="mt-2 font-medium">
                        {profile?.userName || "—"}
                      </p>
                    </div>


                    <div>
                      <p className="text-sm text-gray-500">
                        Email
                      </p>

                      <p className="mt-2 break-all font-medium">
                        {profile?.email || "—"}
                      </p>
                    </div>


                    <div>
                      <p className="text-sm text-gray-500">
                        Phone Number
                      </p>

                      <p className="mt-2 font-medium">
                        {profile?.phoneNo || "—"}
                      </p>
                    </div>


                    <div>
                      <p className="text-sm text-gray-500">
                        Role
                      </p>

                      <p className="mt-2 font-medium capitalize text-green-500">
                        {profile?.role || "user"}
                      </p>
                    </div>

                  </div>


                  <div className="mt-8 border-t border-gray-800 pt-6">

                    <button
                      type="button"
                      onClick={handleEdit}
                      className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-semibold transition hover:border-green-500 hover:text-green-500"
                    >
                      Edit Profile
                    </button>

                  </div>
                </>

              ) : (

                <>
                  <h2 className="text-2xl font-bold">
                    Edit Profile
                  </h2>

                  <form
                    onSubmit={handleUpdateProfile}
                    className="mt-8"
                  >

                    <div className="grid gap-5 md:grid-cols-2">

                      <div>
                        <label className="mb-2 block text-sm text-gray-500">
                          First Name
                        </label>

                        <input
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 outline-none focus:border-green-500"
                        />
                      </div>


                      <div>
                        <label className="mb-2 block text-sm text-gray-500">
                          Family Name
                        </label>

                        <input
                          name="familyName"
                          value={form.familyName}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 outline-none focus:border-green-500"
                        />
                      </div>


                      <div>
                        <label className="mb-2 block text-sm text-gray-500">
                          Username
                        </label>

                        <input
                          name="userName"
                          value={form.userName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 outline-none focus:border-green-500"
                        />
                      </div>


                      <div>
                        <label className="mb-2 block text-sm text-gray-500">
                          Email
                        </label>

                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 outline-none focus:border-green-500"
                        />
                      </div>


                      <div>
                        <label className="mb-2 block text-sm text-gray-500">
                          Phone Number
                        </label>

                        <input
                          name="phoneNo"
                          value={form.phoneNo}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 outline-none focus:border-green-500"
                        />
                      </div>

                    </div>


                    <div className="mt-8 flex gap-3 border-t border-gray-800 pt-6">

                      <button
                        type="submit"
                        disabled={saving}
                        className="rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-green-400 disabled:opacity-50"
                      >
                        {saving
                          ? "Saving..."
                          : "Save Changes"}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={saving}
                        className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-semibold transition hover:border-gray-500 disabled:opacity-50"
                      >
                        Cancel
                      </button>

                    </div>

                  </form>
                </>

              )}

            </div>

          </div>


          {/* RIGHT — 1/3 */}

          <div className="md:col-span-1">

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 md:p-8">

              <h2 className="text-2xl font-bold">
                Security
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Change your password.
              </p>

              <form
                onSubmit={handleChangePassword}
                className="mt-8 space-y-5"
              >

                <div>
                  <label className="mb-2 block text-sm text-gray-500">
                    Current Password
                  </label>

                  <input
                    name="oldPassword"
                    type="password"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 outline-none focus:border-green-500"
                  />
                </div>


                <div>
                  <label className="mb-2 block text-sm text-gray-500">
                    New Password
                  </label>

                  <input
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 outline-none focus:border-green-500"
                  />
                </div>


                <button
                  type="submit"
                  disabled={changingPassword}
                  className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-semibold transition hover:border-green-500 hover:text-green-500 disabled:opacity-50"
                >
                  {changingPassword
                    ? "Changing..."
                    : "Change Password"}
                </button>

              </form>

            </div>

          </div>

        </div>


        {/* MESSAGE */}

        {error && (
          <p className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {message && (
          <p className="mt-5 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {message}
          </p>
        )}

      </div>

    </section>
  );
};

export default Profile;