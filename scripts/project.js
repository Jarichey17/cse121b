// URL of the JSON data
const currencyDataURL = "https://raw.githubusercontent.com/apilayer/currency-conversion/master/test/data/currencies.json";

// List of currency codes to extract
const currencyCodesToExtract = ["USD", "ARS", "EUR", "JPY", "RUB"];

// Select elements
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");

// Fetch the JSON data
fetch(currencyDataURL)
  .then((response) => response.json())
  .then((data) => {
    const currencies = data.currencies;

    // Create and add the default country
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select Country";
    toCurrencySelect.appendChild(defaultOption);

    // Get the dropdown options for specified currency codes
    currencyCodesToExtract.forEach((currencyCode) => {
      if (currencies[currencyCode]) {
        const option = document.createElement("option");
        option.value = currencyCode;
        option.text = `${currencyCode} - ${currencies[currencyCode]}`;
        fromCurrencySelect.appendChild(option.cloneNode(true));
        toCurrencySelect.appendChild(option.cloneNode(true));
      }
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// Foreign exchange rates as of 10/21
const exchangeRates = {
  USD: 1.0,
  ARS: 349.47,
  EUR: 0.94,
  JPY: 149.86,
  RUB: 95.45,
};

// Function to handle currency conversion
function handleCurrencyConversion() {
  // Get the selected currencies from the dropdowns
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  // Get the amount to be converted
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount)) {
    result.innerText = "Enter a valid amount";
    return;
  }

  // Check if the exchange rates are available
  if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
    const exchangeRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    const convertedAmount = amount * exchangeRate;
    result.innerText = `${amount.toFixed(2)} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
  } else {
    result.innerText = "Exchange rate not available";
  }
}
// ...

// Get the "Convert" button element
const convertButton = document.getElementById("convert");

// Event listener for the "Convert" button
convertButton.addEventListener("click", handleCurrencyConversion);
