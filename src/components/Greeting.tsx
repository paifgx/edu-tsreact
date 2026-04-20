export function Greeting(props: { name: string }) {
  return (
    <h2 style={{ color: 'red' }}>Hello, {props.name}!</h2>
  );
}
