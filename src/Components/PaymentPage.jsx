import { useState } from "react";

function PaymentPage({ onCancel, onSuccess }) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name on card is required.";
    if (!cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required.";
    } else if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }
    if (!expiry.trim()) {
      newErrors.expiry = "Expiry date is required.";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Expiry must be in MM/YY format.";
    }
    if (!cvv.trim()) {
      newErrors.cvv = "CVV is required.";
    } else if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert("Payment successful!");
      onSuccess();
    }
  };


  return (
    <div className="md:max-w-md max-w-xs mx-auto p-6 border mt-4 rounded shadow-md">
      <h2 className="md:text-xl text-lg font-bold mb-4">Payment page</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <input
            type="text"
            placeholder="Name on card"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`border px-3 py-2 rounded w-full ${errors.name ? "border-red-500" : ""
              }`}
          />
          <p className="text-red-600 text-sm mt-1 h-5">
            {errors.name || '\u00A0'}
          </p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength={16}
            className={`border px-3 py-2 rounded w-full ${errors.cardNumber ? "border-red-500" : ""
              }`}
          />
          <p className="text-red-600 text-sm mt-1 h-5">
            {errors.cardNumber || '\u00A0'}
          </p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Expiry (MM/YY)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            maxLength={5}
            className={`border px-3 py-2 rounded w-full ${errors.expiry ? "border-red-500" : ""
              }`}
          />
          <p className="text-red-600 text-sm mt-1 h-5">
            {errors.expiry || '\u00A0'}
          </p>
        </div>

        <div>
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength={4}
            className={`border px-3 py-2 rounded w-full ${errors.cvv ? "border-red-500" : ""
              }`}
          />
          <p className="text-red-600 text-sm mt-1 h-5">
            {errors.cvv || '\u00A0'}
          </p>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white md:text-base text-sm px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 md:text-base text-sm rounded"
          >
            Pay
          </button>
        </div>
      </form>
    </div>

  );
}
export default PaymentPage;
