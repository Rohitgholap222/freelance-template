import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiPlus, 
  FiMinus, 
  FiCreditCard, 
  FiDollarSign, 
  FiCheckCircle, 
  FiPrinter, 
  FiInfo,
  FiShoppingBag,
  FiDownload
} from 'react-icons/fi';

function OrderModal({ dish, existingOrder, onClose }) {
  if (!dish) return null;

  const [step, setStep] = useState(existingOrder ? 3 : 1);
  const [quantity, setQuantity] = useState(existingOrder ? existingOrder.quantity : 1);
  const [tableNumber, setTableNumber] = useState(existingOrder ? existingOrder.tableNumber : '1');
  const [guestsCount, setGuestsCount] = useState(existingOrder ? existingOrder.guestsCount : '2');
  const [specialInstructions, setSpecialInstructions] = useState(existingOrder ? existingOrder.specialInstructions : '');
  
  // Payment states
  const [paymentMethod, setPaymentMethod] = useState(existingOrder ? existingOrder.paymentMethod : 'card');
  const [cardName, setCardName] = useState(existingOrder ? existingOrder.cardName || '' : '');
  const [cardNumber, setCardNumber] = useState(existingOrder ? existingOrder.cardNumber || '' : '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState(existingOrder ? existingOrder.upiId || '' : '');
  
  // Form errors / flags
  const [errors, setErrors] = useState({});
  const [downloaded, setDownloaded] = useState(false);
  const [orderId] = useState(existingOrder ? existingOrder.orderId : () => 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [orderDate] = useState(existingOrder ? existingOrder.orderDate : () => new Date().toLocaleString());

  // Calculations (Strip out both ₹ and $ symbols for calculation safety)
  const dishPrice = parseFloat(dish.price.replace(/[₹$]/g, ''));
  const subtotal = dishPrice * quantity;
  const gst = subtotal * 0.05; // 5% GST
  const serviceCharge = subtotal * 0.10; // 10% Service Charge
  const total = existingOrder ? existingOrder.total : (subtotal + gst + serviceCharge);

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
    if (errors.cardNumber) setErrors({ ...errors, cardNumber: '' });
  };

  // Format Expiry Date (adds '/' after MM)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardExpiry(formatted);
    if (errors.cardExpiry) setErrors({ ...errors, cardExpiry: '' });
  };

  // Format CVV (max 3 digits)
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardCvv(value);
    if (errors.cardCvv) setErrors({ ...errors, cardCvv: '' });
  };

  // Validate fields for Step 1
  const validateStep1 = () => {
    const newErrors = {};
    if (!tableNumber || parseInt(tableNumber) < 1) {
      newErrors.tableNumber = 'Please select a table.';
    }
    if (!guestsCount || parseInt(guestsCount) < 1) {
      newErrors.guestsCount = 'Minimum 1 guest required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate fields for Step 2
  const validateStep2 = () => {
    const newErrors = {};
    if (paymentMethod === 'card') {
      if (!cardName.trim()) newErrors.cardName = 'Cardholder name is required.';
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Card number must be 16 digits.';
      }
      const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!expiryPattern.test(cardExpiry)) {
        newErrors.cardExpiry = 'Expiry must be MM/YY.';
      }
      if (cardCvv.length !== 3) {
        newErrors.cardCvv = 'CVV must be 3 digits.';
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        newErrors.upiId = 'Please enter a valid UPI ID (e.g., name@upi).';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 2 && validateStep2()) {
      // Save order to localStorage immediately
      try {
        const pastOrders = JSON.parse(localStorage.getItem('recent_orders') || '[]');
        const newOrder = {
          orderId,
          orderDate,
          tableNumber,
          guestsCount,
          specialInstructions,
          dish,
          quantity,
          paymentMethod,
          cardName: paymentMethod === 'card' ? cardName : '',
          cardNumber: paymentMethod === 'card' ? `**** ${cardNumber.slice(-4)}` : '',
          upiId: paymentMethod === 'upi' ? upiId : '',
          total
        };
        const updatedOrders = [newOrder, ...pastOrders].slice(0, 10); // Keep last 10 receipts
        localStorage.setItem('recent_orders', JSON.stringify(updatedOrders));
      } catch (err) {
        console.error("Error saving order receipt details to local storage", err);
      }
      setStep(3);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    // If we're on the receipt page, haven't downloaded it, and it's a new order
    if (step === 3 && !existingOrder && !downloaded) {
      const confirmSave = window.confirm("Would you like to download a copy of your receipt before returning?");
      if (confirmSave) {
        handleDownload();
        setDownloaded(true);
        return;
      }
    }
    onClose();
  };

  const handleDownload = () => {
    const borderLine = "========================================\n";
    const dashLine   = "----------------------------------------\n";
    
    let receiptText = "";
    receiptText += "            ROYAL RESTAURANT            \n";
    receiptText += "      128 Culinary Court, Food City     \n";
    receiptText += "          Tel: +1 (555) 019-2834        \n";
    receiptText += borderLine;
    receiptText += `Order Reference: ${orderId}\n`;
    receiptText += `Date & Time:     ${orderDate}\n`;
    receiptText += `Table:           Table ${tableNumber}\n`;
    receiptText += `Guests/Members:  ${guestsCount} Pax\n`;
    receiptText += borderLine;
    receiptText += "Items:\n";
    
    const itemName = `${dish.name} (x${quantity})`;
    const priceStr = `₹${subtotal.toFixed(2)}`;
    receiptText += `${itemName.padEnd(30)}${priceStr.padStart(10)}\n`;
    
    receiptText += dashLine;
    receiptText += `Subtotal:${`₹${subtotal.toFixed(2)}`.padStart(31)}\n`;
    receiptText += `GST (5%):${`₹${gst.toFixed(2)}`.padStart(31)}\n`;
    receiptText += `Svc Charge (10%):${`₹${serviceCharge.toFixed(2)}`.padStart(23)}\n`;
    receiptText += borderLine;
    receiptText += `Grand Total:${`₹${total.toFixed(2)}`.padStart(28)}\n`;
    receiptText += borderLine;
    receiptText += `Payment: ${paymentMethod.toUpperCase()}\n`;
    receiptText += `Status:  ${paymentMethod === 'cash' ? 'PENDING AT TABLE' : 'PAID SUCCESS'}\n`;
    if (specialInstructions.trim()) {
      receiptText += dashLine;
      receiptText += `Special Instructions:\n"${specialInstructions}"\n`;
    }
    receiptText += borderLine;
    receiptText += "      Thank you for dining with us!     \n";

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Royal_Restaurant_Receipt_${orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
  };

  const UPIQRCode = () => (
    <svg className="w-32 h-32 mx-auto bg-white p-2 rounded-lg border border-gray-200" viewBox="0 0 100 100">
      <rect x="5" y="5" width="25" height="25" fill="none" stroke="#000" strokeWidth="6" />
      <rect x="11" y="11" width="13" height="13" fill="#000" />
      <rect x="70" y="5" width="25" height="25" fill="none" stroke="#000" strokeWidth="6" />
      <rect x="76" y="11" width="13" height="13" fill="#000" />
      <rect x="5" y="70" width="25" height="25" fill="none" stroke="#000" strokeWidth="6" />
      <rect x="11" y="76" width="13" height="13" fill="#000" />
      <rect x="40" y="10" width="8" height="8" fill="#000" />
      <rect x="50" y="5" width="10" height="15" fill="#000" />
      <rect x="45" y="25" width="15" height="5" fill="#000" />
      <rect x="35" y="40" width="10" height="20" fill="#000" />
      <rect x="50" y="45" width="15" height="10" fill="#000" />
      <rect x="70" y="40" width="20" height="10" fill="#000" />
      <rect x="80" y="55" width="15" height="15" fill="#000" />
      <rect x="40" y="75" width="15" height="15" fill="#000" />
      <rect x="60" y="70" width="10" height="25" fill="#000" />
      <rect x="75" y="75" width="15" height="5" fill="#000" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center p-0 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
      {/* Printable CSS block */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-receipt, #printable-receipt * {
            visibility: visible;
          }
          #printable-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white;
            color: black;
            box-shadow: none;
            border: none;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {step !== 3 ? (
          /* Checkout Steps 1 & 2 Modal Card */
          <motion.div 
            key="modal-form"
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 150 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full sm:max-w-xl bg-white dark:bg-gray-900 rounded-t-[2.5rem] sm:rounded-3xl overflow-hidden shadow-2xl border-t sm:border border-gray-100 dark:border-gray-800 max-h-[92vh] sm:max-h-[90vh] flex flex-col no-print"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                  <FiShoppingBag className="w-5 h-5" />
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {step === 1 ? 'Order Details' : 'Secure Payment'}
                </h2>
              </div>
              <button 
                onClick={handleClose} 
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Step Indicator */}
            <div className="px-6 sm:px-8 py-3 bg-gray-50 dark:bg-gray-800/40 flex justify-between items-center text-xs font-semibold text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <span className={step >= 1 ? 'text-orange-500 font-bold' : ''}>1. Customise</span>
              <div className={`h-0.5 flex-grow mx-4 rounded ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
              <span className={step >= 2 ? 'text-orange-500 font-bold' : ''}>2. Payment</span>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-grow overflow-y-auto p-6 sm:p-8">
              {step === 1 ? (
                /* Step 1: Form */
                <div className="space-y-6">
                  {/* Dish Card Summary */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shrink-0" 
                    />
                    <div>
                      <span className="text-[10px] sm:text-xs font-semibold text-orange-500 uppercase tracking-wider">{dish.tag || 'Chef Special'}</span>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">{dish.name}</h3>
                      <p className="text-orange-600 dark:text-orange-400 font-extrabold mt-0.5 sm:mt-1">{dish.price}</p>
                    </div>
                  </div>

                  {/* Table Selection and Guest Members */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Table Number / Count
                      </label>
                      <select 
                        value={tableNumber} 
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-sm"
                      >
                        {[...Array(15)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>Table {i + 1}</option>
                        ))}
                      </select>
                      {errors.tableNumber && (
                        <p className="text-red-500 text-[10px] sm:text-xs mt-1 font-medium">{errors.tableNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Guests / Members
                      </label>
                      <input 
                        type="number"
                        min="1"
                        max="20"
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-sm"
                      />
                      {errors.guestsCount && (
                        <p className="text-red-500 text-[10px] sm:text-xs mt-1 font-medium">{errors.guestsCount}</p>
                      )}
                    </div>
                  </div>

                  {/* Quantity Customizer */}
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/10">
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200">Select Quantity</h4>
                      <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">Adjust the amount of this dish</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700">
                      <button 
                        type="button"
                        disabled={quantity <= 1}
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-orange-500 hover:text-white disabled:opacity-40 disabled:hover:bg-gray-50 disabled:hover:text-gray-600 transition-all cursor-pointer"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-base sm:text-lg text-gray-900 dark:text-white w-6 text-center">{quantity}</span>
                      <button 
                        type="button"
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Special Instructions (Others Thing) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Special Requests / Chef Notes
                    </label>
                    <textarea 
                      rows="3"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="E.g., extra spicy, no onion, allergies details, etc."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none text-sm"
                    ></textarea>
                  </div>

                  {/* Total Cost Preview & Next Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">Estimated Subtotal</p>
                      <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={handleNextStep}
                      className="bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-bold shadow-lg shadow-orange-500/20 transition-all text-sm flex items-center gap-2 cursor-pointer"
                    >
                      Proceed to Pay
                    </button>
                  </div>
                </div>
              ) : (
                /* Step 2: Payment options */
                <div className="space-y-6">
                  {/* Cost Breakdown Accordion */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800 space-y-3">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{dish.name} (x{quantity})</span>
                      <span className="font-semibold text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-500 dark:text-gray-400">GST (5%)</span>
                      <span className="font-semibold text-gray-900 dark:text-white">₹{gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Service Charge (10%)</span>
                      <span className="font-semibold text-gray-900 dark:text-white">₹{serviceCharge.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-gray-700/60 my-1"></div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm sm:text-base text-gray-950 dark:text-white">Grand Total</span>
                      <span className="font-black text-lg sm:text-xl text-orange-600 dark:text-orange-400">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Option Tabs */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Choose Payment Option
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        type="button"
                        onClick={() => { setPaymentMethod('card'); setErrors({}); }}
                        className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'card' 
                            ? 'border-orange-500 bg-orange-500/5 text-orange-600 dark:text-orange-400 font-bold shadow-sm' 
                            : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <FiCreditCard className="w-5 h-5 mb-1.5" />
                        <span className="text-[10px] sm:text-xs">Card Payment</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => { setPaymentMethod('upi'); setErrors({}); }}
                        className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'upi' 
                            ? 'border-orange-500 bg-orange-500/5 text-orange-600 dark:text-orange-400 font-bold shadow-sm' 
                            : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span className="font-black text-sm mb-1.5 leading-none">UPI</span>
                        <span className="text-[10px] sm:text-xs">UPI / QR Code</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => { setPaymentMethod('cash'); setErrors({}); }}
                        className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'cash' 
                            ? 'border-orange-500 bg-orange-500/5 text-orange-600 dark:text-orange-400 font-bold shadow-sm' 
                            : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <FiDollarSign className="w-5 h-5 mb-1.5" />
                        <span className="text-[10px] sm:text-xs">Cash on Table</span>
                      </button>
                    </div>
                  </div>

                  {/* Form fields based on selected Payment Option */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                            Cardholder Name
                          </label>
                          <input 
                            type="text"
                            required
                            value={cardName}
                            onChange={(e) => { setCardName(e.target.value); if (errors.cardName) setErrors({...errors, cardName: ''}); }}
                            placeholder="e.g. John Doe"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium placeholder-gray-400 text-sm"
                          />
                          {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                        </div>

                        <div>
                          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                            Card Number
                          </label>
                          <input 
                            type="text"
                            required
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium placeholder-gray-400 text-sm tracking-wider"
                          />
                          {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                              Expiry Date
                            </label>
                            <input 
                              type="text"
                              required
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              placeholder="MM/YY"
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium placeholder-gray-400 text-sm text-center"
                            />
                            {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                              CVV
                            </label>
                            <input 
                              type="password"
                              required
                              value={cardCvv}
                              onChange={handleCvvChange}
                              placeholder="***"
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium placeholder-gray-400 text-sm text-center"
                            />
                            {errors.cardCvv && <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'upi' && (
                      <div className="space-y-4 text-center">
                        <div className="bg-orange-500/5 py-4 rounded-2xl border border-dashed border-orange-500/20">
                          <UPIQRCode />
                          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-3 max-w-[280px] mx-auto leading-relaxed">
                            Scan this QR code with GPay, PhonePe, or Paytm to initiate payment.
                          </p>
                        </div>

                        <div className="text-left">
                          <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                            Or enter UPI ID for verification
                          </label>
                          <input 
                            type="text"
                            required
                            value={upiId}
                            onChange={(e) => { setUpiId(e.target.value); if (errors.upiId) setErrors({...errors, upiId: ''}); }}
                            placeholder="e.g. name@okhdfcbank"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium placeholder-gray-400 text-sm"
                          />
                          {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'cash' && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/10 flex items-start gap-3">
                        <FiInfo className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          <p className="font-bold mb-0.5">Cash on Dining Table</p>
                          <p>
                            Your order will be instantly submitted to our kitchen. Please keep cash handy or request card billing when dining.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Step Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 mt-8 gap-4">
                      <button 
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold text-gray-600 dark:text-gray-300 transition-colors text-sm cursor-pointer"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        className="flex-grow bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-orange-500/20 transition-all text-sm cursor-pointer"
                      >
                        {paymentMethod === 'cash' ? 'Confirm & Place Order' : 'Pay & Generate Receipt'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* Step 3: Clean Receipt view in center of backdrop, also scrollable */
          <motion.div 
            key="receipt-card"
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 150 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            id="printable-receipt"
            className="relative w-full sm:max-w-md bg-white dark:bg-gray-900 rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl border-t sm:border border-gray-100 dark:border-gray-800 p-6 sm:p-8 space-y-6 max-h-[92vh] sm:max-h-[90vh] overflow-y-auto flex flex-col"
          >
            {/* Scrollable Receipt Body */}
            <div className="flex-grow space-y-6">
              {/* Dotted border decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-200 dark:from-gray-800 to-transparent bg-[length:12px_6px] bg-repeat-x no-print"></div>

              {/* Success Checkmark Animation */}
              <div className="text-center no-print pt-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <FiCheckCircle className="w-9 h-9" />
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">Order Confirmed!</h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Receipt details generated successfully.</p>
              </div>

              {/* Printable Header */}
              <div className="text-center border-b border-dashed border-gray-200 dark:border-gray-800 pb-5 pt-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-gray-900 dark:text-white uppercase">Royal Restaurant</h1>
                <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1">128 Culinary Court, Fine Food City</p>
                <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">Phone: +1 (555) 019-2834</p>
              </div>

              {/* Invoice Metadata */}
              <div className="grid grid-cols-2 gap-y-3 text-xs border-b border-dashed border-gray-200 dark:border-gray-800 pb-5">
                <div>
                  <span className="text-gray-400 dark:text-gray-500">Order ID:</span>
                  <p className="font-bold text-gray-800 dark:text-gray-200 mt-0.5">{orderId}</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 dark:text-gray-500">Date/Time:</span>
                  <p className="font-bold text-gray-800 dark:text-gray-200 mt-0.5">{orderDate}</p>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-gray-500">Table Count/Num:</span>
                  <p className="font-bold text-gray-800 dark:text-gray-200 mt-0.5">Table {tableNumber}</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 dark:text-gray-500">Guests/Members:</span>
                  <p className="font-bold text-gray-800 dark:text-gray-200 mt-0.5">{guestsCount} Pax</p>
                </div>
              </div>

              {/* Order Items Table */}
              <div className="border-b border-dashed border-gray-200 dark:border-gray-800 pb-5">
                <span className="text-xs text-gray-400 dark:text-gray-500 block mb-3">Order Items</span>
                <div className="flex justify-between items-start text-xs sm:text-sm">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white leading-snug">{dish.name}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-0.5">{dish.price} x {quantity}</p>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Receipt Summary */}
              <div className="space-y-2 border-b border-dashed border-gray-200 dark:border-gray-800 pb-5 text-xs">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>GST (5%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Service Charge (10%)</span>
                  <span>₹{serviceCharge.toFixed(2)}</span>
                </div>
                <div className="h-px border-t border-gray-100 dark:border-gray-800/80 my-1.5"></div>
                <div className="flex justify-between items-center text-sm font-black text-gray-900 dark:text-white">
                  <span>Grand Total</span>
                  <span className="text-orange-600 dark:text-orange-400">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl flex items-center justify-between text-xs border border-gray-100 dark:border-gray-800">
                <div>
                  <span className="text-gray-400 dark:text-gray-500 block mb-0.5">Payment Method</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">
                    {paymentMethod === 'card' && `Credit/Debit Card (${cardNumber})`}
                    {paymentMethod === 'upi' && `UPI ID (${upiId})`}
                    {paymentMethod === 'cash' && 'Cash (Pay on Dining Table)'}
                  </span>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[9px] ${
                  paymentMethod === 'cash' 
                    ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                    : 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400'
                }`}>
                  {paymentMethod === 'cash' ? 'Pending' : 'Success'}
                </span>
              </div>

              {/* Special Instructions Preview */}
              {specialInstructions.trim() && (
                <div className="text-[11px] p-3.5 rounded-2xl border border-gray-100 dark:border-gray-850 bg-gray-50/30 dark:bg-gray-800/10">
                  <span className="text-gray-400 dark:text-gray-500 font-semibold block mb-0.5">Kitchen Notes:</span>
                  <p className="italic text-gray-600 dark:text-gray-400">"{specialInstructions}"</p>
                </div>
              )}

              {/* Barcode Mock */}
              <div className="flex flex-col items-center pt-2 gap-1 border-t border-dashed border-gray-200 dark:border-gray-800">
                <svg className="w-44 h-8 text-gray-900 dark:text-white" viewBox="0 0 120 20">
                  <rect x="5" y="2" width="2" height="16" fill="currentColor" />
                  <rect x="8" y="2" width="1" height="16" fill="currentColor" />
                  <rect x="11" y="2" width="3" height="16" fill="currentColor" />
                  <rect x="16" y="2" width="1" height="16" fill="currentColor" />
                  <rect x="18" y="2" width="2" height="16" fill="currentColor" />
                  <rect x="22" y="2" width="4" height="16" fill="currentColor" />
                  <rect x="27" y="2" width="1" height="16" fill="currentColor" />
                  <rect x="30" y="2" width="2" height="16" fill="currentColor" />
                  <rect x="34" y="2" width="3" height="16" fill="currentColor" />
                  <rect x="38" y="2" width="1" height="16" fill="currentColor" />
                  <rect x="41" y="2" width="2" height="16" fill="currentColor" />
                  <rect x="44" y="2" width="4" height="16" fill="currentColor" />
                  <rect x="50" y="2" width="1" height="16" fill="currentColor" />
                  <rect x="53" y="2" width="2" height="16" fill="currentColor" />
                  <rect x="57" y="2" width="3" height="16" fill="currentColor" />
                  <rect x="62" y="2" width="1" height="16" fill="currentColor" />
                  <rect x="65" y="2" width="2" height="16" fill="currentColor" />
                  <rect x="68" y="2" width="4" height="16" fill="currentColor" />
                  <rect x="74" y="2" width="1" height="16" fill="currentColor" />
                  <rect x="76" y="2" width="2" height="16" fill="currentColor" />
                  <rect x="80" y="2" width="3" height="16" fill="currentColor" />
                  <rect x="84" y="2" width="1" height="16" fill="currentColor" />
                  <rect x="87" y="2" width="2" height="16" fill="currentColor" />
                  <rect x="91" y="2" width="4" height="16" fill="currentColor" />
                  <rect x="97" y="2" width="1" height="16" fill="currentColor" />
                  <rect x="100" y="2" width="3" height="16" fill="currentColor" />
                  <rect x="105" y="2" width="1" height="16" fill="currentColor" />
                  <rect x="108" y="2" width="2" height="16" fill="currentColor" />
                  <rect x="112" y="2" width="3" height="16" fill="currentColor" />
                </svg>
                <span className="text-[8px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-mono">royal-restaurant-eats</span>
              </div>
            </div>

            {/* Receipt Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-4 no-print border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 flex-1">
                <button 
                  onClick={handleDownload}
                  title="Download receipt as text file"
                  className="flex-grow flex items-center justify-center gap-1.5 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 py-3 rounded-2xl text-gray-700 dark:text-gray-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <FiDownload className="w-3.5 h-3.5" />
                  Download
                </button>
                <button 
                  onClick={handlePrint}
                  title="Open print view"
                  className="flex-grow flex items-center justify-center gap-1.5 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 py-3 rounded-2xl text-gray-700 dark:text-gray-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <FiPrinter className="w-3.5 h-3.5" />
                  Print
                </button>
              </div>
              <button 
                onClick={handleClose}
                className="bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white py-3 px-6 rounded-2xl font-bold shadow-lg shadow-orange-500/20 transition-all text-xs text-center cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OrderModal;
