// Payment processing functions with enhanced interactive card forms
function showPaymentMethodModal() {
    const modal = document.createElement('div');
    modal.id = 'paymentMethodModal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-95 animate-in fade-in-0 zoom-in-95">
            <div class="p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Payment Method</h2>
                <div class="space-y-4">
                    <button onclick="processPayment('atm')" class="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition duration-200 flex items-center space-x-3 group">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                        </div>
                        <div class="text-left">
                            <div class="font-semibold text-gray-900">ATM Card</div>
                            <div class="text-sm text-gray-500">Debit/Credit Card</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover:text-indigo-500 transition ml-auto"><path d="m9 18 6-6-6-6"/></svg>
                    </button>

                    <button onclick="processPayment('easypaisa')" class="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition duration-200 flex items-center space-x-3 group">
                        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </div>
                        <div class="text-left">
                            <div class="font-semibold text-gray-900">EasyPaisa</div>
                            <div class="text-sm text-gray-500">Mobile Wallet</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover:text-green-500 transition ml-auto"><path d="m9 18 6-6-6-6"/></svg>
                    </button>

                    <button onclick="processPayment('jazzcash')" class="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition duration-200 flex items-center space-x-3 group">
                        <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </div>
                        <div class="text-left">
                            <div class="font-semibold text-gray-900">JazzCash</div>
                            <div class="text-sm text-gray-500">Mobile Wallet</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover:text-purple-500 transition ml-auto"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                </div>
                <button onclick="closePaymentMethodModal()" class="w-full mt-6 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200">
                    Cancel
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        modal.querySelector('.animate-in').classList.remove('scale-95');
        modal.querySelector('.animate-in').classList.add('scale-100');
    }, 10);
}

function closePaymentMethodModal() {
    const modal = document.getElementById('paymentMethodModal');
    if (modal) {
        modal.classList.add('animate-out', 'fade-out-0', 'zoom-out-95');
        setTimeout(() => modal.remove(), 300);
    }
}

function processPayment(method) {
    closePaymentMethodModal();
    showPaymentForm(method);
}

function showPaymentForm(method) {
    const formModal = document.createElement('div');
    formModal.id = 'paymentFormModal';
    formModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';

    let formContent = '';

    if (method === 'atm') {
        formContent = `
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 transform transition-all duration-300 scale-95 animate-in fade-in-0 zoom-in-95">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-gray-900">ATM Card Payment</h2>
                        <button onclick="closePaymentForm()" class="text-gray-400 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>

                    <!-- Interactive Card Preview -->
                    <div class="mb-6">
                        <div id="cardPreview" class="w-full h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
                            <div class="absolute top-4 right-4">
                                <div class="w-12 h-8 bg-yellow-400 rounded opacity-80"></div>
                            </div>
                            <div class="mt-8">
                                <div class="text-lg font-mono tracking-wider mb-4" id="cardNumberPreview">•••• •••• •••• ••••</div>
                                <div class="flex justify-between items-end">
                                    <div>
                                        <div class="text-xs opacity-80 mb-1">Card Holder</div>
                                        <div class="font-semibold" id="cardHolderPreview">FULL NAME</div>
                                    </div>
                                    <div>
                                        <div class="text-xs opacity-80 mb-1">Expires</div>
                                        <div class="font-semibold" id="cardExpiryPreview">MM/YY</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form id="atmForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                   oninput="formatCardNumber(this); updateCardPreview()">
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5"
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                       oninput="formatExpiry(this); updateCardPreview()">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                <input type="text" id="cvv" placeholder="123" maxlength="4"
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Card Holder Name</label>
                            <input type="text" id="cardHolder" placeholder="John Doe"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                   oninput="updateCardPreview()">
                        </div>

                        <button type="submit" class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold shadow-lg">
                            Pay PKR ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                        </button>
                    </form>
                </div>
            </div>
        `;
    } else if (method === 'easypaisa') {
        formContent = `
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 transform transition-all duration-300 scale-95 animate-in fade-in-0 zoom-in-95">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-gray-900">EasyPaisa Payment</h2>
                        <button onclick="closePaymentForm()" class="text-gray-400 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>

                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </div>
                        <p class="text-gray-600">Enter your EasyPaisa mobile number</p>
                    </div>

                    <form id="easypaisaForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                            <input type="tel" id="easypaisaNumber" placeholder="03XX XXXXXXX" maxlength="11"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition">
                        </div>

                        <div class="bg-green-50 p-4 rounded-lg">
                            <p class="text-sm text-green-800">
                                <strong>Note:</strong> After entering your number, you'll receive a notification on your phone to proceed with payment.
                            </p>
                        </div>

                        <button type="submit" class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 font-semibold shadow-lg">
                            Send Verification
                        </button>
                    </form>
                </div>
            </div>
        `;
    } else if (method === 'jazzcash') {
        formContent = `
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 transform transition-all duration-300 scale-95 animate-in fade-in-0 zoom-in-95">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-gray-900">JazzCash Payment</h2>
                        <button onclick="closePaymentForm()" class="text-gray-400 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>

                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </div>
                        <p class="text-gray-600">Enter your JazzCash account details</p>
                    </div>

                    <form id="jazzcashForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                            <input type="tel" id="jazzcashNumber" placeholder="03XX XXXXXXX" maxlength="11"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">MPIN</label>
                            <input type="password" id="jazzcashPin" placeholder="Enter your MPIN" maxlength="6"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
                        </div>

                        <div class="bg-purple-50 p-4 rounded-lg">
                            <p class="text-sm text-purple-800">
                                <strong>Note:</strong> You will receive a confirmation SMS after successful payment.
                            </p>
                        </div>

                        <button type="submit" class="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold shadow-lg">
                            Pay PKR ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                        </button>
                    </form>
                </div>
            </div>
        `;
    }

    formModal.innerHTML = formContent;
    document.body.appendChild(formModal);

    // Animate in
    setTimeout(() => {
        const animateElement = formModal.querySelector('.animate-in');
        if (animateElement) {
            animateElement.classList.remove('scale-95');
            animateElement.classList.add('scale-100');
        }
    }, 10);

    // Add form submission handlers with validation
    if (method === 'atm') {
        document.getElementById('atmForm').addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateATMForm()) {
                completePayment('atm');
            }
        });
    } else if (method === 'easypaisa') {
        document.getElementById('easypaisaForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            if (validateEasyPaisaForm()) {
                await initiateEasyPaisaVerification();
            }
        });
    } else if (method === 'jazzcash') {
        document.getElementById('jazzcashForm').addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateJazzCashForm()) {
                completePayment('jazzcash');
            }
        });
    }
}

