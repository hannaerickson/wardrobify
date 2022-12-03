import React from 'react';

function ShoesColumn(props) {
    return (
        <div className="col">
            {props.list.map(data => {
                const shoe = data;
                return (
                    <div key={shoe.id} className="card mb-3 shadow">
                        <img src={shoe.picture_url} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{shoe.manufacturer}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{shoe.model_name}</h6>
                            <p className="card-text">{shoe.color}</p>
                        </div>
                        <div className="card-footer">
                            <button type="button" class="btn btn-outline-danger">Delete</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

class ShoesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shoesColumns: [[], [], [], []],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/shoes/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const requests = [];
                for (let shoe of data.shoes) {
                    const detailUrl = `http://localhost:8080/api/shoes/${shoe.id}`;
                    requests.push(fetch(detailUrl));
                }
                const responses = await Promise.all(requests);
                const shoesColumns = [[], [], [], []];

                let i= 0;
                for (const shoeResponse of responses) {
                    if (shoeResponse.ok) {
                        const details = await shoeResponse.json();
                        shoesColumns[i].push(details);
                        i = i + 1;
                        if (i > 3) {
                            i = 0;
                        }
                    } else {
                        console.error(shoeResponse);
                    }
                }
                this.setState({shoesColumns: shoesColumns});
            }
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        return (
            <div className="container">
                <h2>My Shoes</h2>
                <p>
                    <button type="button" class="btn btn-outline-info">Add a shoe</button>
                </p>
                <div className="row">
                    {this.state.shoesColumns.map((shoeList, index) => {
                        return (
                            <ShoesColumn key={index} list={shoeList} />
                        );
                    })}
                </div>
            </div>
        );
    }

}

export default ShoesList;
