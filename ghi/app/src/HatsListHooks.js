import { useState, useEffect } from 'react';
import HatsFormHooks from './HatsFormHooks'

function HatsListHooks() {

    const [list, setList] = useState(null)
    const fetchData = async () => {
        const url = 'http://localhost:8090/api/hats/';
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setList(data.hats)
        } else console.log("error with fetch")
    }

    const deleteHat = async (id) => {
        const deleteUrl = `http://localhost:8090/api/hats/${id}`;
        const response = await fetch(deleteUrl, {method: 'DELETE'});
        setList(list.filter(response.hat.id !== id))
    }

    useEffect(() => {
        fetchData()
    }, [])



    return (
    <div>
        <HatsFormHooks></HatsFormHooks>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Fabric</th>
              <th>Style</th>
              <th>Color</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
          {list?.map(hat => {
            return (
              <tr key={hat.id}>
                <td>{ hat.fabric }</td>
                <td>{ hat.style_name }</td>
                <td>{ hat.color }</td>
                <td><img className="img-thumbnail" src={hat.picture_url}></img></td>
                <button onClick={() => deleteHat(hat.id)}>Delete</button>
              </tr>

            );
          })}
          </tbody>
        </table>
    </div>
    )
} export default HatsListHooks
