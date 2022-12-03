import React from 'react';

class ShoesForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manufacturer: '',
            model_name: '',
            color: '',
            picture_url: '',
            bins: []
        };
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleBinChange = this.handleBinChange.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({manufacturer: value})
    }
    handleModelChange(event) {
        const value = event.target.value;
        this.setState({model_name: value})
    }
    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value})
    }
    handleBinChange(event) {
        const value = event.target.value;
        this.setState({bin: value})
    }
    handlePictureChange(event) {
        const value = event.target.value;
        this.setState({picture_url: value})
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.bins;
        console.log(data);

        const shoeUrl = `http://localhost:8080/api/bins/${data.bin}/shoes/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe);

            const cleared = {
                manufacturer: '',
                model_name: '',
                color: '',
                bin: '',
                picture_url: '',
            }
            this.setState(cleared)
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/bins/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({bins: data.bins});
        }
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new shoe</h1>
                    <form onSubmit={this.handleSubmit} id="create-location-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleManufacturerChange} value={this.state.manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                        <label htmlFor="manufacturer">Manufacturer</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleModelChange} value={this.state.model_name} placeholder="Model name" required type="text" name="model_name" id="model_name" className="form-control"/>
                        <label htmlFor="model_name">Model</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleColorChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                        <label htmlFor="color">Color</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={this.handleBinChange} value={this.state.bin} required name="bin" id="bin" className="form-select">
                        <option value="">Choose a bin</option>
                        {this.state.bins.map(bin => {
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
                        <input onChange={this.handlePictureChange} value={this.state.picture_url} placeholder="Picture URL" required type="textarea" name="picture_url" id="picture_url" className="form-control"/>
                    </div>
                    <br></br>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

export default ShoesForm
