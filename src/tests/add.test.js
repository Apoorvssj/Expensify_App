const add = (a,b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

//globals are only provided in .test.js files by jest 

//one of the global variables provivded by jest,
//test() allows us to set up new test case,there are 2 required arguments,first one is a name,and second one is the code to run the test case(arrow function)
test('should add two numbers', () => {
    const result = add(3, 4);
    //this is called assertion,jest also gives us assertion lib.,by using expect() 
    /*
    if(result !== 7){
        throw new Error(`You added 4 and 3. The result was ${result}. Expect 7`);
    } 
    */
   expect(result).toBe(7); // same as if statement above
});

test('should generate greeting from name' , () => {
    const result = generateGreeting('Apoorv');
    expect(result).toBe('Hello Apoorv!');

});
test('should generate greeting for no name' , () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anonymous!');

});