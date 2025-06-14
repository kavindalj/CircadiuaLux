import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function PasswordChangeForm() {
  const [formInput, setFormInput] = useState({
    pass1: "", // current password
    pass2: "", // new password
    pass3: "", // confirm password
  });

  const [formError, setFormError] = useState({
    pass2: "",
    pass3: "",
    pass1: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validateFormInput = async (event) => {
    event.preventDefault();

    let inputError = {
      pass2: "",
      pass3: "",
      pass1: "",
    };

    if (formInput.pass3 !== formInput.pass2) {
      setFormError({
        ...inputError,
        pass3: "New Password and Confirm password should be the same",
      });
      return;
    }

    // Get current user email
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setFormError({
        ...inputError,
        pass1: "User not found",
      });
      return;
    }

    // ✅ Re-authenticate using current password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: formInput.pass1,
    });

    if (signInError) {
      setFormError({
        ...inputError,
        pass1: "Current password is incorrect",
      });
      return;
    }

    // ✅ Proceed with password update
    const { error: updateError } = await supabase.auth.updateUser({
      password: formInput.pass2,
    });

    if (updateError) {
      setFormError({
        ...inputError,
        pass2: updateError.message,
      });
      return;
    }

    // ✅ Success
    setFormError(inputError);
    setSuccessMessage("Password changed successfully!");
    setFormInput({ pass1: "", pass2: "", pass3: "" });

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
        <p className="text-left text-xl font-bold mb-3">Change Password</p>
        <form onSubmit={validateFormInput}>
          <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Current Password</label>
            <input
              value={formInput.pass1}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              type="password"
              name="pass1"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">New Password</label>
            <input
              value={formInput.pass2}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              type="password"
              name="pass2"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Confirm New Password</label>
            <input
              value={formInput.pass3}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              type="password"
              name="pass3"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Error messages */}
          {formError.pass1 && (
            <p className="text-red-600 text-sm mt-2 text-left">{formError.pass1}</p>
          )}
          {formError.pass2 && (
            <p className="text-red-600 text-sm mt-2 text-left">{formError.pass2}</p>
          )}
          {formError.pass3 && (
            <p className="text-red-600 text-sm mt-2 text-left">{formError.pass3}</p>
          )}

          <button
            type="submit"
            className="w-full mt-3 py-2 font-bold text-white rounded-md cursor-pointer transition-all bg-[#34A8DD] hover:brightness-90 bg-gradient-to-r from-[#36AFDE] to-[#74DAF6]"
          >
            Save password
          </button>
        </form>

        {successMessage && (
          <p className="text-green-600 text-sm mt-4 text-left">{successMessage}</p>
        )}
      </div>
    </div>
  );
}

export default PasswordChangeForm;
