import React from 'react';

const initialList = [
    {
        id: 'a',
        task: 'Learn React',
        isComplete: false,
    },
    {
        id: 'b',
        task: 'Learn GraphQL',
        isComplete: true,
    },
];

const List = ({ list, onToggleComplete }) => (
    <ul>
        {list.map((item) => (
            <li key={item.id}>
                <span
                    style={{
                        textDecoration: item.isComplete ? 'line-through' : 'none',
                    }}
                >
                    {item.task}
                </span>
                <button
                    type="button"
                    onClick={() => onToggleComplete(item.id)}
                >
                    {item.isComplete ? 'Undo' : 'Done'}
                </button>
            </li>
        ))}
    </ul>
);

const ItemSanPham = ({ maHang }) => {
    const [list, setList] = React.useState(initialList);
    // console.log(new Date().getTime() + " maHang= " + JSON.stringify(maHang))

    const handleToggleComplete = (id) => {
        console.log(new Date().getTime() + " id= " + JSON.stringify(id))
        const newList = list.map((item) => {
            if (item.id === id) {
                const updatedItem = {
                    ...item,
                    isComplete: !item.isComplete,
                };

                return updatedItem;
            }
            return item;
        });

        setList(newList);
        // toggle item's complete flag
    }

    return <List list={list} onToggleComplete={handleToggleComplete} />;
};

export default ItemSanPham;