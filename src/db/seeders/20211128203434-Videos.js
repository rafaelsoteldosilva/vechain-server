module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Videos',
			[
				// title, origin, author, uploadDate, url, excerpt
				{
					// 1
					// Videos-1, 1
					title: 'Vechain - Launch Film',
					origin: 'Vimeo',
					author: 'Rupert Cresswell',
					uploadDate: '2018/02/26',
					url: 'https://vimeo.com/257581453',
					excerpt:
						'The ‘VET Launch Film’, which debuted at VeChain Thor’s rebrand launch event in Singapore, breaks new ground as one of the world’s first brand campaigns for cryptocurrency. Created by MPC Creative with VFX by MPC, the film from agency Unconditioned Shanghai is set in a futuristic city that embodies the company’s vision; an inclusive blockchain platform that’s run by the people',
					videoCategoryId: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					// 2
					// Videos-1, 2
					title: 'Vechain Opening (cut down)',
					origin: 'Vimeo',
					author: 'JIAQI',
					uploadDate: '2016/10/31',
					url: 'https://vimeo.com/189652295',
					excerpt: 'Vechain is BlockChain Technology Protects Brands & Products',
					videoCategoryId: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					// 3
					// News-2, 1
					title: 'Crypto News - VeChain Price Prediction VET prepares for a 26% climb - Bitcoin Price',
					origin: 'Vimeo',
					author: 'Free Stock Footage',
					uploadDate: '2021/04/27',
					url: 'https://vimeo.com/542117939',
					excerpt: 'VeChain Price Prediction: VET prepares for 26% advance.',
					videoCategoryId: 2,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					// 4
					// News-2, 2
					title: 'VeChain Project Updates, Partnerships Info & VET Price Analysis- $5-VET_',
					origin: 'Vimeo',
					author: 'Crypto Logic',
					uploadDate: '2020/05/21',
					url: 'https://vimeo.com/421001926',
					excerpt:
						'What are some of the key features of VeChain, its partnerships with multi-billion-dollar companies such as PwC and Walmart, in addition to my VET price analysis.',
					videoCategoryId: 2,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					// 5
					// News-2, 3
					title:
						'BITCOIN CONSOLIDATING, INSTITUTIONS ACCUMULATING! ETHEREUM FUNDAMENTALS STRONGER THAN EVER!',
					origin: 'Vimeo',
					author: 'CryptoKnights',
					uploadDate: '2021/07/14',
					url: 'https://vimeo.com/575181382',
					excerpt:
						'Bitcoin, Ethereum, and Altcoins (Cardano, BinanceCoin, Polkadot, Chainlink, MATIC, Uniswap, Vechain, XRP, and more) Technical Analysis, Trade Setups, and cryptocurrency industry news and developments.',
					videoCategoryId: 2,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					// 6
					// Definitions-3, 1
					title: 'Definitions',
					origin: 'Vimeo',
					author: 'Sabina Kariat',
					uploadDate: '2018/08/07',
					url: 'https://vimeo.com/283793586',
					excerpt:
						'Based on an indepedent study with Prof. Anila Daulatzai. Anila spent months doing fieldwork in Kabul Afghanistan. In this time, she discovered that the liberal definition of feminism was too narrow to give many Afghan women the respect and resources they needed',
					videoCategoryId: 3,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					// 7
					// News-2, 4
					title: 'Bitcoin Head & Shoulders Short Hit Take Profit as Cryptocurrency Market Drops',
					origin: 'Vimeo',
					author: 'CryptoKnights',
					uploadDate: '2021/07/20',
					url: 'https://vimeo.com/577195550',
					excerpt:
						'Hi, this is OG. Welcome to CryptoKnights. Become a Knight by joining the Cryptoknight Discord channel, link in the description below. Everyday I will share the latest technical analysis and market updates on Bitcoin, Ethereum, and Altcoins, so make sure you like, share, and subscribe.',
					videoCategoryId: 2,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					// 8
					// Videos-1, 3
					title: 'Best Cryptos To Invest In / How to Invest $1000 Into Crypto - January 2021',
					origin: 'Vimeo',
					author: 'Crypto Logic',
					uploadDate: '2021/01/27',
					url: 'https://vimeo.com/505500413',
					excerpt: '',
					videoCategoryId: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					// 9
					// Videos-1, 4
					title: 'MVG - Prepare Yourselves!',
					origin: 'Vimeo',
					author: 'Mad Viking Games',
					uploadDate: '2021/09/29',
					url: 'https://vimeo.com/617998914',
					excerpt: '',
					videoCategoryId: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					// 10
					// Videos-1, 5
					title: 'MVG Office Tour 1 out of 2',
					origin: 'Vimeo',
					author: 'Mad Viking Games',
					uploadDate: '2021/12/01',
					url: 'https://vimeo.com/651293433',
					excerpt: '',
					videoCategoryId: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Videos', null, {});
	}
};
