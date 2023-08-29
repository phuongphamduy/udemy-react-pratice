import logoApp from '../assets/images/logo192.png';

function Home() {
    return (
        <>
            <div className="home-wrapper">
                <img src={logoApp} width="300" height="300" />
                <h1>App manager users</h1>
            </div>
        </>
    );
}

export default Home;
