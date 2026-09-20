"use client";

import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let hasError = false;
    let newErrors = { name: "", email: "", message: "" };

    if (form.name === "") {
      hasError = true;
      newErrors.name = "名前の入力は必須です";
    } else if (form.name.length > 30) {
      hasError = true;
      newErrors.name = "30文字以内で入力してください";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (form.email === "") {
      hasError = true;
      newErrors.email = "メールアドレスの入力は必須です";
    } else if (!emailPattern.test(form.email)) {
      hasError = true;
      newErrors.email = "メールアドレスの形式で入力してください";
    }
    if (form.message === "") {
      hasError = true;
      newErrors.message = "本文の入力は必須です";
    } else if (form.message.length > 500) {
      hasError = true;
      newErrors.message = "500文字以内で入力してください";
    }
    setError(newErrors);

    if (!hasError) {
      setSending(true);
      await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          body: JSON.stringify(form),
        },
      );

      alert("送信しました");
      setSending(false);
      clearForm();
    }
  };

  const clearForm = () => {
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <div className="px-6 py-2">
        <h1 className="text-2xl font-bold my-6">問い合わせフォーム</h1>

        <form className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label className="text-lg  w-32">お名前</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={sending}
              className="border border-gray-300 rounded px-3 py-2 flex-1"
            />
          </div>
          <p className="text-red-500 text-sm ml-40 mb-6">{error.name}</p>

          <div className="flex items-center gap-4">
            <label className="text-lg w-32">メールアドレス</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={sending}
              className="border border-gray-300 rounded px-3 py-2 flex-1"
            />
          </div>
          <p className="text-red-500 text-sm ml-40 mb-6">{error.email}</p>

          <div className="flex items-center gap-4 my-">
            <label className="text-lg w-32 ">本文</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              disabled={sending}
              rows={6}
              className="border border-gray-300 rounded px-3 py-2 flex-1"
            />
          </div>
          <p className="text-red-500 text-sm ml-40 mb-6">{error.message}</p>

          <div className="flex gap-2 justify-center mt-4">
            <button
              onClick={submitButton}
              disabled={sending}
              className="bg-gray-800 text-white px-6 py-2 rounded"
            >
              送信
            </button>
            <button
              onClick={clearForm}
              disabled={sending}
              className="bg-gray-200 px-6 py-2 rounded"
            >
              クリア
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Contact;
