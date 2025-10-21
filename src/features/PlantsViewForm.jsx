import { useEffect, useState } from 'react';
import styles from './PlantsViewForm.module.css';

function PlantsViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  const preventRefresh = e => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={preventRefresh} className={styles.formRow}>
        <section className={styles.formSection}>
          <label>Search:</label>
          <input
            type="text"
            value={localQueryString}
            onChange={e => {
              setLocalQueryString(e.target.value);
            }}
          ></input>
          <button
            type="button"
            className="button button-primary"
            onClick={e => {
              setLocalQueryString('');
            }}
          >
            Clear
          </button>
        </section>

        <section className={styles.formSection}>
          <label>Sort By</label>
          <select
            onChange={e => setSortField(e.target.value)}
            value={sortField}
          >
            <option value="name">Name</option>
            <option value="createdTime">Time added</option>
          </select>
          <label>Direction</label>
          <select
            onChange={e => setSortDirection(e.target.value)}
            value={sortDirection}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </section>
      </form>
    </div>
  );
}

export default PlantsViewForm;
