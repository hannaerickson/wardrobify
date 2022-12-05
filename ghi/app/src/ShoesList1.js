import React, { useState, useEffect } from 'react';

function ShoesList1() {
    const [list, setList] = useState(null);

    const fetchData = async () => {
        const url = `http://localhost:8080/api/shoes/`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setList(data.shoes)
        }
    }
    const deleteShoe = async (id) => {
        const deleteUrl = `http://localhost:8080/api/shoes/${id}`;
        const response = await fetch(deleteUrl, {method: 'DELETE'});
        setList(list.filter(response.shoe.id !== id))
    }

    useEffect(() => {
        fetchData()
    })

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {list?.map(shoe => {
                    return (
                        <tr key={shoe.id}>
                            <td>{shoe.manufacturer}</td>
                            <td>{shoe.model_name}</td>
                            <td>{shoe.color}</td>
                            <td><img className="img-thumbnail" src={shoe.picture_url}></img></td>
                            <button onClick={deleteShoe} className="btn btn-outline-danger" >Delete</button>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ShoesList1
