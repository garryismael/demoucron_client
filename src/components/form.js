const Form = () => {
  const submit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submit} method="GET" className="d-flex m-2">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Debut"
        aria-label="Search"
      />
      <input
        className="form-control me-2"
        type="search"
        placeholder="Fin"
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">
        Change
      </button>
    </form>
  );
};
export default Form;
