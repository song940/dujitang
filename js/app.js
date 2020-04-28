const $ = document.querySelector.bind(document);

const addEventListener = (type, fn) => {
  document.addEventListener(type, fn);
  return () => document.removeEventListener(type, fn);
};

const ready = fn => {
  document.addEventListener('DOMContentLoaded', fn);
};

const fetchData = () => {
  return Promise
    .resolve()
    .then(() => fetch('data/dujitang.txt'))
    .then(res => res.text())
    .then(res => res.split(/\n/g))
};

ready(async () => {
  const element = $('#sentence');
  const dujitang = await fetchData();
  const index = Math.floor(Math.random() * dujitang.length);
  const sentence = dujitang[index];
  element.innerText = sentence;
});