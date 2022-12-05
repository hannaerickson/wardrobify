import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">WARDROBIFY!</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Need to keep track of your shoes and hats? We have
          the solution for you!
        </p>
        <p><Link to='/hats' type="button" className="btn btn-secondary btn-lg btn-block">Take me to the hats!</Link></p>
        <p><Link to='/shoes' type="button" className="btn btn-secondary btn-lg btn-block">Take me to the shoes!</Link></p>
      </div>
    </div>
  );
}

export default MainPage;
