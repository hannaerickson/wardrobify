// testing converting to functional components

import React, { useState, useEffect } from 'react';

function ShoesForm2(props) {
    const [manufacturer, setManufacturer] = useState('');
    const [model_name, setModelName] = useState('');
    const [color, setColor] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [bin, setBin] = useState('');
    const [data, setData] = useState(null);

    const handleManufacturerChange = e => {
        setManufacturer(e.target.value);};
    const handleModelChange = e => {
        setModelName(e.target.value);};
    const handleColorChange = e => {
        setColor(e.target.value);};
    const handlePictureChange = e => {
        setPictureUrl(e.target.value);};
    const handleBinChange = e => {
        setBin(e.target.value);};

    useEffect (() => {
        const url = 'http://localhost:8100/api/bins/';
        fetch(url, {method:"GET"})
            .then(response => {
                return (response.json())
            })
            .then(data => {
                setData(data)
            });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const shoe = {
            manufacturer,
            model_name,
            color,
            picture_url,
            bin,
        }
        console.log(shoe)
        const shoeUrl = `http://localhost:8080/api/bins/${shoe.bin}/shoes/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(shoe),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe);

            setManufacturer('')
            setModelName('')
            setColor('')
            setBin('')
            setPictureUrl('')
        };
    }

    return ( data &&
            <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new shoe</h1>
                    <form onSubmit={handleSubmit} id="create-shoe">
                    <div className="form-floating mb-3">
                        <input onChange={handleManufacturerChange} value={manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                        <label htmlFor="manufacturer">Manufacturer</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleModelChange} value={model_name} placeholder="Model name" required type="text" name="model_name" id="model_name" className="form-control"/>
                        <label htmlFor="model_name">Model</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                        <label htmlFor="color">Color</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleBinChange} value={bin} required name="bin" id="bin" className="form-select">
                        <option>Choose a bin</option>
                        {data.bins?.map(bin => {
                            return (
                                <option key={bin.id} value={bin.id}>
                                    {bin.closet_name}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                    <div>
                        <p><label htmlFor="picture_url">Upload an image:</label></p>
                        <input onChange={handlePictureChange} value={picture_url} placeholder="Picture URL" required type="textarea" name="picture_url" id="picture_url" className="form-control"/>
                    </div>
                    <br></br>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
                </div>
            </div>
    )
}

export default ShoesForm2
