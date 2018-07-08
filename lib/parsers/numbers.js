"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundToHalf = exports.parseNum = exports.pad = exports.getMiles = exports.getMeters = exports.getCurrencyFormat = exports.formatPhone = void 0;

var _googleLibphonenumber = require("google-libphonenumber");

var _lodash = require("lodash");

var _numeral = _interopRequireDefault(require("numeral"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formatPhone = (phoneNumber, countryCode = 'US') => {
  const phoneUtil = _googleLibphonenumber.PhoneNumberUtil.getInstance();

  try {
    const parsedNumber = phoneUtil.parse(phoneNumber, countryCode);
    return phoneUtil.format(parsedNumber, _googleLibphonenumber.PhoneNumberFormat.E164);
  } catch (e) {
    return '';
  }
};

exports.formatPhone = formatPhone;

const getCurrencyFormat = (amount, currency = 'USD', format = '0,0.00') => {
  let prefix;
  currency = currency.toUpperCase();

  switch (currency) {
    case 'GBP':
      prefix = '£';
      break;

    default:
      prefix = '$';
  }

  return `${prefix}${(0, _numeral.default)(amount).format(format)}`;
};

exports.getCurrencyFormat = getCurrencyFormat;

const getMeters = (miles, decimals = 1) => {
  return +(miles * 1609.344).toFixed(decimals);
};

exports.getMeters = getMeters;

const getMiles = (meters, decimals = 1) => {
  return +(meters * 0.000621371192).toFixed(decimals);
};

exports.getMiles = getMiles;

const pad = (num, size) => {
  let s = num + '';

  while (s.length < size) {
    s = '0' + s;
  }

  return s;
};

exports.pad = pad;

const parseNum = (num, max) => {
  if ((0, _lodash.isString)(num)) {
    if (max) {
      num = num.replace(/\D/g, '').substr(0, max);
    } else {
      num = num.replace(/\D/g, '');
    }
  } else if (max) {
    num = +num.toString().substr(0, max);
  }

  num = parseFloat(num);
  return isNaN(num) ? null : num;
};

exports.parseNum = parseNum;

const roundToHalf = value => {
  const converted = parseFloat(value);
  const decimal = Math.ceil((converted - parseInt(converted.toString(), 10)) * 10);

  if (decimal > 5) {
    return Math.ceil(converted);
  } else {
    return parseInt(converted.toString(), 10) + 0.5;
  }
};

exports.roundToHalf = roundToHalf;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXJzL251bWJlcnMudHMiXSwibmFtZXMiOlsiZm9ybWF0UGhvbmUiLCJwaG9uZU51bWJlciIsImNvdW50cnlDb2RlIiwicGhvbmVVdGlsIiwiUGhvbmVOdW1iZXJVdGlsIiwiZ2V0SW5zdGFuY2UiLCJwYXJzZWROdW1iZXIiLCJwYXJzZSIsImZvcm1hdCIsIlBob25lTnVtYmVyRm9ybWF0IiwiRTE2NCIsImUiLCJnZXRDdXJyZW5jeUZvcm1hdCIsImFtb3VudCIsImN1cnJlbmN5IiwicHJlZml4IiwidG9VcHBlckNhc2UiLCJnZXRNZXRlcnMiLCJtaWxlcyIsImRlY2ltYWxzIiwidG9GaXhlZCIsImdldE1pbGVzIiwibWV0ZXJzIiwicGFkIiwibnVtIiwic2l6ZSIsInMiLCJsZW5ndGgiLCJwYXJzZU51bSIsIm1heCIsInJlcGxhY2UiLCJzdWJzdHIiLCJ0b1N0cmluZyIsInBhcnNlRmxvYXQiLCJpc05hTiIsInJvdW5kVG9IYWxmIiwidmFsdWUiLCJjb252ZXJ0ZWQiLCJkZWNpbWFsIiwiTWF0aCIsImNlaWwiLCJwYXJzZUludCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRU8sTUFBTUEsY0FBYyxDQUFDQyxXQUFELEVBQXNCQyxjQUFzQixJQUE1QyxLQUE2RDtBQUN0RixRQUFNQyxZQUFZQyxzQ0FBZ0JDLFdBQWhCLEVBQWxCOztBQUVBLE1BQUk7QUFDRixVQUFNQyxlQUE0QkgsVUFBVUksS0FBVixDQUFnQk4sV0FBaEIsRUFBNkJDLFdBQTdCLENBQWxDO0FBQ0EsV0FBT0MsVUFBVUssTUFBVixDQUFpQkYsWUFBakIsRUFBK0JHLHdDQUFrQkMsSUFBakQsQ0FBUDtBQUNELEdBSEQsQ0FHRSxPQUFNQyxDQUFOLEVBQVM7QUFDVCxXQUFPLEVBQVA7QUFDRDtBQUNGLENBVE07Ozs7QUFXQSxNQUFNQyxvQkFBb0IsQ0FBQ0MsTUFBRCxFQUFpQkMsV0FBbUIsS0FBcEMsRUFBMkNOLFNBQWlCLFFBQTVELEtBQWlGO0FBQ2hILE1BQUlPLE1BQUo7QUFDQUQsYUFBV0EsU0FBU0UsV0FBVCxFQUFYOztBQUVBLFVBQU9GLFFBQVA7QUFDRSxTQUFLLEtBQUw7QUFDRUMsZUFBUyxHQUFUO0FBQ0E7O0FBQ0Y7QUFDRUEsZUFBUyxHQUFUO0FBTEo7O0FBUUEsU0FBUSxHQUFFQSxNQUFPLEdBQUUsc0JBQVFGLE1BQVIsRUFBZ0JMLE1BQWhCLENBQXVCQSxNQUF2QixDQUErQixFQUFsRDtBQUNELENBYk07Ozs7QUFlQSxNQUFNUyxZQUFZLENBQUNDLEtBQUQsRUFBZ0JDLFdBQW1CLENBQW5DLEtBQWlEO0FBQ3hFLFNBQU8sQ0FBRSxDQUFDRCxRQUFRLFFBQVQsRUFBbUJFLE9BQW5CLENBQTJCRCxRQUEzQixDQUFUO0FBQ0QsQ0FGTTs7OztBQUlBLE1BQU1FLFdBQVcsQ0FBQ0MsTUFBRCxFQUFpQkgsV0FBbUIsQ0FBcEMsS0FBa0Q7QUFDeEUsU0FBTyxDQUFFLENBQUNHLFNBQVMsY0FBVixFQUEwQkYsT0FBMUIsQ0FBa0NELFFBQWxDLENBQVQ7QUFDRCxDQUZNOzs7O0FBSUEsTUFBTUksTUFBTSxDQUFDQyxHQUFELEVBQWNDLElBQWQsS0FBdUM7QUFDeEQsTUFBSUMsSUFBSUYsTUFBTSxFQUFkOztBQUVBLFNBQU1FLEVBQUVDLE1BQUYsR0FBV0YsSUFBakIsRUFBdUI7QUFDckJDLFFBQUksTUFBTUEsQ0FBVjtBQUNEOztBQUVELFNBQU9BLENBQVA7QUFDRCxDQVJNOzs7O0FBVUEsTUFBTUUsV0FBVyxDQUFDSixHQUFELEVBQU1LLEdBQU4sS0FBK0I7QUFDckQsTUFBRyxzQkFBU0wsR0FBVCxDQUFILEVBQWtCO0FBQ2hCLFFBQUdLLEdBQUgsRUFBUTtBQUNOTCxZQUFNQSxJQUFJTSxPQUFKLENBQVksS0FBWixFQUFtQixFQUFuQixFQUF1QkMsTUFBdkIsQ0FBOEIsQ0FBOUIsRUFBaUNGLEdBQWpDLENBQU47QUFDRCxLQUZELE1BRU87QUFDTEwsWUFBTUEsSUFBSU0sT0FBSixDQUFZLEtBQVosRUFBbUIsRUFBbkIsQ0FBTjtBQUNEO0FBQ0YsR0FORCxNQU1PLElBQUdELEdBQUgsRUFBUTtBQUNiTCxVQUFNLENBQUVBLElBQUlRLFFBQUosR0FBZUQsTUFBZixDQUFzQixDQUF0QixFQUF5QkYsR0FBekIsQ0FBUjtBQUNEOztBQUVETCxRQUFNUyxXQUFXVCxHQUFYLENBQU47QUFFQSxTQUFPVSxNQUFNVixHQUFOLElBQWEsSUFBYixHQUFvQkEsR0FBM0I7QUFDRCxDQWRNOzs7O0FBZ0JBLE1BQU1XLGNBQWVDLEtBQUQsSUFBbUI7QUFDNUMsUUFBTUMsWUFBb0JKLFdBQVdHLEtBQVgsQ0FBMUI7QUFDQSxRQUFNRSxVQUFVQyxLQUFLQyxJQUFMLENBQVUsQ0FBQ0gsWUFBWUksU0FBU0osVUFBVUwsUUFBVixFQUFULEVBQStCLEVBQS9CLENBQWIsSUFBbUQsRUFBN0QsQ0FBaEI7O0FBRUEsTUFBR00sVUFBVSxDQUFiLEVBQWdCO0FBQ2QsV0FBT0MsS0FBS0MsSUFBTCxDQUFVSCxTQUFWLENBQVA7QUFDRCxHQUZELE1BRU87QUFDTCxXQUFPSSxTQUFTSixVQUFVTCxRQUFWLEVBQVQsRUFBK0IsRUFBL0IsSUFBcUMsR0FBNUM7QUFDRDtBQUNGLENBVE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Bob25lTnVtYmVyLCBQaG9uZU51bWJlckZvcm1hdCwgUGhvbmVOdW1iZXJVdGlsfSBmcm9tICdnb29nbGUtbGlicGhvbmVudW1iZXInO1xuaW1wb3J0IHtpc1N0cmluZ30gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBudW1lcmFsIGZyb20gJ251bWVyYWwnO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0UGhvbmUgPSAocGhvbmVOdW1iZXI6IHN0cmluZywgY291bnRyeUNvZGU6IHN0cmluZyA9ICdVUycpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBwaG9uZVV0aWwgPSBQaG9uZU51bWJlclV0aWwuZ2V0SW5zdGFuY2UoKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhcnNlZE51bWJlcjogUGhvbmVOdW1iZXIgPSBwaG9uZVV0aWwucGFyc2UocGhvbmVOdW1iZXIsIGNvdW50cnlDb2RlKTtcbiAgICByZXR1cm4gcGhvbmVVdGlsLmZvcm1hdChwYXJzZWROdW1iZXIsIFBob25lTnVtYmVyRm9ybWF0LkUxNjQpO1xuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW5jeUZvcm1hdCA9IChhbW91bnQ6IG51bWJlciwgY3VycmVuY3k6IHN0cmluZyA9ICdVU0QnLCBmb3JtYXQ6IHN0cmluZyA9ICcwLDAuMDAnKTogc3RyaW5nID0+IHtcbiAgbGV0IHByZWZpeDogc3RyaW5nO1xuICBjdXJyZW5jeSA9IGN1cnJlbmN5LnRvVXBwZXJDYXNlKCk7XG5cbiAgc3dpdGNoKGN1cnJlbmN5KSB7XG4gICAgY2FzZSAnR0JQJzpcbiAgICAgIHByZWZpeCA9ICfCoyc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcHJlZml4ID0gJyQnO1xuICB9XG5cbiAgcmV0dXJuIGAke3ByZWZpeH0ke251bWVyYWwoYW1vdW50KS5mb3JtYXQoZm9ybWF0KX1gO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldE1ldGVycyA9IChtaWxlczogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyID0gMSk6IG51bWJlciA9PiB7XG4gIHJldHVybiArKChtaWxlcyAqIDE2MDkuMzQ0KS50b0ZpeGVkKGRlY2ltYWxzKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0TWlsZXMgPSAobWV0ZXJzOiBudW1iZXIsIGRlY2ltYWxzOiBudW1iZXIgPSAxKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuICsoKG1ldGVycyAqIDAuMDAwNjIxMzcxMTkyKS50b0ZpeGVkKGRlY2ltYWxzKSk7XG59O1xuXG5leHBvcnQgY29uc3QgcGFkID0gKG51bTogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICBsZXQgcyA9IG51bSArICcnO1xuXG4gIHdoaWxlKHMubGVuZ3RoIDwgc2l6ZSkge1xuICAgIHMgPSAnMCcgKyBzO1xuICB9XG5cbiAgcmV0dXJuIHM7XG59O1xuXG5leHBvcnQgY29uc3QgcGFyc2VOdW0gPSAobnVtLCBtYXg/OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBpZihpc1N0cmluZyhudW0pKSB7XG4gICAgaWYobWF4KSB7XG4gICAgICBudW0gPSBudW0ucmVwbGFjZSgvXFxEL2csICcnKS5zdWJzdHIoMCwgbWF4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtID0gbnVtLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgfVxuICB9IGVsc2UgaWYobWF4KSB7XG4gICAgbnVtID0gKyhudW0udG9TdHJpbmcoKS5zdWJzdHIoMCwgbWF4KSk7XG4gIH1cblxuICBudW0gPSBwYXJzZUZsb2F0KG51bSk7XG5cbiAgcmV0dXJuIGlzTmFOKG51bSkgPyBudWxsIDogbnVtO1xufTtcblxuZXhwb3J0IGNvbnN0IHJvdW5kVG9IYWxmID0gKHZhbHVlKTogbnVtYmVyID0+IHtcbiAgY29uc3QgY29udmVydGVkOiBudW1iZXIgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgY29uc3QgZGVjaW1hbCA9IE1hdGguY2VpbCgoY29udmVydGVkIC0gcGFyc2VJbnQoY29udmVydGVkLnRvU3RyaW5nKCksIDEwKSkgKiAxMCk7XG5cbiAgaWYoZGVjaW1hbCA+IDUpIHtcbiAgICByZXR1cm4gTWF0aC5jZWlsKGNvbnZlcnRlZCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGNvbnZlcnRlZC50b1N0cmluZygpLCAxMCkgKyAwLjU7XG4gIH1cbn07XG4iXX0=