const sampleData = [
  {
    title: 'Papyrus: The Invention of Books in the Ancient World',
    authorFirstName: 'Irene',
    authorLastName: 'Vallejo',
    coverImgURL:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654622398i/60149545.jpg',
    genre: 'Nonfiction',
    description:
      'An enthralling journey through the history of books and libraries in the ancient world and those who have helped preserve their rich literary traditions',
    publisher: 'Knopf',
  },
  {
    title: 'Oak Flat: A Fight for Sacred Land in the American West',
    authorFirstName: 'Lauren',
    authorLastName: 'Redniss',
    coverImgURL:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1571889785l/52541042.jpg',
    genre: 'Nonfiction',
    description:
      'A powerful work of visual nonfiction about three generations of an Apache family struggling to protect sacred land from a multinational mining corporation, by MacArthur “Genius” and National Book Award finalist Lauren Redniss, the acclaimed author of Thunder & Lightning',
    publisher: 'Random House',
  },
  {
    title:
      "That Wild Country: An Epic Journey through the Past, PResent, and Future of America's Public Lands",
    authorFirstName: 'Mark',
    authorLastName: 'Kenyon',
    coverImgURL:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1568104126l/53043941.jpg',
    genre: 'History',
    description:
      'From prominent outdoorsman and nature writer Mark Kenyon comes an engrossing reflection on the past and future battles over our most revered landscapes—America’s public lands.',
    publisher: 'Little A',
  },
  {
    title: 'Abroad in Japan: Ten Years in the Land of the Rising Sun',
    authorFirstName: 'Chris',
    authorLastName: 'Broad',
    coverImgURL:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691266245i/64645771.jpg',
    genre: 'Memoir',
    description:
      "When Englishman Chris Broad landed in a rural village in northern Japan he wondered if he'd made a huge mistake. With no knowledge of the language and zero teaching experience, was he about to be the most quickly fired English teacher in Japan's history?",
    publisher: 'Bantam Press',
  },
  {
    title: 'The Outsider',
    authorFirstName: 'Stephen',
    authorLastName: 'King',
    coverImgURL:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1524596540i/36124936.jpg',
    genre: 'Horror',
    description:
      'An unspeakable crime. A confounding investigation. At a time when the King brand has never been stronger, he has delivered one of his most unsettling and compulsively readable stories.',
    publisher: 'Scribner',
  },
  {
    title: 'Babel: An Arcane History',
    authorFirstName: 'R.F.',
    authorLastName: 'Kuang',
    coverImgURL:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1677361825i/57945316.jpg',
    genre: 'Fantasy',
    description:
      'From award-winning author R. F. Kuang comes Babel, a historical fantasy epic that grapples with student revolutions, colonial resistance, and the use of language and translation as the dominating tool of the British Empire',
    publisher: 'Harper Voyager',
  },
  {
    title:
      'The Earth is Weeping: The Epic Story of the Indian Wars for the American West',
    authorFirstName: 'Peter',
    authorLastName: 'Cozzens',
    coverImgURL:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1477357270i/32738504.jpg',
    genre: 'History',
    description:
      'In a sweeping narrative, Peter Cozzens tells the story of the wars and negotiations that destroyed native ways of life as the American nation continued its expansion onto traditional tribal lands after the civil war. Cozzens illuminates the encroachment experienced by the tribes and the tribal conflicts over whether to fight or make peace, and explores the squalid lives of soldiers posted to the frontier and the ethical quandaries faced by generals who often sympathized with their native enemies.',
    publisher: 'Atlantic Books',
  },
  {
    title: 'Project Hail Mary',
    authorFirstName: 'Andy',
    authorLastName: 'Weir',
    coverImgURL:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg',
    genre: 'Science Fiction',
    description:
      'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.',
    publisher: 'Ballantine Books',
  },
  {
    title: 'The Way of Kings',
    authorFirstName: 'Brandon',
    authorLastName: 'Sanderson',
    coverImgURL:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1659905828i/7235533.jpg',
    genre: 'Fantasy',
    description:
      'From #1 New York Times bestselling author Brandon Sanderson, The Way of Kings, book one of The Stormlight Archive begins an incredible new saga of epic proportion.',
    publisher: 'Tor Books',
  },
  {
    title: 'Educated',
    authorFirstName: 'Tara',
    authorLastName: 'Westover',
    coverImgURL:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575905585i/37826561.jpg',
    genre: 'Memoir',
    description:
      'Tara Westover grew up preparing for the End of Days, watching for the sun to darken, for the moon to drip as if with blood. She spent her summers bottling peaches and her winters rotating emergency supplies, hoping that when the World of Men failed, her family would continue on, unaffected.',
    publisher: 'Cornerstone Digital',
  },
  {
    title: 'Shogun',
    authorFirstName: 'James',
    authorLastName: 'Clavell',
    coverImgURL:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1452884951i/18950065.jpg',
    genre: 'Historical Fiction',
    description:
      "This is James Clavell's tour-de-force; an epic saga of one Pilot-Major John Blackthorne, and his integration into the struggles and strife of feudal Japan. Both entertaining and incisive, SHOGUN is a stunningly dramatic re-creation of a very different world.",
    publisher: 'Hodder & Stoughton',
  },
  {
    title: 'Pachinko',
    authorFirstName: 'Min Jin',
    authorLastName: 'Lee',
    coverImgURL:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1529845599i/34051011.jpg',
    genre: 'Historical Fiction',
    description:
      "Richly told and profoundly moving, Pachinko is a story of love, sacrifice, ambition, and loyalty. From bustling street markets to the halls of Japan's finest universities to the pachinko parlors of the criminal underworld, Lee's complex and passionate characters—strong, stubborn women, devoted sisters and sons, fathers shaken by moral crisis—survive and thrive against the indifferent arc of history.",
    publisher: 'Grand Central Publishing',
  },
];

module.exports = sampleData;
