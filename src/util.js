import dayjs from 'dayjs';
import { FILTER_TYPE } from './const-data.js';
import { destinationNames } from './model/trip-event.js';

export function getRandomInt(from, to) {
  // Get random Int in range: [from, to)
  if (to < from) {
    throw Error('Incorrect range');
  }
  return Math.floor(Math.random() * (to - from)) + from;
}

export function getTrueWithChance(chance = 0.5) {
  // Gets true with given chance. chance is float between 0 and 1
  return Math.random() < chance;
}
export const getFullDataTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export function getLoremIpsum(wordsNumber) {
  // Get lorem ipsum text with given words number
  const loremIpsumText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.
  `;
  const loremIpsumWords = loremIpsumText.trim().split(/\s+/);
  const result = [];
  const k = Math.floor(wordsNumber / loremIpsumWords.length);
  for (let i = 0; i < k; ++i) {
    result.push(...loremIpsumWords);
  }
  result.push(...loremIpsumWords.slice(0, wordsNumber % loremIpsumWords.length));
  return result.join(' ');
}

export function capitalize(string) {
  if (!string) {
    return '';
  }
  return string[0].toUpperCase() + string.substring(1).toLowerCase();
}

export function getRandomElement(array) {
  const index = getRandomInt(0, array.length);
  return array[index];
}


const getRandomArrayElement = (array) => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
};

const getDate = (date) => dayjs(date).format('MMM D');
const getTime = (date) => dayjs(date).format('HH-mm');


const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'm');

const sortDays = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dateTo, taskB.dateTo);

  return weight ?? dayjs(taskA.dateTo).diff(dayjs(taskB.dateTo));
};

const sortPrices = (taskA, taskB) => taskB.basePrice - taskA.basePrice;

const isDateFuture = (date) => {
  const currentDate = dayjs();
  const targetDate = dayjs(date);
  return targetDate.isAfter(currentDate, 'm');
};

export function sample(array, k) {
  // Gets k random unique elements from array.
  // Similar to python random.sample()

  const n = array.length;
  if (n < k) {
    throw new Error(`Can't get ${k} unique elements from array with length ${n}`);
  } else if (n === k) {
    return [...array];
  }

  // not very optimal solution
  const resultIndexes = new Set();
  for (let i = 0; i < k; ++i) {
    let currentIndex;
    do {
      currentIndex = getRandomInt(0, n);
    } while (resultIndexes.has(currentIndex));
    resultIndexes.add(currentIndex);
  }
  const result = [];
  for (const index of resultIndexes) {
    result.push(array[index]);
  }
  return result;
}

const filter = {
  [FILTER_TYPE.EVERYTHING]: (events) => events,
  [FILTER_TYPE.FUTURE]: (events) => events.filter((event) => isDateFuture(event.dateTo)),
};

const isFormValid = (state) => {
  if (state.destination && state.basePrice) {
    const isDestination = destinationNames.includes(state.destination.name);
    return isDestination && /^\d+$/.test(state.basePrice);
  }
  return false;
};

export { isFormValid, filter, isDatesEqual, sortDays, sortPrices, getRandomArrayElement, getDate, getTime };
