import React from 'react';
import HatsForm from './HatsForm';




function HatsColumn(props) {
    /*console.log(props.list)*/
    return (
        <div className='col'>
            {props.list.map(data => {
                const hat = data;
                /*console.log(hat);*/
                return (
                    <div key={hat.id} className='card mb-3 shadow'>
                        <img src={hat.picture_url} className='card-img-top' />
                        <div className='card-body'>
                            <h5 className='card-title'>{hat.color} {hat.style_name}</h5>
                        </div>
                        <div className='card-footer'>
                            This hat is made of the finest {hat.fabric}
                            <button>Delete</button>
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
                    /*console.log(hat)*/
                    const detailUrl = `http://localhost:8090/api/hats/${hat.id}`;
                    requests.push(fetch(detailUrl));
                }
                const responses = await Promise.all(requests);
                const hatsColumns = [[], [], [], []];
                /*console.log(responses)*/;

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
                /*console.log(hatsColumns);*/
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
                <HatsForm></HatsForm>
                <div className='row'>
                    {this.state.hatsColumns.map((hatsList, index) => {
                        return (
                            <HatsColumn key={index} list={hatsList}/>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default HatsList