function closePaymentForm() {
    const modal = document.getElementById('paymentFormModal');
    if (modal) {
        modal.classList.add('animate-out', 'fade-out-0', 'zoom-out-95');
        setTimeout(() => modal.remove(), 300);
    }
}

// Card formatting and preview functions
function formatCardNumber(input) {
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    input.value = formattedValue;
}

function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

function updateCardPreview() {
    const cardNumber = document.getElementById('cardNumber').value;
    const cardHolder = document.getElementById('cardHolder').value;
    const expiryDate = document.getElementById('expiryDate').value;

    document.getElementById('cardNumberPreview').textContent = cardNumber || '•••• •••• •••• ••••';
    document.getElementById('cardHolderPreview').textContent = cardHolder.toUpperCase() || 'FULL NAME';
    document.getElementById('cardExpiryPreview').textContent = expiryDate || 'MM/YY';
}

function completePayment(method) {
    closePaymentForm();

    // Show processing animation
    const processingModal = document.createElement('div');
    processingModal.id = 'processingModal';
    processingModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
    processingModal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl p-8 text-center">
            <div class="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Processing Payment...</h3>
            <p class="text-gray-600">Please wait while we process your ${method} payment</p>
        </div>
    `;
    document.body.appendChild(processingModal);

    // Simulate processing time
    setTimeout(() => {
        processingModal.remove();
        finishOrder();
    }, 3000);
}

function finishOrder() {
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();

    // Show success modal
    const successModal = document.createElement('div');
    successModal.id = 'successModal';
    successModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
    successModal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl p-8 text-center max-w-sm mx-4">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Payment Successful!</h3>
            <p class="text-gray-600 mb-6">Thank you for shopping with DayaStore. Your order has been placed successfully.</p>
            <button onclick="closeSuccessModal()" class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold">
                Continue Shopping
            </button>
        </div>
    `;
    document.body.appendChild(successModal);
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.remove();
    }
}

// Validation functions
function validateATMForm() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardHolder = document.getElementById('cardHolder').value.trim();

    if (cardNumber.length < 13 || cardNumber.length > 19) {
        alert('Please enter a valid card number (13-19 digits)');
        return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
    }

    if (cvv.length < 3 || cvv.length > 4) {
        alert('Please enter a valid CVV (3-4 digits)');
        return false;
    }

    if (cardHolder.length < 2) {
        alert('Please enter the card holder name');
        return false;
    }

    return true;
}

function validateEasyPaisaForm() {
    const number = document.getElementById('easypaisaNumber').value;

    if (!/^03\d{9}$/.test(number)) {
        alert('Please enter a valid EasyPaisa mobile number (03XXXXXXXXX)');
        return false;
    }

    return true;
}

