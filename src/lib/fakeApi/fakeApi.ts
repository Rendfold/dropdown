// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fakeApi = <ReturnType>({ page = 1 } : { page: number }) => {
    // this is not done, because API is not real. With a real API it promise would have ReturnType type
    return new Promise<{ list: any[] }>((resolve, reject) => {
        setTimeout(() => {
            resolve({
                list: [{
                    id: '' + page + 1,
                    name: 'Test 1' + page,
                }, {
                    id: '' + page + 2,
                    name: 'Test 2' + page,
                }, {
                    id: '' + page + 3,
                    name: 'Test 3' + page,
                }, {
                    id: '' + page + 4 ,
                    name: 'Test 4' + page,
                }, {
                    id: '' + page + 5,
                    name: 'Test 5' + page,
                }, {
                    id: '' + page + 6,
                    name: 'Test 6' + page,
                }, {
                    id: '' + page + 7,
                    name: 'Test 7' + page,
                }, {
                    id: '' + page + 8,
                    name: 'Test 8' + page,
                }, {
                    id: '' + page + 9,
                    name: 'Test 9' + page,
                }, {
                    id: '' + page + 10,
                    name: 'Test 10' + page,
                }]
            });
        }, 300);
    });
}
