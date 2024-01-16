import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const [selectedBtn, setSelectedBtn] = useState("all");

const filterFood = (type) => {
  if(type == "all"){
    setFilteredData(data)
    setSelectedBtn("all");
    return;
  }

  const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter)
    setSelectedBtn(type);


}


  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();

        setData(json);
        setFilteredData(json);

        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue == "") {
      setFilteredData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;

  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="./public/logo.svg" alt="" />
        </div>
        <div className="search">
          <input onChange={searchFood} placeholder="Search Food" />
        </div>
      </TopContainer>
      <FilterContainer>
        <Button onClick={() => filterFood("all")}>All</Button>
        <Button onClick={() => filterFood("Breakfast")}>Breakfast</Button>
        <Button onClick={() => filterFood("Lunch")}>Lunch</Button>
        <Button onClick={() => filterFood("Dinner")}>Dinner</Button>
      </FilterContainer>

      <SearchResult data={filteredData} />
    </Container>
  );
};

export default App;

const Container = styled.div`
  /* max-width: 1200px; */
  max-width: 100vw;
  margin: 0 auto;
`;

const TopContainer = styled.div`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search input {
    background-color: transparent;
    border: 1px solid red;
    border-radius: 5px;
    color: white;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  border-radius: 5px;
  background: #ff4343;
  padding: 6px 12px;
  border: 2px solid transparent;
  color: white;
  cursor: pointer;

  &:hover {
    background: black;
    border: 2px solid white;
  }
`;
