import HomeNav from "@components/HomeNav";

const Home = () => {
  return (
    <>
      <div className="main">
        <div className="gradient" />
      </div>

      <main className="app">
        <HomeNav />
        <section className="w-full flex-center flex-col">
          <h1 className="head_text text-center">
            Short Links on
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center">Steriods</span>
          </h1>
          <p className="desc text-center">Shorten n personalize URLs</p>
        </section>
      </main>
    </>
  );
};

export default Home;
