// Card.jsx
function Card(props) {
  return (
    <div style={{border: "1px solid #ccc", padding: "10px", margin: "10px"}}>
      <h2>{props.title}</h2>
      <p>{props.text}</p>
    </div>
  );
}

export default Card;
