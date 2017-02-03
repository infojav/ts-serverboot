import { Expect, Test, TestCase, TestFixture } from 'alsatian';

let add = (a: number, b: number) => {
    return a + b;
};

@TestFixture('Awesome Test Fixture')
export class MyTest {

    @TestCase(1, 2)
    public addTest(a: number, b: number) {
        Expect(() => add(a, b)).not.toThrow();
        Expect(add(a, b)).toBe(3);
    }

    @Test('This is the sustitude of the function name')
    public anotherTest() {
        Expect(1 + 2).toBe(3);
    }
}
