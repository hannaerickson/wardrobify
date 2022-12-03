import React from 'react';

class HatsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fabric: '',
            styleName: '',
            color: '',
            pictureUrl: '',
            locations: []
        };
        this.handleFabricChange = this.handleFabricChange.bind(this);
        this.handleStyleChange = this.handleStyleChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log(data);
        data.style_name = data.styleName;
        data.picture_url = data.pictureUrl;
        delete data.styleName;
        delete data.pictureUrl;
        delete data.locations;
        console.log(data);

        const hatUrl = `http://localhost:8090/api/locations/${data.location}/hats/`;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            console.log(newHat);

            const cleared = {
                fabric: '',
                styleName: '',
                color: '',
                pictureUrl: '',
                location: '',
            };
            this.setState(cleared);
        }
    }

    handleFabricChange(event) {
        const value = event.target.value;
        this.setState({fabric: value});
    }

    handleStyleChange(event) {
        const value = event.target.value;
        this.setState({styleName: value});
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value});
    }

    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({pictureUrl: value});
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location: value});
    }


    async componentDidMount () {
        const url = 'http://localhost:8100/api/locations/';

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({locations: data.locations})
        }
    }

    render() {
        return (
            <div>
                <h6>Add a hat!</h6>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-floating mb-3'>
                        <input onChange={this.handleFabricChange} placeholder='fabric' name='fabric' value={this.state.fabric} required type='text' className='form-contol'/>
                        <input onChange={this.handleStyleChange} placeholder='style' name='style_name' required type='text' value={this.state.styleName} className='form-contol'/>
                        <input onChange={this.handleColorChange} placeholder='color' name='color' required type='text' value={this.state.color} className='form-contol'/>
                        <input onChange={this.handlePictureUrlChange} placeholder='picture url' name='picture_url' value={this.state.pictureUrl} required type='text' className='form-contol'/>
                        <select onChange={this.handleLocationChange} value={this.state.location} name='location' className='form-select'>
                            <option value="">pick a closet</option>
                            {this.state.locations.map(location => {
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
}

export default HatsForm;