// EasyPaisa API integration functions
async function initiateEasyPaisaVerification() {
    const mobileNumber = document.getElementById('easypaisaNumber').value;
    const amount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    try {
        const response = await fetch('/api/payment/easypaisa/initiate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobileNumber,
                amount
            })
        });

        const data = await response.json();

        if (data.success) {
            showEasyPaisaVerification(data.verificationId);
        } else {
            alert(data.message || 'Failed to initiate payment. Please try again.');
        }
    } catch (error) {
        console.error('Error initiating EasyPaisa payment:', error);
        alert('Network error. Please try again.');
    }
}

async function verifyEasyPaisaPayment(verificationId, pin) {
    try {
        const response = await fetch('/api/payment/easypaisa/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                verificationId,
                pin
            })
        });

        const data = await response.json();

        if (data.success) {
            completePayment('easypaisa');
        } else {
            alert(data.message || 'Payment verification failed. Please try again.');
            if (data.attemptsLeft) {
                alert(`Attempts left: ${data.attemptsLeft}`);
            }
        }
    } catch (error) {
        console.error('Error verifying EasyPaisa payment:', error);
        alert('Network error. Please try again.');
    }
}

async function resendEasyPaisaNotification(verificationId) {
    try {
        const response = await fetch('/api/payment/easypaisa/resend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                verificationId
            })
        });

        const data = await response.json();

        if (data.success) {
            alert('Notification resent to your EasyPaisa app. Please check your phone.');
        } else {
            alert(data.message || 'Failed to resend notification. Please try again.');
        }
    } catch (error) {
        console.error('Error resending EasyPaisa notification:', error);
        alert('Network error. Please try again.');
    }
}

function validateJazzCashForm() {
    const number = document.getElementById('jazzcashNumber').value;
    const pin = document.getElementById('jazzcashPin').value;

    if (!/^03\d{9}$/.test(number)) {
        alert('Please enter a valid JazzCash mobile number (03XXXXXXXXX)');
        return false;
    }

    if (pin.length !== 6) {
        alert('Please enter a valid 6-digit MPIN');
        return false;
    }

    return true;
}

// EasyPaisa verification modal
function showEasyPaisaVerification(verificationId) {
    closePaymentForm();

    const verificationModal = document.createElement('div');
    verificationModal.id = 'verificationModal';
    verificationModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
    verificationModal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 transform transition-all duration-300 scale-95 animate-in fade-in-0 zoom-in-95">
            <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">EasyPaisa Verification</h2>
                    <button onclick="closeVerificationModal()" class="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>

                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <p class="text-gray-600 mb-4">Check your phone for a payment notification</p>
                    <p class="text-sm text-gray-500">A notification has been sent to your EasyPaisa app. Please proceed with the payment on your phone.</p>
                </div>

                <div class="bg-green-50 p-4 rounded-lg mb-6">
                    <div class="flex items-center space-x-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                        <span class="text-sm font-medium text-green-800">Payment Request Sent</span>
                    </div>
                    <p class="text-sm text-green-700">Amount: PKR ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
                </div>

                <form id="easypaisaVerificationForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Enter PIN from your phone</label>
                        <input type="password" id="easypaisaVerificationPin" placeholder="Enter 5-digit PIN" maxlength="5"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition">
                    </div>

                    <button type="submit" class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 font-semibold shadow-lg">
                        Confirm Payment
                    </button>
                </form>

                <div class="text-center mt-4">
                    <button onclick="resendEasyPaisaNotification('${verificationId}')" class="text-sm text-green-600 hover:text-green-700 underline">
                        Didn't receive notification? Resend
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(verificationModal);

    // Animate in
    setTimeout(() => {
        const animateElement = verificationModal.querySelector('.animate-in');
        if (animateElement) {
            animateElement.classList.remove('scale-95');
            animateElement.classList.add('scale-100');
        }
    }, 10);

    // Add form submission handler
    document.getElementById('easypaisaVerificationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const pin = document.getElementById('easypaisaVerificationPin').value;
        if (pin.length === 5) {
            await verifyEasyPaisaPayment(verificationId, pin);
        } else {
            alert('Please enter a valid 5-digit PIN');
        }
    });
}

function closeVerificationModal() {
    const modal = document.getElementById('verificationModal');
    if (modal) {
        modal.classList.add('animate-out', 'fade-out-0', 'zoom-out-95');
        setTimeout(() => modal.remove(), 300);
    }
}

function resendEasyPaisaNotification() {
    alert('Notification resent to your EasyPaisa app. Please check your phone.');
}

function validateEasyPaisaVerificationPin() {
    const pin = document.getElementById('easypaisaVerificationPin').value;

    if (pin.length !== 5) {
        alert('Please enter a valid 5-digit PIN');
        return false;
    }

    return true;
}
