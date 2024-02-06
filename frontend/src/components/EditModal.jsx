function editModal({ handleSubmit, currentTask }) {
  return (
    <>
      <form
        onSubmit={() => {
          handleSubmit();
        }}
      >
        <input
          type="text"
          name="description"
          defaultValue={currentTask.description}
        />
        <button type="submit">Valider</button>
      </form>
      <p>{currentTask.description}</p>
    </>
  );
}

export default editModal;
