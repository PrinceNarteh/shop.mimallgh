export default function (func: Function) {
  return (...params: any) => {
    Promise.resolve(func(params)).catch((err) => console.log(err));
  };
}
