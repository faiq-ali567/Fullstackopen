const Filter = ({keyword, setKeyword}) => {
    return (
        <div>
        filter shown with 
        <input onChange={(e) => setKeyword(e.target.value)} value={keyword} />
      </div>
    );
}

export default Filter;