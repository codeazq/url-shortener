import Feed from "@components/Feed";
import Nav from "@components/Nav";

const Home = () => {
  return (
    <>
      <div className="main">
        <div className="gradient" />
      </div>

      <main className="app">
        <Nav />
        <section className="w-full flex-center flex-col">
          <h1 className="head_text text-center">
            Short Links on
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center">Steriods</span>
          </h1>
          <p className="desc text-center">Shorten n personalize URLs</p>
          {/* <Feed /> */}
        </section>
      </main>
    </>
  );
};

export default Home;
