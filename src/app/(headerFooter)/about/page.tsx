type Props = {};

function About({}: Props) {
  return (
    <div className="my-[5vh]">
      <h2 className="mb-[5vh] text-5xl"> About Us </h2>
      <p className="mb-[5vh]">
        <p className="mb-[5vh] text-3xl font-black">Coverland</p>
        <p className="font-semibold">Address</p>
        <br />
        15529 Blackburn Ave, Norwalk, CA 90650
        <br />
        Email: info@coverland.com
        <br />
        Phone: (800) 799-5165
      </p>
      <p>
        The view of the earth from the moon fascinated me - a small disk,
        240,000 miles away. It was hard to think that that little thing held so
        many problems, so many frustrations. Raging nationalistic interests,
        famines, wars, pestilence dont show from that distance. Im convinced
        that some wayward stranger in a space-craft, coming from some other part
        of the heavens, could look at earth and never know that it was inhabited
        at all. But the samw wayward stranger would certainly know instinctively
        that if the earth were inhabited, then the destinies of all who lived on
        it must inevitably be interwoven and joined. We are one hunk of ground,
        water, air, clouds, floating around in space. From out there it really
        is one world.
      </p>
    </div>
  );
}

export default About;
