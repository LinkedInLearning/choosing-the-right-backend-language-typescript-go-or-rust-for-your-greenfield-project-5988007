function FizzBuzz(value: number):string |number {
  if (value %15 ==0){
      return "FizzBuzz"
    } else if (value % 5 ==0){
      return "Buzz"
    } else if (value%3 ==0){
      return "Fizz"
    } else{
      return value
    }
}
for (let i=0; i < 30; i++){
  let output: string | number = FizzBuzz(i)
  console.log(output)
}
