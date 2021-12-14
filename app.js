
// const bingImage = async ({ index = 0, n = 1, language = 'en-US' } = {}) => {
//   const bing = 'http://www.bing.com';
//   const response = await fetch(`${bing}/HPImageArchive.aspx?format=js&idx=${index}&n=${n}&mkt=${language}`, {})
//   const { images, tooltips } = await response.json();
//   return {
//     tooltips,
//     images: images.map(img => {
//       const { url, quiz } = img;
//       return {
//         ...img,
//         quiz: bing + quiz,
//         url: bing + url,
//       };
//     }),
//   };
// };

const anywayFM = async () => {
  const response = await fetch(`http://jjying-1253470762.cossh.myqcloud.com/anyway.tab.json`);
  let { episodes: episodesMap, quotes, settings } = await response.json();
  const episodes = Object.keys(episodesMap).map(id => {
    const [title, link] = episodesMap[id];
    return { id, title, link };
  });
  quotes = quotes.map(([author, quotes, episode]) => {
    return {
      author, quotes, source: episodes[episode]
    };
  });
  return {
    episodes,
    quotes,
    settings,
  };
};

const dujitang = () => {
  return Promise
    .resolve()
    .then(() => fetch('https://lsong.org/dujitang/data/dujitang.txt'))
    .then(res => res.text())
    .then(res => res.split(/\n/g))
};

const tuweiqinghua = () => {
  return Promise
    .resolve()
    .then(() => fetch(`https://gist.githubusercontent.com/song940/0f9f27c84ab54985b1f6e999435bd2c0/raw/tuweiqinghua.txt`))
    .then(res => res.text())
    .then(res => res.split(/\n/g))
};

const updateQuote = ({ quotes, author, source }) => {
  const $quote = document.querySelector('.quote');
  const $author = document.querySelector('.author');
  const $source = document.querySelector('.source');
  const $link = document.querySelector('.source-link')
  const $episode = document.querySelector('.source-episode')
  $quote.innerHTML = quotes;
  $author.innerText = author;
  if (source) {
    $link.href = source.link;
    $link.innerText = source.title;
    $episode.innerText = source.id;
  }
};

const sample = arr => {
  const x = Math.round(Math.random() * (arr.length - 1))
  return arr[x];
};

(async () => {
  const [anyway, jitang, words] = await Promise.all([
    anywayFM(),
    dujitang(),
    tuweiqinghua(),
  ]);
  const { episodes, quotes, settings } = anyway;
  const quote = sample([
    ...quotes,
    ...words.map((sentence, id) => {
      return {
        quotes: sentence,
        author: 'Lsong',
        source: {
          id,
          title: '土味情话',
          link: 'https://gist.github.com/song940/0f9f27c84ab54985b1f6e999435bd2c0'
        }
      };
    }),
    ...jitang.map((sentence, id) => {
      return {
        quotes: sentence,
        author: 'Lsong',
        source: {
          id,
          title: 'dujitang',
          link: 'https://lsong.org/dujitang'
        }
      };
    }),
  ]);
  updateQuote(quote);
})();