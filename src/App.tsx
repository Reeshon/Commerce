import React from 'react';

const App = ({ data }) => {
  console.log('App component rendered with data:', data);
  const items = data?.items || []; // Ensure items is always an array
  console.log('Items to display:', items);

  return (
    <div>
      {items.length > 0 ? (
        items.map(item => {
          console.log('Rendering item:', item);
          return (
            <div key={item.id}>{item.name}</div>
          );
        })
      ) : (
        <div>No items found</div>
      )}
    </div>
  );
};

export default App;
