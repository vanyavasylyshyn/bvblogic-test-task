import { Check } from "typeorm";

module.exports = {
  async getWeekdays(daysLangth: number, startDate) {
    let daysOut = daysLangth;
    let weekdays = 0;
    while (daysOut >= 0) {
      if (startDate.isoWeekday() === 6 || startDate.isoWeekday() === 7) {
        weekdays++;
      }
      startDate = startDate.add(1, 'days');
      daysOut--;
    }

    return await weekdays;
  },

  async checkMinDuration(array, daysLangth) {
    let newArray = array.filter(element => {
      if (daysLangth > element.minDuration) {
        return true;
      }
    });

    return await newArray;
  },

  async checkPriceLimit(array, weekdays, daysLangth, priceLimit) {

    let newAraay = array.filter(element => {

      let price = ((daysLangth - weekdays) * element.dailyPrice) + (weekdays * element.weekendPrice);

      if (daysLangth >= 7) {
        price = price * ((100 - element.discount) / 100);
      }

      if (price < priceLimit) {
        return true;
      }
    });

    return await newAraay;
  },

  async arrayUnique(arr) {
    let resultArray = [];
    let array = arr.concat();

    for (let i = 0; i < array.length; ++i) {

      for (let j = i + 1; j < array.length; ++j) {

        if (array[i].id === array[j].id)
          resultArray.push(array[i]);
      }
    }

    return await resultArray;
  }


}

