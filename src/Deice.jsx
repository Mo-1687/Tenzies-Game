function Deice({ number, isHeld, changeState }) {
  return (
    <button className={isHeld ? "held" : ""} onClick={changeState}>
      {number}
    </button>
  );
}

export default Deice;
