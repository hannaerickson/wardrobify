import React from 'react';
import HatsForm from './HatsForm';
import HatsFormHooks from './HatsFormHooks';
import { useState } from 'react';



function HatsColumn(props) {

    const [allHats, setHats] = useState(props.columns)
    const deleteHat = async (id) => {
    const deleteUrl = `http://localhost:8090/api/hats/${id}`;
    const response = await fetch(deleteUrl, {method: 'DELETE'});
    if (response.ok) {
        alert(`deleted hat: ${id}`)
        setHats(allHats.filter(column => column.hat.id !== id))
    }

    }

    return (
        <div className='col'>
            {props.list.map(data => {
                const hat = data;
                return (
                    <div key={data.id} className='card mb-3 shadow'>
                        <img src={hat.picture_url} className='card-img-top' />
                        <div className='card-body'>
                            <h5 className='card-title'>{hat.color} {hat.style_name}</h5>
                        </div>
                        <div className='card-footer'>
                            This hat is made of the finest {hat.fabric}
                            <button className='btn btn-outline-danger' onClick={() => deleteHat(hat.id)}>Delete</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}



class HatsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hatsColumns: [[], [], [], []],
        };
    }


    async componentDidMount() {
        const url = 'http://localhost:8090/api/hats/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const requests = [];
                for (let hat of data.hats) {
                    const detailUrl = `http://localhost:8090/api/hats/${hat.id}`;
                    requests.push(fetch(detailUrl));
                }
                const responses = await Promise.all(requests);
                const hatsColumns = [[], [], [], []];

                let i = 0
                for (const detailResponse of responses) {
                    if (detailResponse.ok) {
                        const details = await detailResponse.json();
                        hatsColumns[i].push(details)
                        i = i + 1;
                        if (i > 3) {
                            i = 0;
                        }
                    } else {
                        console.error(detailResponse);
                    }
                }
                this.setState({hatsColumns: hatsColumns});
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return(
            <div className='container'>
                <h2>My Hats</h2>
                <HatsFormHooks></HatsFormHooks>
                <div className='row'>
                    {this.state.hatsColumns.map((hatsColumnList, index, hatsColumns) => {
                        return (
                            <HatsColumn key={index} list={hatsColumnList} columns={hatsColumns}/>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default HatsList
