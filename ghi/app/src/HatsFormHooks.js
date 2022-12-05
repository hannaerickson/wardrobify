import { useState, useEffect } from 'react';

function HatsFormHooks() {

    const [fabric, setFabric] = useState('');
    const [styleName, setStyle] = useState('');
    const [color, setColor] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const hat = {
            fabric,
            styleName,
            color,
            pictureUrl,
            location,
            locations
        }
        hat.style_name = hat.styleName
        hat.picture_url = hat.pictureUrl
        delete hat.styleName;
        delete hat.pictureUrl;
        delete hat.locations;

        const hatUrl = `http://localhost:8090/api/locations/${hat.location}/hats/`;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(hat),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            alert('hat added!');

            setFabric('')
            setStyle('')
            setColor('')
            setPictureUrl('')
            setLocation('')

        };

    }




    const handleFabricChange = event => {
        const value = event.target.value;
        setFabric(value);
    }

    const handleStyleChange = event => {
        const value = event.target.value;
        setStyle(value);
    }

    const handleColorChange = event => {
        const value = event.target.value;
        setColor(value)
    }

    const handlePictureUrlChange = event => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleLocationChange = event => {
        const value = event.target.value;
        setLocation(value);
    }


    useEffect(() => {
        const url = 'http://localhost:8100/api/locations/';
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(data => setLocations(data.locations))
            console.log(locations)
    }, []);


    return (
        <div>
            <h6>Add a hat!</h6>
            <form onSubmit={handleSubmit}>
                <div className='form-floating mb-3'>
                    <input onChange={handleFabricChange} placeholder='fabric' name='fabric' value={fabric} required type='text' className='form-contol'/>
                    <input onChange={handleStyleChange} placeholder='style' name='style_name' required type='text' value={styleName} className='form-contol'/>
                    <input onChange={handleColorChange} placeholder='color' name='color' required type='text' value={color} className='form-contol'/>
                    <input onChange={handlePictureUrlChange} placeholder='picture url' name='picture_url' value={pictureUrl} required type='text' className='form-contol'/>
                    <select onChange={handleLocationChange} value={location} name='location' className='form-select'>
                        <option value="">pick a closet</option>
                        {locations?.map(location => {
                            return(
                                <option key={location.id} value={location.id}>
                                    {location.closet_name}
                                </option>
                            );
                        })}
                    </select>
                    <p><button className='btn btn-outline-success'>Add</button></p>
                </div>

            </form>
        </div>
    )
}

export default HatsFormHooks
