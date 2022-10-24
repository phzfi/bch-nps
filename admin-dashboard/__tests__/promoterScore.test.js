const revs = require('../src/testReviews.json');

const calcPromoterScore = (data, months) => {
    const startDate = new Date("Tue 17 May 2022");
		startDate.setMonth(startDate.getMonth() - months);

		const filteredReviews = data.filter(
			(review) => Date.parse(review.createdAt) >= startDate
		);

		let respondants = filteredReviews.length;
		let promoters = 0;
		let passives = 0;
		let detractors = 0;
		for (let review of filteredReviews) {
			if (review.score > 8) {
				promoters += 1;
			} else if (review.score < 7) {
				detractors += 1;
			} else {
				passives += 1;
			}
		}
		if (respondants) {
			return {
				score: ((promoters - detractors) / respondants) * 100,
				promoters: promoters,
				passives: passives,
				detractors: detractors,
			};
		}
};

describe('This is the first group of tests', () => {
    const testCases = [
        // [month, expectedScore]
        [1, -33],
        [3, 13],
        [6, 0],
        [12, -10]
    ];
    test.each(testCases)('score with test data for %s months is %s', (month, score) => {
        expect(Math.ceil(calcPromoterScore(revs, month).score)).toBe(score)
    })
});
