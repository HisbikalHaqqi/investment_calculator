import { TeamType } from "@/types/team";
import SectionTitle from "../Common/SectionTitle";
import SingleTeam from "./SingleTeam";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Hisbikal Haqqi Muflihin",
    designation: "66 PLSI / MMSI",
    image: "/images/team/team-01.jpg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 2,
    name: "M. Dwiky Darmawan",
    designation: "66 PLSI / MMSI",
    image: "/images/team/team-097.png",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 3,
    name: "Ahsan Firdaus",
    designation: "66 PLSI / MMSI",
    image: "/images/team/team-08.png",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 4,
    name: "Eko Agustina",
    designation: "66 PLSI / MMSI",
    image: "/images/team/team-04.jpg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 5,
    name: "M. Reyhan Dwi Rama",
    designation: "66 PLSI / MMSI",
    image: "/images/team/team-06.png",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  // {
  //   id: 5,
  //   name: "M. Rafi Rafsanzani",
  //   designation: "66 PLSI / MMSI",
  //   image: "/images/team/team-05.jpg",
  //   facebookLink: "/#",
  //   twitterLink: "/#",
  //   instagramLink: "/#",
  // },

  
];

const Team = () => {
  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[40px]"
    >
      <div className="container">
        <div className="mb-[20px]">
          <SectionTitle
            subtitle="Kelompok Air"
            title="Temu Sapa Tim Kelompok Air"
            paragraph="Mahasiswa cita - cita lulus 2 tahun dan pejuang tesis tanpa revisi :) ."
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {teamData.map((team, i) => (
            <SingleTeam key={i} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
