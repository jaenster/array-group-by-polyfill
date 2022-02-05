import '../bin/index'

describe('Array groupBy / groupByMap', function () {

    test('group by', function () {
        const {negative, positive, zero, nan} = [-1, 2, -4, 5, 'foo', 0, 6, 3, -3, 5].groupBy((i) => {
            switch(true) {
                case typeof i !== 'number':
                    return 'nan';
                case i < 0:
                    return 'negative'
                case i > 0:
                    return 'positive'
                default:
                    return 'zero';
            }
        });
        expect(negative).toEqual([
            -1,
            -4,
            -3,
        ]);
        expect(positive).toEqual([
            2,
            5,
            6,
            3,
            5,
        ]);
        expect(zero).toEqual([
            0,
        ]);
        expect(nan).toEqual([
            'foo'
        ]);
    });


    describe('proposal', () => {
        const array = [1, 2, 3, 4, 5];

        test('group by', function () {
            // groupBy groups items by arbitrary key.
            // In this case, we're grouping by even/odd keys
            expect(
                array.groupBy((num, index, array) => {
                    return num % 2 === 0 ? 'even' : 'odd';
                })
            ).toEqual({
                odd: [1, 3, 5],
                even: [2, 4],
            })
        })

        test('group by map', function () {
            const odd = {odd: true};
            const even = {even: true};

            const equalMap = new Map();
            equalMap.set(odd, [1, 3, 5]);
            equalMap.set(even, [2, 4]);

            expect(
                array.groupByToMap((num, index, array) => {
                    return num % 2 === 0 ? even : odd;
                })
            ).toEqual(equalMap)
        })

    });

});