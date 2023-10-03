import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // useEffect hook
  useEffect(() => {
    fetch('http://localhost:4000/items')
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, [])

  // const handleUpdatedItem = (updatedItem) => {
  //   console.log("In Shopping Cart: ", updatedItem)
  //   const updatedItems = items.map((item) => {
  //     if (item.id === updatedItem.id) {
  //       return updatedItem;
  //     } else {
  //       return item;
  //     }
  //   })
  //   setItems(updatedItems);
  // }
  const handleUpdatedItem = (updatedItem) => {
    const updatedItems = items.map((item) => {
      return (item.id === updatedItem.id ? updatedItem : item);
    })
    setItems(updatedItems);
  }

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  }

  const handleDeleteItem = (deletedItem) => {
    const updatedList = items.filter((item) => item.id !== deletedItem.id)
    setItems(updatedList)
    // console.log("In Shopping Cart: ", deletedItem);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdatedItem} onDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
