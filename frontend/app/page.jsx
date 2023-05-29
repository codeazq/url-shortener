import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Short Links on
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Steriods</span>
      </h1>
      <p className="desc text-center">Shorten n personalize URLs</p>
      <Feed />
    </section>
  );
};

export default Home;
